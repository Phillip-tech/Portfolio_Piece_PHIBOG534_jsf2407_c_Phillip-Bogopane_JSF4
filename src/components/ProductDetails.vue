<template>
  <!-- Product Details View -->
  <div v-if="product" class="flex flex-col md:flex-row mt-6">
    <!-- Product Image -->
    <img :src="product.image" :alt="product.title" class="h-80 w-full md:w-30 object-contain rounded-md" />
    <div class="md:ml-6 mt-4 md:mt-0">
      <!-- Product Title -->
      <h1 class="text-2xl font-bold mb-2">{{ product.title }}</h1>
      <!-- Product Category -->
      <p class="text-gray-600 mb-4">{{ product.category }}</p>
      <!-- Product Description -->
      <p class="mb-4">{{ product.description }}</p>
      <!-- Product Price -->
      <div class="font-bold text-xl mb-4">${{ product.price }}</div>
      <!-- Display the fetched data -->
      <div class="flex items-center mb-4">
        <!-- Display full stars -->
        <span v-for="star in fullStars" :key="star" class="fas fa-star text-yellow-500"></span>
        <!-- Display half star if applicable -->
        <span v-if="hasHalfStar" class="fas fa-star-half-alt text-yellow-500"></span>
        <!-- Display empty stars -->
        <span v-for="star in emptyStars" :key="star" class="far fa-star text-yellow-500"></span>
      </div>
      <!-- Display rating number -->
      <p>Ratings: {{ stars }}</p>
      <!-- Display number of reviews -->
      <p>Number of Reviews: {{ numReviews }}</p>
      <!-- Back button -->
      <button @click="goBack" class="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 mr-2">
        Back
      </button>
      <!-- Toggle favorite button -->
      <button @click="toggleFavorite(product.id)" class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 mr-2">
        {{ isFavorite ? 'Remove from Favorites' : 'Add to Favorites' }}
      </button>
      <!-- Add to cart button -->
      <button @click="addToCart(product)" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
        Add to Cart
      </button>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios'; // Import Axios

export default {
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    // Computed property to get the selected product from the store
    const product = computed(() => store.state.selectedProduct);
    // Computed property to check if the product is a favorite
    const isFavorite = computed(() => store.state.favorites.includes(product.value.id));

    // Reference to store the star rating
    const stars = ref(0);
    // Reference to store the number of ratings
    const numRatings = ref(0);
    // Reference to store the number of reviews
    const numReviews = ref(0);

    // Computed property to get the number of full stars
    const fullStars = computed(() => Math.floor(stars.value));
    // Computed property to check if there is a half star
    const hasHalfStar = computed(() => stars.value % 1 >= 0.5);
    // Computed property to get the number of empty stars
    const emptyStars = computed(() => 5 - fullStars.value - (hasHalfStar.value ? 1 : 0));

    // Reference to indicate loading state
    const loading = ref(false);

    /**
     * Toggles the favorite status of a product.
     * @param {number} productId - The ID of the product to toggle.
     */
    const toggleFavorite = (productId) => {
      store.commit('toggleFavorite', productId);
    };

    /**
     * Adds a product to the cart.
     * @param {Object} product - The product to add to the cart.
     */
    const addToCart = (product) => {
      store.commit('addToCart', product);
    };

    /**
     * Navigates back to the previous page.
     */
    const goBack = () => {
      router.go(-1);
    };

    onMounted(async () => {
      const productId = route.params.id;
      // Find the selected product from the store's products
      const selectedProduct = store.state.products.find((p) => p.id === parseInt(productId));
      store.commit('setSelectedProduct', selectedProduct);

      // Fetch additional data from API
      try {
        loading.value = true; // Set loading to true before API call
        const response = await axios.get(`https://fakestoreapi.com/products/${productId}`);
        stars.value = response.data.rating.rate;
        numRatings.value = response.data.rating.count;
        numReviews.value = response.data.rating.count; // Assuming numReviews is the same as numRatings
      } catch (error) {
        console.error('Error fetching additional data:', error);
      } finally {
        loading.value = false; // Set loading to false after API call
      }
    });

    return { product, isFavorite, toggleFavorite, addToCart, stars, numRatings, numReviews, goBack, fullStars, hasHalfStar, emptyStars, loading };
  }
};
</script>
