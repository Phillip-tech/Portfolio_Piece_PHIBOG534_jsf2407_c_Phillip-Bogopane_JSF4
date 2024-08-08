import { createStore } from 'vuex';

export default createStore({
  state: {
    /**
     * List of all products fetched from the API.
     * @type {Array<Object>}
     */
    products: [],

    /**
     * List of available product categories.
     * @type {Array<string>}
     */
    categories: ['All categories'],

    /**
     * List of favorite product IDs.
     * @type {Array<number>}
     */
    favorites: [],

    /**
     * List of products added to the shopping cart.
     * @type {Array<Object>}
     */
    cart: [],

    /**
     * The current search term for filtering products.
     * @type {string}
     */
    searchTerm: '',

    /**
     * The current selected filter category.
     * @type {string}
     */
    filterItem: 'All categories',

    /**
     * The current selected sort order.
     * @type {string}
     */
    sortOrder: 'default',

    /**
     * Indicates if the products are currently being loaded.
     * @type {boolean}
     */
    loading: false,

    /**
     * The currently selected product for viewing details.
     * @type {Object|null}
     */
    selectedProduct: null,
  },
  mutations: {
    /**
     * Sets the list of products in the state.
     * @param {Object} state - The current state object.
     * @param {Array<Object>} products - The list of products to set.
     */
    setProducts(state, products) {
      state.products = products;
    },

    /**
     * Sets the loading state.
     * @param {Object} state - The current state object.
     * @param {boolean} loading - The loading state to set.
     */
    setLoading(state, loading) {
      state.loading = loading;
    },

    /**
     * Sets the selected filter category.
     * @param {Object} state - The current state object.
     * @param {string} filter - The filter category to set.
     */
    setFilterItem(state, filter) {
      state.filterItem = filter;
    },

    /**
     * Sets the selected sort order.
     * @param {Object} state - The current state object.
     * @param {string} sortOrder - The sort order to set.
     */
    setSortOrder(state, sortOrder) {
      state.sortOrder = sortOrder;
    },

    /**
     * Sets the search term for filtering products.
     * @param {Object} state - The current state object.
     * @param {string} searchTerm - The search term to set.
     */
    setSearchTerm(state, searchTerm) {
      state.searchTerm = searchTerm;
    },

    /**
     * Sets the selected product for viewing details.
     * @param {Object} state - The current state object.
     * @param {Object} product - The product to set as selected.
     */
    setSelectedProduct(state, product) {
      state.selectedProduct = product;
    },

    /**
     * Toggles the favorite status of a product.
     * @param {Object} state - The current state object.
     * @param {number} productId - The ID of the product to toggle.
     */
    toggleFavorite(state, productId) {
      const index = state.favorites.indexOf(productId);
      if (index !== -1) {
        state.favorites.splice(index, 1);
      } else {
        state.favorites.push(productId);
      }
    },

    /**
     * Adds a product to the shopping cart.
     * @param {Object} state - The current state object.
     * @param {Object} product - The product to add to the cart.
     */
    addToCart(state, product) {
      state.cart.push(product);
    },
  },
  actions: {
    /**
     * Fetches products from the API and updates the state.
     * @param {Object} context - The store context object.
     */
    async fetchProducts({ commit }) {
      commit('setLoading', true);
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      commit('setProducts', data);
      commit('setLoading', false);
    },
  },
  getters: {
    /**
     * Filters the products based on search term, category, and sort order.
     * @param {Object} state - The current state object.
     * @returns {Array<Object>} The filtered list of products.
     */
    filteredProducts: (state) => {
      let filteredProducts = state.products;

      if (state.filterItem !== 'All categories') {
        filteredProducts = filteredProducts.filter(
          (product) => product.category === state.filterItem
        );
      }

      if (state.searchTerm) {
        filteredProducts = filteredProducts.filter((product) =>
          product.title.toLowerCase().includes(state.searchTerm.toLowerCase())
        );
      }

      if (state.sortOrder === 'low-to-high') {
        filteredProducts.sort((a, b) => a.price - b.price);
      } else if (state.sortOrder === 'high-to-low') {
        filteredProducts.sort((a, b) => b.price - a.price);
      } else {
        filteredProducts.sort((a, b) => a.id - b.id);
      }

      return filteredProducts;
    },
  },
});
