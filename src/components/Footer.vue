<template>
  <!--
    Footer component displaying copyright information.
    Uses Tailwind CSS classes for styling.
  -->
  <footer class="bg-gray-500 text-white p-4">
    <div class="container mx-auto text-center py-2">
      <!-- Display the copyright text with the current year. -->
      &copy; 2024 SwiftCart. All rights reserved.
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      /**
       * Current year used for the copyright text.
       * @type {number}
       */
      year: new Date().getFullYear()
    };
  },
  computed: {
    /**
     * Generates the copyright text with the current year.
     * @returns {string} The formatted copyright text.
     */
    copyrightText() {
      return `&copy; ${this.year} SwiftCart. All rights reserved.`;
    }
  }
};
</script>
