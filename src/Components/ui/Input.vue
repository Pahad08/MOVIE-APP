<script setup>
import { tv } from "tailwind-variants";
const props = defineProps(["color"]);

const inputProps = tv({
  base: "p-2 text-gray-900 border border-gray-300 rounded-lg bg-neutral-100 text-sm focus:outline-0 focus:border-2 dark:bg-neutral-700 dark:border-gray-600 dark:text-white text-gray-900",
  variants: {
    color: {
      primary:
        "focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500",
      secondary:
        "ring-stone-500 focus:border-stone-500 dark:focus:ring-stone-500 dark:focus:border-stone-500",
      error:
        "ring-red-500 focus:border-red-500 dark:focus:ring-red-500 dark:focus:border-red-500",
      accent:
        "ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-500 dark:focus:border-indigo-500",
      success:
        "ring-green-500 focus:border-green-500 dark:focus:ring-green-500 dark:focus:border-green-500",
      neutral:
        "ring-gray-500 focus:border-neutral-500 dark:focus:ring-neutral-500 dark:focus:border-neutral-500",
      info: "ring-cyan-500 focus:border-cyan-500 dark:focus:ring-cyan-500 dark:focus:border-gray-500",
      warning:
        "ring-yellow-500 focus:border-yellow-500 dark:focus:ring-yellow-500 dark:focus:border-yellow-500",
    },
  },
  defaultVariants: {
    color: "primary",
  },
});
</script>

<template>
  <input
    type="text"
    placeholder="Search movie"
    :class="inputProps({ color: props.color })"
  />
</template>
