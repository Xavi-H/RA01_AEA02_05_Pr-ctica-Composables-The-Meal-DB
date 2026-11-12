import { ref } from 'vue'

// Composable: lògica reutilitzable per consumir una API.
// Cada component que el cridi obté el seu propi estat (data, loading, error).
export function useFetch() {
  const data = ref(null) // resposta JSON de l'API
  const loading = ref(false) // true mentre s'espera la resposta
  const error = ref(null) // missatge d'error, si n'hi ha

  // Fa la petició a la URL que rep. El component decideix quan cridar-la
  async function fetchData(url) {
    loading.value = true
    error.value = null
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('Error ' + response.status)
      }
      data.value = await response.json()
    } catch (e) {
      error.value = e.message
    } finally {
      // Al acabar torna a fals
      loading.value = false
    }
  }

  return { data, loading, error, fetchData }
}
