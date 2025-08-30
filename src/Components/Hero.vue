<script setup>
import { headers, throttle } from "@/helpers/helpers";
import { MoveRight, MoveLeft } from "lucide-vue-next";
import Button from "./ui/Button.vue";
import {
  ref,
  watchEffect,
  onMounted,
  onBeforeUnmount,
  watch,
  onUnmounted,
} from "vue";

const nowPlayingMovies = ref([]);
const currentMovie = ref({});
const currentMovieIndex = ref(0);
let imageIntervalId = null;
let translateX = ref(0);
const direction = ref(-1);
let slideAnimationFrame;
const speed = 1;

function imageUrl(movie_img_path, size = "w500") {
  return `https://image.tmdb.org/t/p/${size}${movie_img_path}`;
}

function animateSlide() {
  translateX.value += direction.value * speed;

  const containerWidth = window.innerWidth;
  const totalWidth = nowPlayingMovies.value.length * 198;

  if (translateX.value <= -(totalWidth - containerWidth)) {
    direction.value = 1;
  }

  if (translateX.value >= 0) {
    direction.value = -1;
  }

  slideAnimationFrame = requestAnimationFrame(animateSlide);
}

function startMovieInterval(isInitial = true) {
  if (!isInitial) clearInterval(imageIntervalId);

  imageIntervalId = setInterval(() => {
    currentMovie.value = nowPlayingMovies.value[currentMovieIndex.value];

    if (currentMovieIndex.value >= nowPlayingMovies.value.length - 1) {
      currentMovieIndex.value = 0;
    } else {
      currentMovieIndex.value++;
    }
  }, 5000);
}

function changeCurrentMovie(index) {
  clearInterval(imageIntervalId);

  currentMovieIndex.value = index;
  currentMovie.value = nowPlayingMovies.value[index];

  startMovieInterval(false);
}

const handleResize = throttle(() => {
  if (window.innerWidth >= 768) {
    if (!slideAnimationFrame)
      slideAnimationFrame = requestAnimationFrame(animateSlide);
  } else {
    cancelAnimationFrame(slideAnimationFrame);
    slideAnimationFrame = null;
  }
}, 500);

function nextMovie() {
  if (currentMovieIndex.value < nowPlayingMovies.value.length - 1) {
    currentMovieIndex.value++;
  } else {
    currentMovieIndex.value = 0;
  }
  changeCurrentMovie(currentMovieIndex.value);
}

function prevMovie() {
  if (currentMovieIndex.value == 0) {
    currentMovieIndex.value = nowPlayingMovies.value.length - 1;
  } else {
    currentMovieIndex.value--;
  }

  changeCurrentMovie(currentMovieIndex.value);
}

watchEffect(async (onCleanup) => {
  const controller = new AbortController();

  try {
    const result = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing",
      {
        headers,
      }
    );

    const nowPlayingResult = await result.json();

    nowPlayingMovies.value = nowPlayingResult.results;
  } catch (error) {
    console.error(error.message);
  }

  onCleanup(() => {
    controller.abort();
  });
});

watch(nowPlayingMovies, () => {
  currentMovie.value = nowPlayingMovies.value[currentMovieIndex.value];
});

onMounted(() => {
  startMovieInterval();
  slideAnimationFrame = requestAnimationFrame(animateSlide);

  window.addEventListener("resize", handleResize);
}); // start the animations and events

//clear side effects
onBeforeUnmount(() => {
  clearInterval(imageIntervalId);
  cancelAnimationFrame(slideAnimationFrame);
  window.removeEventListener("resize", handleResize);
});
</script>

<template>
  <div class="h-screen relative text-white">
    <Transition appear>
      <div
        :key="currentMovie.id"
        class="absolute max-h-full w-full h-full top-0 left-0 -z-1 bg-center bg-cover bg-no-repeat bg-gray-600 bg-blend-multiply"
        :style="{
          backgroundImage: `url(${imageUrl(
            currentMovie.poster_path,
            'original'
          )})`,
        }"
      ></div>
    </Transition>

    <section
      class="md:px-20 py-10 px-6 h-full flex md:items-center md:justify-start justify-between items-end gap-20"
    >
      <div class="md:w-[60%] w-full">
        <p class="md:text-6xl text-3xl font-bold">{{ currentMovie.title }}</p>
        <p class="mt-5 md:block hidden">{{ currentMovie.overview }}</p>
      </div>

      <div class="md:hidden flex items-center gap-3">
        <Button @click="prevMovie" color="neutral"
          ><MoveLeft size="18" stroke-width="3"
        /></Button>
        <Button color="neutral" @click="nextMovie"
          ><MoveRight size="18" stroke-width="3"
        /></Button>
      </div>

      <div class="self-end md:flex hidden overflow-hidden w-[40%]">
        <div
          class="flex w-80"
          :style="{
            transform: `translateX(${translateX}px)`,
            transition: 'transform 0.05s linear',
          }"
        >
          <img
            v-for="(movie, index) in nowPlayingMovies"
            :key="movie.id"
            class="h-50 me-4 rounded-lg w-full cursor-pointer"
            :src="imageUrl(movie.poster_path)"
            alt="poster"
            @click="changeCurrentMovie(index)"
          />
        </div>
      </div>
    </section>
  </div>
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
