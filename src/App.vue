<template>
  <div :class="{ 'light-mode': isLightMode, 'dark-mode': !isLightMode }">
    <Header />
    <div class="theme-toggle" @click="toggleTheme">
          <span v-if="isLightMode">☀️</span>
          <span v-else>🌙</span>
        </div>
    <router-view />
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

const isLightMode = ref(localStorage.getItem('theme') !== 'dark');

const toggleTheme = () => {
  isLightMode.value = !isLightMode.value;
  localStorage.setItem('theme', isLightMode.value ? 'light' : 'dark');
};

onMounted(() => {
  if (localStorage.getItem('theme')) {
    isLightMode.value = localStorage.getItem('theme') === 'light';
  }
});
</script>

<style>
.light-mode {
  @apply bg-white text-gray-700 text-base; /* Styles for light mode */
}

.dark-mode {
  @apply bg-gray-900 text-white text-base; /* Styles for dark mode */
}

.theme-toggle {
  @apply cursor-pointer;
  font-size: 30px;
}
</style>