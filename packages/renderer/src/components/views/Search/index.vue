<!-- <template> -->
<!-- <div
    class="relative px-4 py-3 w-1/2 bg-sky-50 text-blue-500 rounded border border-blue-100 select-none"
  >
    <div class="text-blue-400 flex flex-row items-center">
      <svg-icon name="infomation" class="h-4 w-4" />
      <span class="pl-3 text-sm">Infomation A new software update is available.</span>
    </div>
    <div class="absolute h-5 -right-3 -top-2.5 rounded-full bg-sky-500">
      <span class="flex text-white h-full text-xs px-2 items-center text-center">9+</span>
    </div>
  </div>

  <div
    class="relative px-4 py-3 w-1/2 bg-green-50 text-green-600 items-center rounded border border-emerald-200 select-none mt-5"
  >
    <div class="text-green-500 flex flex-row items-center">
      <svg-icon name="success" class="h-4 w-4" />
      <span class="pl-3 text-sm">Success A new software update is available.</span>
    </div>
    <div class="absolute h-5 -right-3 -top-2.5 rounded-full bg-green-500">
      <span class="flex text-white h-full text-xs px-2 items-center text-center">2</span>
    </div>
  </div>

  <div
    class="relative px-4 py-3 w-1/2 bg-red-50 text-red-500 items-center rounded border border-red-100 select-none mt-5"
  >
    <div class="text-red-400 flex flex-row items-center">
      <svg-icon name="error" class="h-4 w-4" />
      <span class="pl-3 text-sm">Error A new software update is available.</span>
    </div>
    <div class="absolute h-5 -right-3 -top-2.5 rounded-full bg-red-400">
      <span class="flex text-white h-full text-xs px-2 items-center text-center">9</span>
    </div>
  </div>

  <div
    class="relative px-4 py-3 w-1/2 bg-amber-50 text-yellow-600 items-center rounded border border-yellow-200 select-none mt-5"
  >
    <div class="text-yellow-500 flex flex-row items-center">
      <svg-icon name="warning" class="h-4 w-4" />
      <span class="pl-3 text-sm">Warning A new software update is available.</span>
    </div>
    <div class="absolute h-5 -right-3 -top-2.5 rounded-full bg-yellow-500">
      <span class="flex text-white h-full text-xs px-2 items-center text-center">19</span>
    </div>
  </div> -->

<!-- </template> -->

<!-- <script setup lang="ts"></script> -->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { Combobox, ComboboxInput, ComboboxOptions, ComboboxOption } from '@headlessui/vue'

const people = [
  'Wade Cooper',
  'Arlene McCoy',
  'Devon Webb',
  'Tom Cook',
  'Tanya Fox',
  'Hellen Schmidt',
]
const selectedPerson = ref(people[0])
const query = ref('')

const filteredPeople = computed(() =>
  query.value === ''
    ? people
    : people.filter((person) => {
        return person.toLowerCase().includes(query.value.toLowerCase())
      })
)
</script>

<template>
  <Combobox v-model="selectedPerson">
    <ComboboxInput @change="query = $event.target.value" />
    <ComboboxOptions>
      <ComboboxOption v-for="person in filteredPeople" :key="person" :value="person">
        {{ person }}
      </ComboboxOption>
    </ComboboxOptions>
  </Combobox>
</template>
