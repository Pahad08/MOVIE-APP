import { createApp } from "vue";
import App from "./App.vue";
import Counter from "./Pages/Counter.vue";
import Home from "./Pages/Home.vue";
import { createWebHistory, createRouter } from "vue-router";

const routes = [
  { path: "/", component: Home },
  { path: "/movie/:id", component: Home },
  { path: "/counter", component: Counter },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
app.use(router).mount("#app");
