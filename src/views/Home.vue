<script setup>
import { computed, onMounted } from 'vue'
import { useFetch } from '../composables/useFetch'
import SearchBar from '../components/SearchBar.vue'
import MealCard from '../components/MealCard.vue'

const { data, loading, error, fetchData } = useFetch()

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s='

// L'API retorna { meals: [...] } o { meals: null } si no troba res.
const meals = computed(() => data.value?.meals ?? []) // Si es null es crea un array buit amb "?? []"

// Càrrega inicial
onMounted(() => {
  fetchData(BASE_URL + 'beef') // per defecte es mostra les receptes que tenen beef al nom
})

// Quan l'usuari busca al SearchBar fa un emit i es torna a fer la petició
function onSearch(busqueda) {
  fetchData(BASE_URL + encodeURIComponent(busqueda)) // encodeURIComponent codifica espais i caràcters especials per a la URL
}
</script>

<template>
  <main>
    <SearchBar @busqueda="onSearch"/>

    <p v-if="loading">Carregant...</p>
    <p v-else-if="error">Error: {{ error }}</p>
    <p v-else-if="meals.length === 0">No s'ha trobat cap recepta.</p>

    <div v-else>
      <MealCard v-for="meal in meals" :key="meal.idMeal" :meal="meal" />
    </div>
  </main>
</template>
