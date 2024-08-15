<template>
  <div class="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
    <h2 class="text-center text-2xl font-bold">Login</h2>
    <form @submit.prevent="login" class="p-4">
      <div class="mb-4">
        <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
        <input type="text" v-model="username" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-300" />
      </div>
      <div class="mb-4">
        <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
        <input :type="showPassword ? 'text' : 'password'" v-model="password" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-300" />
        <button type="button" @click="togglePasswordVisibility" class="inline-flex items-center px-2 py-1 text-xs text-gray-500 hover:text-gray-700">
          {{ showPassword ? 'Hide' : 'Show' }}
        </button>
      </div>
      <button type="submit" class="w-full px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">Login</button>
    </form>
    <p v-if="loading" class="text-center text-sm text-gray-500">Logging in...</p>
    <p v-if="error" class="text-center text-sm text-red-500">{{ error }}</p>
    <button type="button" @click="logout" v-if="isHomeRoute" class="w-full px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300">Logout</button>
  </div>
</template>


<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      showPassword: false,
      loading: false,
      error: null,
    };
  },
  computed: {
    isHomeRoute() {
      return this.$router.currentRoute.name === 'Home';
    },
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    async login() {
      if (!this.username || !this.password) {
        this.error = "Username and password can't be empty";
        return;
      }

      this.loading = true;
      this.error = null;

      try {
        const response = await fetch('https://fakestoreapi.com/auth/login', {
          method: 'POST',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify({ username: this.username, password: this.password }),
        });

        const data = await response.json();

        if (response.ok) {
          localStorage.setItem('token', data.token);
          this.$router.push({ name: 'Home' });
        } else {
          this.error = 'Login failed. Please check your credentials.';
        }
      } catch (err) {
        this.error = 'An error occurred. Please try again later.';
      } finally {
        this.loading = false;
      }
    },
    logout() {
      localStorage.removeItem('token');
      this.$router.push({ name: 'Login' });
    },
  },
};
</script>