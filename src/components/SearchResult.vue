<template>
  <li class="result-item">
    <h3>{{ result.display_name }}</h3>
    <p>{{ result.type }}</p>
  </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

export default defineComponent({
  name: 'SearchResult',
  props: {
    result: {
      type: Object as PropType<any>,
      required: true
    }
  }
})
</script>

<style lang="scss" scoped>
.result-item {
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
