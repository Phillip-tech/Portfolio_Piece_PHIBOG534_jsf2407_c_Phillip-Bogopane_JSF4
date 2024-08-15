<template>
  <template>
  <div class="comparison-container" v-if="currentUser">
    <h2 class="text-2xl font-bold mb-4">Comparison List</h2>
    <button @click="$router.push('/comparisonListView')">Go to Comparison List View</button>
    <!-- Existing table and content -->
  </div>
</template>
  <div class="comparison-container" v-if="currentUser">
    <h2 class="text-2xl font-bold mb-4">Comparison List</h2>
    <table v-if="comparisonList.length > 0" class="w-full border-collapse border">
      <thead>
        <tr>
          <th class="border p-2">Product</th>
          <th v-for="product in comparisonList" :key="product.id" class="border p-2">
            {{ product.title }}
            <button @click="removeFromComparisonList(product.id)" class="ml-2 text-red-500">X</button>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="border p-2">Image</td>
          <td v-for="product in comparisonList" :key="product.id" class="border p-2">
            <img :src="product.image" :alt="product.title" class="comparison-image" />
          </td>
        </tr>
        <tr>
          <td class="border p-2">Description</td>
          <td v-for="product in comparisonList" :key="product.id" class="border p-2">{{ product.description }}</td>
        </tr>
        <tr>
          <td class="border p-2">Price</td>
          <td v-for="product in comparisonList" :key="product.id" class="border p-2">${{ product.price.toFixed(2) }}</td>
        </tr>
        <tr>
          <td class="border p-2">Rating</td>
          <td v-for="product in comparisonList" :key="product.id" class="border p-2">
            {{ product.rating ? product.rating.rate.toFixed(1) : 'N/A' }} / 5
          </td>
        </tr>
      </tbody>
    </table>
    <button @click="clearComparisonList" v-if="comparisonList.length > 0" class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 mt-4">
      Clear Comparison List
    </button>
    <p v-if="comparisonList.length === 0">No items in the comparison list.</p>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();

    const comparisonList = computed(() => store.state.comparisonList);
    const currentUser = computed(() => store.state.currentUser);

    const removeFromComparisonList = (productId) => {
      store.commit('removeFromComparisonList', productId);
    };

    const clearComparisonList = () => {
      store.commit('clearComparisonList');
    };

    return {
      comparisonList,
      currentUser,
      removeFromComparisonList,
      clearComparisonList,
    };
  },
};
</script>

<style scoped>
.comparison-container {
  padding: 1rem;
}

.comparison-image {
  max-width: 100px;
  max-height: 100px;
  object-fit: contain;
}
</style>