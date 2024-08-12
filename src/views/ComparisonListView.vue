<template>
  <div class="comparison-container">
    <h2>Comparison List</h2>
    <table v-if="comparisonList.length > 0">
      <thead>
        <tr>
          <th>Title</th>
          <th>Image</th>
          <th>Description</th>
          <th>Price</th>
          <th>Rating</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in comparisonList" :key="product.id">
          <td>{{ product.title }}</td>
          <td><img :src="product.image" :alt="product.title" class="comparison-image" /></td>
          <td>{{ product.description }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.rating ? product.rating.rate : 'N/A' }}</td>
          <td>
            <button @click="removeFromComparisonList(product.id)">Remove</button>
          </td>
        </tr>
      </tbody>
    </table>
    <button @click="clearComparisonList" v-if="comparisonList.length > 0">Clear Comparison List</button>
    <p v-if="comparisonList.length === 0">No items in the comparison list.</p>
  </div>
</template>
  <script>
  export default {
    computed: {
      comparisonList() {
        return this.$store.state.comparisonList;
      },
    },
    methods: {
      removeFromComparisonList(productId) {
        this.$store.commit('removeFromComparisonList', productId);
      },
      clearComparisonList() {
        this.$store.commit('clearComparisonList');
      },
    },
  };
  </script>
  
  <style scoped>
  .comparison-container {
    padding: 1rem;
  }
  
  .comparison-image {
    max-width: 50px;
  }
  </style>
  