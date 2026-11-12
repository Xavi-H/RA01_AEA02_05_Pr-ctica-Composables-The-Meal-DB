<script setup>
// Rep del pare l'objecte meal
defineProps({
  meal: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div>
    <img :src="meal.strMealThumb" :alt="meal.strMeal" width="200" />
    <h3>{{ meal.strMeal }}</h3>
    <p>{{ meal.strArea }} - {{ meal.strCategory }}</p>
    <!-- Enllaç a la ruta 'Meal' passant l'idMeal com a paràmetre de la URL -->
    <RouterLink :to="{ name: 'Meal', params: { idMeal: meal.idMeal } }">Recepta</RouterLink>
  </div>
</template>
