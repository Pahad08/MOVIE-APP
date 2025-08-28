<script setup>
import { FwbCard } from "flowbite-vue";
import { Star } from "lucide-vue-next";

const props = defineProps([
  "movie_img_path",
  "movie_title",
  "movie_id",
  "vote_average",
  "release_date",
  "genres",
]);

function parseDate(date) {
  const dateObject = new Date(date);

  const options = { month: "long", day: "numeric", year: "numeric" };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
    dateObject
  );

  return formattedDate;
}
</script>

<template>
  <fwb-card
    img-alt="movie_title"
    :img-src="movie_img_path"
    variant="image"
    class="max-w-full! group [&>img:hover]:opacity-75 [&>img]:transition [&>img]:ease-in-out [&>img]:duration-150"
  >
    <div class="p-3">
      <RouterLink
        :to="`/movie/${movie_id}`"
        class="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white hover:underline"
        >{{ movie_title }}</RouterLink
      >

      <div class="mt-2">
        <div class="flex items-center text-gray-400 text-sm mt-1">
          <Star class="text-yellow-500" size="17" fill="#f1a012" />
          <span class="ml-1">{{ Math.round(vote_average * 10) + "%" }}</span>
          <span class="mx-2">|</span>
          <span>{{ parseDate(release_date) }}</span>
        </div>
        <div class="text-gray-400 text-sm mt-2">{{ genres }}</div>
      </div>
    </div>
  </fwb-card>
</template>
