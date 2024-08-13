

<template>
  <div class="max-w-md mx-auto p-4">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div>
        <label for="username">Username</label>
        <input type="text" v-model="username" required />
      </div>
      <div>
        <label for="password">Password</label>
        <input :type="showPassword ? 'text' : 'password'" v-model="password" required />
        <button type="button" @click="togglePasswordVisibility">
          {{ showPassword ? 'Hide' : 'Show' }}
        </button>
      </div>
      <button type="submit">Login</button>
    </form>
    <p v-if="loading">Logging in...</p>
    <p v-if="error">{{ error }}</p>
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
  },
};
</script>


