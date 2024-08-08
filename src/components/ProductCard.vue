<template>
  <!-- Product Card -->
  <div class="border rounded-lg p-4 shadow-md hover:shadow-lg zoom-effect">
    <!-- Product Image with Link to Product View -->
    <router-link :to="{ name: 'ProductView', params: { id: product.id }}">
      <img :src="product.image" :alt="product.title" class="h-48 w-full object-contain mb-4" />
    </router-link>
    <div class="flex justify-between items-start mb-2 p-4">
      <!-- Product Title -->
      <div class="text-lg font-semibold">{{ product.title }}</div>
      <!-- Favorite Button -->
      <button @click="$emit('toggleFavorite', product.id)" class="text-gray-500 hover:text-red-500">
        <!-- Filled heart icon if the product is a favorite -->
        <svg v-if="isFavorite" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="h-6 w-6">
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          />
        </svg>
        <!-- Outline heart icon if the product is not a favorite -->
        <svg v-else xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="h-6 w-6">
          <path
            d="M16.5 3C14.76 3 13.09 3.81 12 5.09C10.91 3.81 9.24 3 7.5 3C4.42 3 2 5.42 2 8.5C2 12.28 5.4 15.36 10.55 19.54L12 20.87L13.45 19.54C18.6 15.36 22 12.28 22 8.5C22 5.42 19.58 3 16.5 3ZM12.1 18.55L12 18.65L11.9 18.55C7.14 14.24 4 11.39 4 8.5C4 6.5 5.5 5 7.5 5C8.74 5 9.97 5.61 10.55 6.68H13.45C14.03 5.61 15.26 5 16.5 5C18.5 5 20 6.5 20 8.5C20 11.39 16.86 14.24 12.1 18.55Z"
          />
        </svg>
      </button>
    </div>
    <!-- Category Description -->
    <div class="text-gray-600 mb-2">{{ product.category }}</div>
    <!-- Ratings and Reviews -->
    <div class="ratings">
      <!-- Star Rating Display -->
      <span v-for="star in 5" :key="star" class="star" :class="{ filled: star <= Math.round(product.rating.rate) }">⭐</span>
      <!-- Number of Reviews -->
      <span class="reviews">({{ product.rating.count }} reviews)</span>
    </div>
    <!-- Product Rating -->
    <div class="text-gray-600 mb-2">Rating: {{ product.rating.rate }}/5</div>
    <!-- Product Price -->
    <div class="font-bold text-xl mb-4">${{ product.price }}</div>
    <!-- Add to Cart Button -->
    <button
      @click="$emit('addToCart', product)"
      class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-full"
    >
      Add to Cart
    </button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

/**
 * Props passed to the component.
 * @typedef {Object} Product
 * @property {number} id - The unique identifier for the product.
 * @property {string} title - The title of the product.
 * @property {string} image - The URL of the product image.
 * @property {string} category - The category of the product.
 * @property {Object} rating - The rating object of the product.
 * @property {number} rating.rate - The average rating of the product.
 * @property {number} rating.count - The number of ratings for the product.
 * @property {number} price - The price of the product.
 * 
 * @type {Object}
 * @property {Product} product - The product object to display.
 * @property {boolean} isFavorite - Indicates if the product is marked as a favorite.
 */
const props = defineProps({
  product: Object,
  isFavorite: Boolean,
});

/**
 * Emits events from the component.
 * @event toggleFavorite - Emitted when the favorite button is clicked.
 * @event addToCart - Emitted when the add to cart button is clicked.
 */
const emits = defineEmits(['toggleFavorite', 'addToCart']);
</script>

<style scoped>
/* Styles for star rating display */
.star {
  font-size: 1.25rem;
}

/* Styles for filled stars */
.filled {
  color: #ffc107;
}

/* Styles for zoom effect on hover */
.zoom-effect {
  transition: transform 0.3s;
}

.zoom-effect:hover {
  transform: scale(1.1);
}
</style>
