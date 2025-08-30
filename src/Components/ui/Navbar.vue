<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();

const props = defineProps(["links", "showDropdownMenu", "searchDropdown"]);
const isScrolled = ref(false);

function handleScroll() {
  isScrolled.value = window.scrollY > 0;
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <nav
    :class="{
      'backdrop-blur-sm bg-white/5 shadow-md':
        isScrolled || props.showDropdownMenu || props.searchDropdown,
      'bg-transparent': !isScrolled,
    }"
    class="transition-all z-50 duration-300 left-0 fixed top-0 w-screen py-4 text-white"
  >
    <div
      class="max-w-full flex flex-wrap items-center justify-between mx-auto md:px-15 px-6"
    >
      <RouterLink to="/" class="flex items-center space-x-3 rtl:space-x-reverse"
        ><slot name="logo"></slot>
      </RouterLink>

      <div class="flex md:order-2">
        <slot name="end"></slot>
      </div>

      <div
        class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
        id="navbar-search"
      >
        <ul
          class="flex gap-4 flex-col p-4 md:p-0 mt-4 font-medium rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0"
        >
          <li v-for="link in props.links" :key="link.label" class="m-0">
            <RouterLink
              :to="link.url"
              activeClass="text-neutral-500 dark:text-neutral-500"
              :class="{
                'dark:hover:bg-neutral-200 dark:hover:text-neutral-900 hover:bg-neutral-700 hover:text-neutral-200':
                  link.url !== route.fullPath,
              }"
              class="p-2 transition-all duration-150 rounded-md text-sm font-medium"
              aria-current="page"
              >{{ link.label }}</RouterLink
            >
          </li>
        </ul>
      </div>
    </div>

    <Transition mode="out-in" :duration="{ enter: 100, leave: 75 }">
      <div class="px-4 md:hidden mt-3" v-if="props.showDropdownMenu">
        <ul
          class="border dark:border-neutral-700 border-gray-300 p-3 rounded flex flex-col gap-4"
        >
          <li v-for="link in props.links" :key="link.label" class="m-0 w-full">
            <RouterLink
              :to="link.url"
              activeClass="text-neutral-500 dark:text-neutral-500"
              :class="{
                'dark:hover:bg-neutral-200 dark:hover:text-neutral-900 hover:bg-neutral-700 hover:text-neutral-200':
                  link.url !== route.fullPath,
              }"
              class="p-2 transition-all duration-150 rounded-md text-sm font-medium w-full block"
              aria-current="page"
              >{{ link.label }}</RouterLink
            >
          </li>
        </ul>
      </div>

      <div class="px-4 md:hidden mt-3" v-else-if="props.searchDropdown">
        <slot name="searchDropdown"></slot>
      </div>
    </Transition>
  </nav>
</template>
