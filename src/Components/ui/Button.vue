<script setup>
import { tv } from "tailwind-variants";
const props = defineProps(["color"]);

const buttonProps = tv({
  base: "text-white focus:outline-none focus:ring-4 rounded-md font-medium text-sm px-3 py-2.5 ",
  variants: {
    color: {
      primary:
        "bg-blue-700/30 hover:bg-blue-800 focus:ring-blue-300 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
      secondary:
        "bg-blue-700 hover:bg-stone-800 focus:ring-stone-300 text-center dark:bg-stone-600 dark:hover:bg-stone-700 dark:focus:ring-stone-800",
      error:
        "bg-blue-700 hover:bg-red-800 focus:ring-red-300 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800",
      accent:
        "bg-indigo-700 hover:bg-indigo-800 focus:ring-indigo-300 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800",
      success:
        "bg-green-700 hover:bg-green-800 focus:ring-green-300 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800",
      neutral:
        "bg-neutral-700/70 hover:bg-neutral-800 focus:ring-neutral-300 text-center dark:bg-neutral-600/70 dark:hover:bg-neutral-700 dark:focus:ring-neutral-800",
      info: "bg-cyan-700 hover:bg-cyan-800 focus:ring-cyan-300 text-center dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800",
      warning:
        "bg-yellow-700 hover:bg-yellow-800 focus:ring-yellow-300 text-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800",
    },
  },
  defaultVariants: {
    color: "primary",
  },
});
</script>

<template>
  <button :class="buttonProps({ color: props.color })">
    <slot></slot>
  </button>
</template>
