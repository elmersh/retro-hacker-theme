<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{ items: string[] }>()
const query = ref('')
const filtered = computed(() =>
  props.items.filter((i) => i.toLowerCase().includes(query.value.toLowerCase()))
)
</script>

<template>
  <div class="search">
    <input v-model="query" placeholder="Buscar..." @keyup.enter="$emit('submit', query)" />
    <ul v-if="filtered.length">
      <li v-for="(item, i) in filtered" :key="i" :class="{ active: i === 0 }">{{ item }}</li>
    </ul>
    <p v-else>Sin resultados</p>
  </div>
</template>

<style scoped>
.search { border: 1px solid #39ff14; padding: 1rem; }
.active { font-weight: 700; }
</style>
