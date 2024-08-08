<template>
  <!-- Header Section with Sticky Navigation Bar -->
  <header class="sticky z-50 top-0">
    <!-- Navigation Bar -->
    <nav class="bg-gray-500 border-gray-200">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <!-- Logo and Title -->
        <a href="#" class="flex items-center space-x-3">
          <img src="@/assets/online-shop.png" class="h-8" alt="SwiftCart Logo" />
          <span class="self-center text-2xl font-semibold whitespace-nowrap text-white">SwiftCart</span>
        </a>
        <!-- Mobile Menu Toggle Button -->
        <button
          @click="navbarOpen = !navbarOpen"
          class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden"
        >
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <!-- Navigation Links -->
        <div :class="navbarOpen ? 'block' : 'hidden'" class="w-full md:block md:w-auto">
          <ul
            class="flex flex-col top-10 font-medium p-4 mt-4 border border-gray-100 rounded-lg bg-gray-500 md:space-x-8 md:flex-row md:mt-0"
          >
            <!-- Wishlist Link -->
            <li>
              <a href="#" class="block py-2 px-3 text-white rounded hover:bg-gray-100">Wishlist</a>
            </li>
            <!-- Cart Icon with Notification Badge -->
            <li class="hidden lg:block md:block relative">
              <div class="absolute left-3 -top-4">
                <p class="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-3 text-xs text-white">2</p>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-6 w-6 text-white cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
            </li>
            <!-- Login Link -->
            <li>
              <a href="#" class="block py-2 px-3 text-white rounded hover:bg-gray-100">Login</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref } from 'vue';

/**
 * Indicates whether the navigation bar is open or closed on smaller screens.
 * @type {boolean}
 */
const navbarOpen = ref(false);
</script>
