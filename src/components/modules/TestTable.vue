<template>
  <table class="min-w-full divide-y divide-gray-200">
    <thead class="bg-gray-50">
      <tr>
        <th
          v-for="column in columns"
          :key="column.key"
          scope="col"
          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          {{ column.title }}
        </th>
      </tr>
    </thead>
    <tbody class="bg-white divide-y divide-gray-200">
      <tr v-for="(record, i) in dataSource" :key="i">
        <td
          v-for="column in columns"
          :key="column.key"
          class="px-6 py-4 whitespace-nowrap"
        >
          {{ record[column.key] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script setup>
import { defineProps, withDefaults } from 'vue'
import { ref, computed } from "@vue/reactivity"

const props = withDefaults(defineProps([
  {
    name: 'columns',
    type: Array,
    default: () => []
  },
  {
    name: 'dataSource',
    type: Array,
    default: () => []
  }
]), {
  columns: [],
  dataSource: []
})
</script>