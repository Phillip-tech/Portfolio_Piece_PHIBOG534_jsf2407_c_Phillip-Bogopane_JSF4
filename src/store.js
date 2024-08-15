import { createStore } from 'vuex';
import { jwtDecode } from 'jwt-decode';

export default createStore({
  state: {
    products: [],
    categories: ['All categories'],
    favorites: [],
    cart: {},
    searchTerm: '',
    filterItem: 'All categories',
    sortOrder: 'default',
    loading: false,
    selectedProduct: null,
    comparisonList: [],
    currentUser: null,
    isLightMode: true, // Add new state property for theme preference
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
    setLoading(state, loading) {
      state.loading = loading;
    },
    setFilterItem(state, filter) {
      state.filterItem = filter;
    },
    setSortOrder(state, sortOrder) {
      state.sortOrder = sortOrder;
    },
    setSearchTerm(state, searchTerm) {
      state.searchTerm = searchTerm;
    },
    setSelectedProduct(state, product) {
      state.selectedProduct = product;
    },
    toggleFavorite(state, productId) {
      const index = state.favorites.indexOf(productId);
      if (index !== -1) {
        state.favorites.splice(index, 1);
      } else {
        state.favorites.push(productId);
      }
    },
    addToCart(state, { userId, product, quantity }) {
      if (!state.cart[userId]) {
        state.cart[userId] = [];
      }
      const existingItem = state.cart[userId].find(item => item.id === product.id);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.cart[userId].push({ ...product, quantity });
      }
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    updateCartItem(state, { userId, productId, quantity }) {
      const item = state.cart[userId].find(item => item.id === productId);
      if (item) {
        item.quantity = quantity;
        localStorage.setItem('cart', JSON.stringify(state.cart));
      }
    },
    removeFromCart(state, { userId, productId }) {
      state.cart[userId] = state.cart[userId].filter(item => item.id !== productId);
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    clearCart(state, userId) {
      state.cart[userId] = [];
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    setCurrentUser(state, user) {
      state.currentUser = user;
    },
    addToComparisonList(state, product) {
      if (state.comparisonList.length < 4 && !state.comparisonList.some(item => item.id === product.id)) {
        state.comparisonList.push(product);
      }
    },
    removeFromComparisonList(state, productId) {
      state.comparisonList = state.comparisonList.filter(product => product.id !== productId);
    },
    clearComparisonList(state) {
      state.comparisonList = [];
    },
    setThemePreference(state, isLightMode) { // New mutation for theme preference
      state.isLightMode = isLightMode;
    },
  },
  actions: {
    async fetchProducts({ commit }) {
      commit('setLoading', true);
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      commit('setProducts', data);
      commit('setLoading', false);
    },
    initializeCart({ commit }) {
      const cart = JSON.parse(localStorage.getItem('cart')) || {};
      commit('setCart', cart);
    },
    login({ commit }, token) {
      const user = jwtDecode(token);
      commit('setCurrentUser', user);
      localStorage.setItem('token', token);
    },
    logout({ commit }) {
      commit('setCurrentUser', null);
      localStorage.removeItem('token');
    },
    updateThemePreference({ commit }, isLightMode) { // New action for theme preference
      commit('setThemePreference', isLightMode);
      localStorage.setItem('themePreference', isLightMode);
    },
  },
  getters: {
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
    cartItemCount: (state) => (userId) => {
      return state.cart[userId] ? state.cart[userId].reduce((total, item) => total + item.quantity, 0) : 0;
    },
    cartTotal: (state) => (userId) => {
      return state.cart[userId] ? state.cart[userId].reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2) : '0.00';
    },
    themePreference: state => state.isLightMode, // New getter for theme preference
  },
});

