<template>
  <table class="table w-full border-collapse border border-gray-300">
    <thead>
      <tr class="bg-gray-200">
        <th v-for="header in headers" :key="header.key" class="p-2 border border-gray-300">{{ header.label }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in items" :key="index" class="bg-white">
        <td v-for="header in headers" :key="header.key" class="p-2 border border-gray-300">{{ item[header.key] }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

interface Header {
  key: string
  label: string
}

interface Item {
  [key: string]: any
}

export default defineComponent({
  name: 'Table',
  props: {
    headers: {
      type: Array as () => Header[],
      required: true
    },
    items: {
      type: Array as () => Item[],
      required: true
    }
  },
  setup(props) {
    const headers = [
      { key: 'id', label: 'ID' },
      { key: 'name', label: 'Name' },
      { key: 'age', label: 'Age' }
    ]
    
    const items = [
      { id: 1, name: 'Alice', age: 20 },
      { id: 2, name: 'Bob', age: 30 },
      { id: 3, name: 'Charlie', age: 40 },
      { id: 4, name: 'David', age: 50 },
      { id: 5, name: 'Eve', age: 60 },
    ]

    return { headers, items }
  }
})
</script>

<style>
/* 使用 tailwindcss 样式 */
</style>
