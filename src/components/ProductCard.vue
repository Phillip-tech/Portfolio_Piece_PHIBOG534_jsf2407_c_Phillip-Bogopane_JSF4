<template>
  <div class="border rounded-lg p-4 shadow-md hover:shadow-lg zoom-effect">
    <router-link :to="{ name: 'ProductView', params: { id: product.id }}">
      <img :src="product.image" :alt="product.title" class="h-48 w-full object-contain mb-4" />
    </router-link>
    <div class="flex justify-between items-start mb-2 p-4">
      <div class="text-lg font-semibold">{{ product.title }}</div>
      <button @click="$emit('toggleFavorite', product.id)" class="text-gray-500 hover:text-red-500">
        <svg v-if="isFavorite" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="h-6 w-6">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="h-6 w-6">
          <path d="M16.5 3C14.76 3 13.09 3.81 12 5.09C10.91 3.81 9.24 3 7.5 3C4.42 3 2 5.42 2 8.5C2 12.28 5.4 15.36 10.55 19.54L12 20.87L13.45 19.54C18.6 15.36 22 12.28 22 8.5C22 5.42 19.58 3 16.5 3ZM12.1 18.55L12 18.65L11.9 18.55C7.14 14.24 4 11.39 4 8.5C4 6.5 5.5 5 7.5 5C8.74 5 9.97 5.61 10.55 6.68H13.45C14.03 5.61 15.26 5 16.5 5C18.5 5 20 6.5 20 8.5C20 11.39 16.86 14.24 12.1 18.55Z" />
        </svg>
      </button>
    </div>
    <div class="text-gray-600 mb-2">{{ product.category }}</div>
    <div class="ratings">
      <span v-for="star in 5" :key="star" class="star" :class="{ filled: star <= Math.round(product.rating.rate) }">⭐</span>
      <span class="reviews">({{ product.rating.count }} reviews)</span>
    </div>
    <div class="text-gray-600 mb-2">Rating: {{ product.rating.rate }}/5</div>
    <div class="font-bold text-xl mb-4">${{ product.price }}</div>
    <button
    @click="$emit('addToCart', product)"
    class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-full"
    >
      Add to Cart
    </button>
    <button
      @click="addToComparisonList(product)"
      class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 w-full mt-2"
    >
      Add to ComparisonList
    </button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { computed } from 'vue';

const props = defineProps({
  product: Object,
  isFavorite: Boolean,
});

const emits = defineEmits(['toggleFavorite', 'addToCart']);

const router = useRouter();
const store = useStore();

const currentUser = computed(() => store.state.currentUser);

const addToComparisonList = (product) => {
  store.commit('addToComparisonList', product);
  router.push({ name: 'ComparisonList' });
};
</script>

<style scoped>
.star {
  font-size: 1.25rem;
}
.filled {
  color: #ffc107;
}
.zoom-effect {
  transition: transform 0.3s;
}
.zoom-effect:hover {
  transform: scale(1.1);
}
</style>