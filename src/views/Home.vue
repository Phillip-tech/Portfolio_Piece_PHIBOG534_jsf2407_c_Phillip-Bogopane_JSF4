<template>
  <div>
    <h1 class="text-3xl font-bold mb-6">Our Products</h1>
    <ProductList />
  </div>
</template>

<script>
import ProductList from '../components/ProductList.vue';

export default {
components: {
  ProductList,
},
}
</script>