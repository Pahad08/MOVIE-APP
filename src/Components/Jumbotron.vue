<script setup>
import { MoveRight } from "lucide-vue-next";

const props = defineProps(["movie_image", "movie_title", "overview", "url"]);
</script>

<template>
  <section
    class="bg-center bg-cover bg-scroll bg-no-repeat bg-gray-600 bg-blend-multiply"
    :style="{ backgroundImage: `url(${movie_image})` }"
  >
    <div class="h-full px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
      <h1
        class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl"
      >
        {{ movie_title }}
      </h1>
      <p
        class="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48"
      >
        {{ overview }}
      </p>
      <div
        class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0"
      >
        <RouterLink
          :to="url"
          class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
        >
          View More <MoveRight class="ms-2"
        /></RouterLink>
      </div>
    </div>
  </section>
</template>
