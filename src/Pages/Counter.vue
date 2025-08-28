<script setup>
import { ref } from "vue";
import { FwbButton } from "flowbite-vue";
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

<template>
  <div>
    <p>{{ title }}</p>
    <fwb-button @click="decrement" color="red">Decrement</fwb-button>
    <p class="text-red-500">{{ count }}</p>
    <fwb-button @click="increment" color="default">Increment</fwb-button>
  </div>

  <fwb-button color="green" @click="emit('enlarge-text')"
    >Enlarge Text</fwb-button
  >
</template>
