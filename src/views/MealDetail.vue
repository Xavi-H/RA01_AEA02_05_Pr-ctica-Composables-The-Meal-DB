<script setup>
import { computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useFetch } from '../composables/useFetch'

const route = useRoute()
const { data, loading, error, fetchData } = useFetch()

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i='

// lookup.php retorna { meals: [ plat ] }: agafa el primer element
const meal = computed(() => data.value?.meals?.[0] ?? null)

// L'API no dóna els ingredients com a llista, sinó com a camps numerats:
// strIngredient1..strIngredient20 i strMeasure1..strMeasure20.
// Recorre i monta un array d'objectes { name, measure }
const ingredients = computed(() => {
  if (!meal.value) return [] // Si no hi ha plat, retorna un array buit
  const list = []
  // El maxim d'ingredients de la api es de 20
  for (let i = 1; i <= 20; i++) {
    const name = meal.value['strIngredient' + i]
    const measure = meal.value['strMeasure' + i]
    // Ignora ingredients buits
    if (name && name.trim() !== '') {
      list.push({ name, measure })
    }
  }
  return list
})

// Càrrega inicial amb l'idMeal de la URL (/meal/:idMeal)
onMounted(() => {
  fetchData(BASE_URL + route.params.idMeal)
})

// Si l'id de la url cambia, es torna a carregar el plat
watch(
  () => route.params.idMeal,
  (newId) => {
    if (newId) fetchData(BASE_URL + newId)
  }
)
</script>

<template>
  <main>
    <p v-if="loading">Carregant...</p>
    <p v-else-if="error">Error: {{ error }}</p>
    <p v-else-if="!meal">No s'ha trobat la recepta.</p>

    <div v-else>
      <h2>{{ meal.strMeal }}</h2>
      <img :src="meal.strMealThumb" :alt="meal.strMeal" width="300" />

      <h3>Ingredients</h3>
      <ul>
        <li v-for="ing in ingredients" :key="ing.name">
          {{ ing.name }} - {{ ing.measure }}
        </li>
      </ul>

      <h3>Instruccions</h3>
      <p>{{ meal.strInstructions }}</p>
    </div>
  </main>
</template>
