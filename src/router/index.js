import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import MealDetail from '../views/MealDetail.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  // ":idMeal" és un paràmetre dinàmic de la URL, p. ex. /meal/53358
  { path: '/meal/:idMeal', name: 'Meal', component: MealDetail }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
