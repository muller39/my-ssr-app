<template>
  <input
    type="text"
    v-model="query"
    @input="onInput"
    placeholder="Search..."
    class="search-input"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useSearchStore } from '../stores/index'
import { useDebounceFn } from '@vueuse/core'

export default defineComponent({
  name: 'SearchInput',
  setup() {
    const searchStore = useSearchStore()
    const query = ref(searchStore.query)

    const onInput = () => {
      void searchProductsDebounced()
    }

    const searchProductsDebounced = useDebounceFn(() => {
      searchStore.setQuery(query.value)
    }, 1000)

    return {
      query,
      onInput
    }
  }
})
</script>

<style lang="scss" scoped>
.search-input {
  width: 100%;
  padding: 10px;
  font-size: 1.2em;
  border: 1px solid #111;
  border-radius: 10px;
}
</style>
