import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import ProductView from './views/ProductView.vue';
import CartView from './views/CartView.vue';
import FavoritesView from './views/FavoritesView.vue';
import ComparisonListView from './views/ComparisonListView.vue';
import Login from './views/Login.vue';


const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/product/:id', name: 'ProductView', component: ProductView, props: true },
  { path: '/cart', name: 'CartView', component: CartView, meta: { requiresAuth: true } },
  { path: '/favorites', name: 'FavoritesView', component: FavoritesView, meta: { requiresAuth: true } },
  { path: '/comparisonList', name: 'ComparisonListView', component: ComparisonListView, meta: { requiresAuth: true } },
  { path: '/login', name: 'Login', component: Login },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('token');

  if (to.matched.some(record => record.meta.requiresAuth) && !isLoggedIn) {
    next({ name: 'Login', query: { redirect: to.fullPath } });
  } else {
    next();
  }
});

export default router;
