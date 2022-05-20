<template>
  <div
    id="traffic_light"
    class="group absolute top-5 right-4 -translate-y-1/2 flex flex-row-reverse w-3 h-3 rounded-xl items-center"
  >
    <button
      class="w-3 h-3 bg-traffic_close ring-0.5 ring-inset ring-opacity-80 ring-traffic_close_ring rounded-full mr-0 active:bg-red-600"
      style="-webkit-app-region: no-drag"
      @click="close"
    >
      <svg
        width="12"
        height="12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="opacity-0 group-hover:opacity-100"
      >
        <path
          stroke="#740000bf"
          stroke-width="1.2"
          stroke-linecap="round"
          d="m3.596,8.333l4.808,-4.808m0,4.95l-4.808,-4.809"
        />
      </svg>
    </button>
    <button
      class="w-3 h-3 bg-traffic_max ring-0.5 ring-inset ring-opacity-80 ring-traffic_max_ring rounded-full mr-2 active:bg-green-600"
      style="-webkit-app-region: no-drag"
      @click="maximize"
    >
      <svg
        width="12"
        height="12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="opacity-0 group-hover:opacity-100"
      >
        <path
          stroke="#006500"
          stroke-width="1.2"
          stroke-linecap="round"
          d="m3.1,5.9l5.8,0m-3,3l0,-5.8"
        />
      </svg>
    </button>
    <button
      class="w-3 h-3 bg-traffic_min ring-0.5 ring-inset ring-opacity-80 ring-traffic_min_ring rounded-full mr-2 active:bg-yellow-600"
      style="-webkit-app-region: no-drag"
      @click="minimize"
    >
      <svg
        width="12"
        height="12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="opacity-0 group-hover:opacity-100"
      >
        <path stroke="#995700" stroke-width="1.2" stroke-linecap="round" d="m3.1,6l5.8,0" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
let fullscreen = false;
const maximize = () => {
  fullscreen = !fullscreen;
  window.ipcRenderer.send('Max');
};
const minimize = () => {
  window.ipcRenderer.send('Min');
};
const close = () => {
  window.ipcRenderer.send('Close');
};

defineExpose({
  maximize
})
</script>
