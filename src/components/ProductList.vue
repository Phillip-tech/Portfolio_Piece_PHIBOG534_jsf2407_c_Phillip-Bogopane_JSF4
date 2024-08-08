<template>
  <div>
    <!-- Search and Filter Section -->
    <div class="flex justify-between items-center mt-4">
      <!-- Search Form -->
      <form @submit.prevent="handleSearch" class="relative w-full max-w-sm flex items-center">
        <div class="relative flex w-full">
          <input
            type="search"
            v-model="searchTerm"
            class="p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search products..."
          />
          <div class="flex items-center">
            <!-- Search Button -->
            <button
              type="submit"
              class="p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
            >
              <svg
                class="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m2-5a7 7 0 1 1-7-7 7 7 0 0 1 7 7Z"
                />
              </svg>
              <span class="sr-only">Search</span>
            </button>
            <!-- Reset Button -->
            <button @click="resetFilters" class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 ml-2">
              Reset
            </button>
          </div>
        </div>
      </form>

      <!-- Filter and Sort Options -->
      <div class="flex space-x-3">
        <!-- Filter Dropdown -->
        <select v-model="filterItem" @change="handleFilterChange" class="border-gray-300 rounded-lg">
          <option value="All categories">All categories</option>
          <option value="electronics">Electronics</option>
          <option value="men's clothing">Men's Clothing</option>
          <option value="jewelery">Jewelery</option>
          <option value="women's clothing">Women's Clothing</option>
        </select>

        <!-- Sort Order Dropdown -->
        <select v-model="sortOrder" @change="handleSortOrderChange" class="border-gray-300 rounded-lg">
          <option value="default">Default</option>
          <option value="low-to-high">Price: Low to High</option>
          <option value="high-to-low">Price: High to Low</option>
        </select>
      </div>
    </div>

    <!-- Product List Section -->
    <div v-if="loading" class="flex justify-center mt-10">
      Loading...
    </div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
      <!-- Product Card Component -->
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
        @toggleFavorite="toggleFavorite"
        @addToCart="addToCart"
        :isFavorite="favorites.includes(product.id)"
        class="flex flex-col justify-between"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import ProductCard from './ProductCard.vue';

const store = useStore();

// Dispatch the action to fetch products when the component is mounted
onMounted(() => {
  store.dispatch('fetchProducts');
});

// Computed properties for accessing and updating store state
/**
 * Indicates if the products are currently being loaded.
 * @type {boolean}
 */
const loading = computed(() => store.state.loading);

/**
 * List of product categories.
 * @type {Array<string>}
 */
const categories = computed(() => store.state.categories);

/**
 * Currently selected filter item.
 * @type {string}
 */
const filterItem = computed({
  get: () => store.state.filterItem,
  set: (value) => store.commit('setFilterItem', value),
});

/**
 * Currently selected sort order.
 * @type {string}
 */
const sortOrder = computed({
  get: () => store.state.sortOrder,
  set: (value) => store.commit('setSortOrder', value),
});

/**
 * Current search term for filtering products.
 * @type {string}
 */
const searchTerm = computed({
  get: () => store.state.searchTerm,
  set: (value) => store.commit('setSearchTerm', value),
});

/**
 * List of favorite product IDs.
 * @type {Array<number>}
 */
const favorites = computed(() => store.state.favorites);

/**
 * List of products filtered based on the search term, category, and sort order.
 * @type {Array<Object>}
 */
const filteredProducts = computed(() => store.getters.filteredProducts);

// Methods to handle filter, sort, search, and other actions

/**
 * Handle changes to the filter item.
 */
const handleFilterChange = () => {
  store.commit('setFilterItem', filterItem.value);
};

/**
 * Handle changes to the sort order.
 */
const handleSortOrderChange = () => {
  store.commit('setSortOrder', sortOrder.value);
};

/**
 * Handle the search form submission.
 */
const handleSearch = () => {
  store.commit('setSearchTerm', searchTerm.value);
};

/**
 * Toggle the favorite status of a product.
 * @param {number} productId - The ID of the product to toggle.
 */
const toggleFavorite = (productId) => {
  store.commit('toggleFavorite', productId);
};

/**
 * Add a product to the cart.
 * @param {Object} product - The product to add to the cart.
 */
const addToCart = (product) => {
  store.commit('addToCart', product);
};

/**
 * Reset all filters to their default values.
 */
const resetFilters = () => {
  store.commit('setFilterItem', 'All categories');
  store.commit('setSortOrder', 'default');
  store.commit('setSearchTerm', '');
};
</script>

<style scoped>
/* Ensure the ProductCard component has a consistent height */
.product-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.product-card .add-to-cart-button {
  margin-top: auto; /* Push the button to the bottom */
}
</style>
