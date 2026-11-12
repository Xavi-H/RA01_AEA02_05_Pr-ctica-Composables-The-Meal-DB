<script setup>
import { ref } from 'vue'

// Esdeveniment que el pare (Home) escoltarà amb @busqueda
const emit = defineEmits(['busqueda'])

const consulta = ref('')

// En fer clic al botó enviem el contingut de l'input al pare
function onbusqueda() {
  emit('busqueda', consulta.value)
}
</script>

<template>
  <div>
    <input v-model="consulta" type="text" placeholder="Cerca una recepta..." />
    <button @click="onbusqueda">Buscar</button>
  </div>
</template>
