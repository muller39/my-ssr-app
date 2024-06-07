<template>
  <div class="search-page">
    <SearchInput />
    <ul class="results-list">
      <SearchResult v-for="result in searchStore.results" :key="result.place_id" :result="result" />
    </ul>
    <div v-if="searchStore.loading" class="loading">Loading...</div>
    <div v-if="searchStore.error" class="error">{{ searchStore.error }}</div>
    <div v-if="!searchStore.loading && !searchStore.results.length" class="loading">
      No one searched items
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useSearchStore } from '../stores/index'
import SearchInput from '../components/SearchInput.vue'
import SearchResult from '../components/SearchResult.vue'

export default defineComponent({
  name: 'SearchPage',
  components: { SearchInput, SearchResult },
  setup() {
    const searchStore = useSearchStore()
    return { searchStore }
  }
})
</script>

<style lang="scss" scoped>
.search-page {
  width: 600px;
  margin: 50px auto;
}
.results-list {
  list-style: none;
  padding: 0;
}
.loading {
  text-align: center;
  font-size: 1.2em;
}
.error {
  color: red;
  text-align: center;
}
</style>
