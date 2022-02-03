import { createRouter, createWebHistory } from 'vue-router';
import Home from "@/views/Home.vue";
import Cryptocurrencies from "@/views/Cryptocurrencies.vue";
import Exchanges from "@/views/Exchanges.vue";
import News from "@/views/News.vue";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/cryptocurrencies',
    name: 'Cryptocurrencies',
    component: Cryptocurrencies
  },
  {
    path: '/exchanges',
    name: 'Exchanges',
    component: Exchanges
  },
  {
    path: '/news',
    name: 'News',
    component: News
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
