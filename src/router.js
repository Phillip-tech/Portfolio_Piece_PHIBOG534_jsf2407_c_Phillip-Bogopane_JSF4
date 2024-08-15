import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import ProductView from './views/ProductView.vue';
import CartView from './views/CartView.vue';
import FavoritesView from './views/FavoritesView.vue';
import ComparisonListView from './views/ComparisonListView.vue';
import Login from './views/Login.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/product/:id', name: 'ProductView', component: ProductView },
  { path: '/cart', component: CartView },
  { path: '/favorites', component: FavoritesView },
  { path: '/comparison-list', name: 'ComparisonList', component: ComparisonListView },
  { path: '/login', component: Login },
  // Add other routes here as necessary
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;