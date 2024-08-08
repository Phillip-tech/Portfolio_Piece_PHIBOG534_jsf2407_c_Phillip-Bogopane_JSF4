<template>
    <div>
      <h1 class="text-3xl font-bold mb-6">Your Favorites</h1>
      <div v-if="favoriteProducts.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <ProductCard
          v-for="product in favoriteProducts"
          :key="product.id"
          :product="product"
          @toggleFavorite="toggleFavorite"
          @addToCart="addToCart"
          :isFavorite="true"
        />
      </div>
      <div v-else class="text-gray-600">
        You have no favorite products. Go back to <router-link to="/">home</router-link> and add some favorites!
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import { useStore } from 'vuex';
  import ProductCard from '../components/ProductCard.vue';
  
  const store = useStore();
  
  const favoriteProducts = computed(() => {
    return store.state.products.filter((product) =>
      store.state.favorites.includes(product.id)
    );
  });
  
  const toggleFavorite = (productId) => {
    store.commit('toggleFavorite', productId);
  };
  
  const addToCart = (product) => {
    store.commit('addToCart', product);
  };
  </script>
  