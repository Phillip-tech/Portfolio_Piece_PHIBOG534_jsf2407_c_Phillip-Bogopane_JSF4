<template>
  <div>
    <h1 class="text-3xl font-bold mb-6">Shopping Cart</h1>
    <div v-if="cart.length > 0" class="space-y-4">
      <div
        v-for="item in cart"
        :key="item.id"
        class="flex justify-between items-center border-b pb-4"
      >
      <div class="flex items-center">
  <img :src="item.image" :alt="item.title" class="h-300 w-16 object-contain rounded-md" />
  <div class="ml-4">
    <div class="font-semibold">{{ item.title }}</div>
    <div class="text-gray-600">${{ item.price }}</div>
    <label for="quantity">Quantity:</label>
    <input type="number" v-model="item.quantity" @input="updateQuantity(item)" min="1" id="quantity" />
  </div>
</div>
        <button @click="removeFromCart(item.id)" class="text-red-500 hover:text-red-600 bi bi-cart-x  ">
          Remove
        </button>
      </div>
      <div class="font-bold text-xl">Total: ${{ total }}</div>
      <button @click="checkout" class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 mt-4">
        Checkout
      </button>
    </div>
    <div v-else class="text-white-600 underline hover:text-blue-500">
  Your cart is empty. Go back to <router-link to="/" class="glow-link bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mt-4">home</router-link> and add some products!
</div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

// Fetch cart data when component is mounted
onMounted(() => {
  store.dispatch('initializeCart');
});

const cart = computed(() => store.state.cart);
const total = computed(() =>
  cart.value.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)
);

const removeFromCart = (productId) => {
  store.commit('removeFromCart', { productId });
};

const updateQuantity = (item) => {
  store.commit('updateQuantity', { productId: item.id, quantity: item.quantity });
};

const checkout = () => {
  alert('Thank you for your purchase!');
  store.commit('clearCart');
};
</script>
<style>
.glow-link {
  text-decoration: underline;
  color: blue;
  animation: glow 1s infinite alternate;
}

@keyframes glow {
  from {
    text-shadow: 0 0 10px #00f, 0 0 20px #00f, 0 0 30px #00f;
  }
  to {
    text-shadow: 0 0 20px #00f, 0 0 30px #00f, 0 0 40px #00f;
  }
}
</style>