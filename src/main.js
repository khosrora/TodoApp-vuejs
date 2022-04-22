import { createApp } from 'vue'
import App from './App.vue'

// Import one of the available themes
//import 'vue-toast-notification/dist/theme-default.css';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

createApp(App).use(VueToast, {
    position: "top-left" ,
    
}).mount('#app')
