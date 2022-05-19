<template>
  <Switch v-model="test"></Switch>
  <Button
    v-model="test"
    id="test-1"
    for="change_avatar_modal"
    class="btn btn-xs ml-3 modal-button"
  ></Button>

  <input type="checkbox" id="change_avatar_modal" class="modal-toggle" />
  <div class="modal">
    <div class="modal-box w-[668px] max-w-5xl">
      <AvatarCropper />
    </div>
  </div>
</template>

<script setup lang="ts">
const test = ref(true);
</script>
