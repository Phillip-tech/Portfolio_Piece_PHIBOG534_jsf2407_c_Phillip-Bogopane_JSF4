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
      <div v-else class="text-white-600 underline hover:text-blue-500">
    You have no favorite products. Go back to <router-link to="/" class="glow-link bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-white-600 mt-4">home</router-link> and add some products!
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
  if (product && product.id) {
    store.commit('addToCart', product);
  } else {
    console.error('Invalid product data:', product);
  }
};


  </script>


  