import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/style.css'
// Creem l'aplicació, hi registrem el router i la muntem a #app
createApp(App).use(router).mount('#app')
