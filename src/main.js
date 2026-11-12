import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Creem l'aplicació, hi registrem el router i la muntem a #app
createApp(App).use(router).mount('#app')
