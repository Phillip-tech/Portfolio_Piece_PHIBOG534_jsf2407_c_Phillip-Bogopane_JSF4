import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import ProductView from './views/ProductView.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'Home', component: Home },
    { path: '/product/:id', name: 'ProductView', component: ProductView },
  ],
});

export default router;