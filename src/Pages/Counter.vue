<script setup>
import { ref } from "vue";

defineProps(["title"]);
const emit = defineEmits(["enlarge-text"]);

const count = ref(0);

function increment() {
  count.value++;
}

function decrement() {
  if (count.value > 0) count.value--;
}
</script>

<template></template>
