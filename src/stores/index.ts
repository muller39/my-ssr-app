import { defineStore } from 'pinia'
import axios from 'axios'

export const useSearchStore = defineStore('search', {
  state: () => ({
    query: '',
    results: [] as any[],
    loading: false,
    error: null as string | null
  }),
  actions: {
    async search() {
      if (this.query.trim() === '') {
        this.results = []
        return
      }
      this.loading = true
      this.error = null
      try {
        const response = await axios.get('https://nominatim.openstreetmap.org/search', {
          params: {
            q: this.query,
            format: 'json'
          }
        })
        this.results = response.data
      } catch (err) {
        this.error = 'Failed to fetch results'
      } finally {
        this.loading = false
      }
    },
    setQuery(query: string) {
      this.query = query
      this.search()
    }
  }
})
