import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './style.css'; // Tailwind CSS import
import '@fortawesome/fontawesome-free/css/all.css';

createApp(App).use(router).use(store).mount('#app');
