<template>
  <header class="sticky z-50 top-0">
    <nav class="bg-gray-500 border-gray-200">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="#" class="flex items-center space-x-3">
          <img src="@/assets/online-shop.png" class="h-8" alt="SwiftCart Logo" />
          <span class="self-center text-2xl font-semibold whitespace-nowrap text-white">SwiftCart</span>
        </a>
        <button @click="toggleNavbar" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden">
          <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
        </button>
        <div :class="navbarOpen ? 'block' : 'hidden'" class="w-full md:block md:w-auto">
          <ul class="flex flex-col top-10 font-medium p-4 mt-4 border border-gray-100 rounded-lg bg-gray-500 md:space-x-8 md:flex-row md:mt-0">
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/ComparisonList">ComparisonList</router-link></li>
            <li v-if="!isAuthenticated"><router-link to="/login">Login</router-link></li>
            <li v-if="isAuthenticated"><button @click="logout">Logout</button></li>
            <li><router-link to="/Wishlist">Wishlist</router-link></li>
            <li><router-link to="/CartView">Cart</router-link></li>
            <li><router-link to="/help">Help</router-link></li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      navbarOpen: false,
      isAuthenticated: false, // Update this based on user authentication status
      cartItems: [] // Array to store items in the cart
    };
  },
  methods: {
    toggleNavbar() {
      this.navbarOpen = !this.navbarOpen;
    },
    logout() {
      // Implement logout functionality here
      this.isAuthenticated = false; // Update authentication status on logout
    },
    addToCart(item) {
      // Add the selected item to the cartItems array
      this.cartItems.push(item);
      // You can also perform additional logic here, such as updating the cart total or displaying a success message
    }
  }
};
</script>