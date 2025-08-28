<script setup>
import {
  FwbNavbar,
  FwbNavbarCollapse,
  FwbNavbarLink,
  FwbNavbarLogo,
  FwbInput,
} from "flowbite-vue";
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();

const search = ref("");

const navigate = (path, e) => {
  e.preventDefault();
  router.replace(path);
  router.push(path);
};

const isActive = (path) => {
  return path === route.fullPath;
};
</script>

<template>
  <fwb-navbar
    class="z-50 border-b fixed w-full border-gray-500 md:px-20! px-7 top-0"
  >
    <template #logo>
      <fwb-navbar-logo
        alt="logo"
        image-url="./public/images/logo.png"
        link="#"
        class="object-cover"
      >
        Movie App
      </fwb-navbar-logo>
    </template>

    <template #default="{ isShowMenu }">
      <fwb-navbar-collapse :is-show-menu="isShowMenu">
        <fwb-navbar-link @click="navigate('/', $event)">
          <span :class="{ 'text-white': isActive('/') }">Movies</span>
        </fwb-navbar-link>

        <fwb-navbar-link @click="navigate('/counter', $event)">
          <span :class="{ 'text-white': isActive('/counter') }">Tv Shows</span>
        </fwb-navbar-link>

        <fwb-navbar-link @click="navigate('/counter', $event)">
          <span :class="{ 'text-white': isActive('/counter') }">Actors</span>
        </fwb-navbar-link>

        <fwb-input placeholder="Search" size="sm" class="sm:hidden mt-2" />
      </fwb-navbar-collapse>
    </template>

    <template #right-side>
      <fwb-input placeholder="Search" size="sm" v-model="search" />
    </template>
  </fwb-navbar>

  <main class="w-full bg-gray-900">
    <div class="md:mt-18 mt-15">
      <RouterView />
    </div>
  </main>
</template>
