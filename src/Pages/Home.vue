<script setup>
import { ref, watchEffect, onMounted, onBeforeUnmount, watch } from "vue";
import MovieCard from "./../Components/MovieCard.vue";
import Jumbotron from "./../Components/Jumbotron.vue";

const key = import.meta.env.VITE_API_KEY;
const headers = {
  accept: "application/json",
  Authorization: `Bearer ${key}`,
};
const popularMovies = ref([]);
const nowPlayingMovies = ref([]);
const currentMovieImage = ref("");
const currentMovieIndex = ref(0);
let imageIntervalId = null;

function imageUrl(movie_img_path, size = "w500") {
  return `https://image.tmdb.org/t/p/${size}${movie_img_path}`;
}

function generateUrl(id) {
  return `/movie/${id}`;
}

function formatMovies(movies, genres) {
  return movies.map((movie) => {
    const formattedGenres = movie.genre_ids.map((genre) => {
      return genres[genre];
    });

    return {
      poster_path: movie.poster_path,
      vote_average: movie.vote_average,
      genres: formattedGenres.join(", "),
      release_date: movie.release_date,
      title: movie.title,
      overview: movie.overview,
    };
  });
}

watchEffect(async (onCleanup) => {
  const controller = new AbortController();

  try {
    const [popularMoviesResponse, genreResponse, nowPlaying] =
      await Promise.all([
        fetch("https://api.themoviedb.org/3/movie/popular", {
          headers,
        }),
        fetch("https://api.themoviedb.org/3/genre/movie/list", {
          headers,
        }),
        fetch("https://api.themoviedb.org/3/movie/now_playing", {
          headers,
        }),
      ]);

    const [popularMoviesResult, genresResult, nowPlayingResult] =
      await Promise.all([
        popularMoviesResponse.json(),
        genreResponse.json(),
        nowPlaying.json(),
      ]);

    const genres = genresResult.genres.reduce((acc, genre) => {
      acc[genre.id] = genre.name;
      return acc;
    }, {});

    popularMovies.value = formatMovies(popularMoviesResult.results, genres);
    nowPlayingMovies.value = nowPlayingResult.results;
    currentMovieImage.value = nowPlayingResult.results[currentMovieIndex.value];
  } catch (error) {
    console.error(error.message);
  }

  onCleanup(() => {
    controller.abort();
  });
});

watch(nowPlayingMovies, () => {
  currentMovieImage.value = nowPlayingMovies.value[currentMovieIndex.value];
});

onMounted(() => {
  imageIntervalId = setInterval(() => {
    currentMovieImage.value = nowPlayingMovies.value[currentMovieIndex.value];
    if (currentMovieIndex.value == nowPlayingMovies.value.length - 1) {
      currentMovieIndex.value = 0;
    } else {
      currentMovieIndex.value++;
    }
  }, 5000);
});

onBeforeUnmount(() => {
  clearInterval(imageIntervalId);
});
</script>

<template>
  <Transition appear>
    <Jumbotron
      :key="currentMovieImage.id"
      :movie_image="imageUrl(currentMovieImage.poster_path, 'original')"
      :movie_title="currentMovieImage.title"
      :overview="currentMovieImage.overview"
      :url="generateUrl(currentMovieImage.id)"
    />
  </Transition>

  <section class="md:px-20! px-7 mt-20 pb-20">
    <h1 class="text-yellow-500 text-2xl mt-5 mb-8 font-semibold">
      Popular Movies
    </h1>

    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5"
    >
      <MovieCard
        v-for="movie in popularMovies"
        :key="movie.id"
        :movie_title="movie.title"
        :movie_img_path="imageUrl(movie.poster_path)"
        :movie_id="movie.id"
        :vote_average="movie.vote_average"
        :release_date="movie.release_date"
        :genres="movie.genres"
      />
    </div>
  </section>
</template>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
