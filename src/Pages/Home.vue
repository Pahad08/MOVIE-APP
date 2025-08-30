<script setup>
import { ref, watchEffect, defineAsyncComponent } from "vue";
import MovieCard from "./../Components/MovieCard.vue";
import { headers } from "@/helpers/helpers";

const Hero = defineAsyncComponent({
  loader: () => import("./../Components/Hero.vue"),
});

const popularMovies = ref([]);

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
console.log(popularMovies.value);
watchEffect(async (onCleanup) => {
  const controller = new AbortController();

  try {
    const [popularMoviesResponse, genreResponse] = await Promise.all([
      fetch("https://api.themoviedb.org/3/movie/popular", {
        headers,
      }),
      fetch("https://api.themoviedb.org/3/genre/movie/list", {
        headers,
      }),
    ]);

    const [popularMoviesResult, genresResult] = await Promise.all([
      popularMoviesResponse.json(),
      genreResponse.json(),
    ]);

    const genres = genresResult.genres.reduce((acc, genre) => {
      acc[genre.id] = genre.name;
      return acc;
    }, {});
    console.log(popularMoviesResult.results);
    popularMovies.value = formatMovies(popularMoviesResult.results, genres);
  } catch (error) {
    console.error(error.message);
  }

  onCleanup(() => {
    controller.abort();
  });
});
</script>

<template>
  <Hero />

  <section class="md:px-20! px-7 mt-20 pb-20">
    <h1 class="text-white text-2xl mt-5 mb-8 font-semibold">Popular Movies</h1>

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
