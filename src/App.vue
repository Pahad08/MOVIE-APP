<script setup>
import Navbar from "./Components/ui/Navbar.vue";
import { Clapperboard, MenuIcon, Search } from "lucide-vue-next";
import Input from "./Components/ui/Input.vue";
import { ref } from "vue";

const showDropdownMenu = ref(false);
const showSearchDropdown = ref(false);
const search = ref("");

function showSearch() {
  showDropdownMenu.value = false;
  showSearchDropdown.value = !showSearchDropdown.value;
}

function showMenu() {
  showDropdownMenu.value = !showDropdownMenu.value;
  showSearchDropdown.value = false;
}

const links = [
  {
    label: "Movies",
    url: "/",
  },
  {
    label: "Tv Shows",
    url: "/counter",
  },
  {
    label: "Actors",
    url: "/counter",
  },
];
</script>

<template>
  <Navbar
    :links="links"
    :showDropdownMenu="showDropdownMenu"
    :searchDropdown="showSearchDropdown"
  >
    <template #logo>
      <Clapperboard />
      <span class="text-lg font-semibold">Movie App</span>
    </template>

    <template #end>
      <button
        type="button"
        @click="showSearch"
        class="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 me-1"
      >
        <Search />
        <span class="sr-only">Search</span>
      </button>

      <div class="relative hidden md:block">
        <Input placeholder="Search..." v-model="search" />
      </div>

      <button
        type="button"
        @click="showMenu"
        class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span class="sr-only">Open main menu</span>
        <MenuIcon />
      </button>
    </template>

    <template #searchDropdown>
      <Input placeholder="Search..." class="w-full" v-model="search" />
    </template>
  </Navbar>

  <main class="w-full">
    <RouterView />
  </main>
</template>
