<template>
  <div id="test_theme" class="themeable-dracula">
    <div class="text-themeable-foreground bg-themeable-background">Hello world!</div>

    <div class="text-themeable-foreground bg-themeable-background">Hello world!</div>

    <div class="text-themeable-foreground bg-themeable-background">Hello world!</div>
  </div>

  <div class="themeable-dracula">
    <button
      class="m-2 p-2 rounded bg-themeable-background text-themeable-foreground border"
      onclick="changeTheme('dracula')"
    >
      switch1
    </button>
  </div>

  <div class="themeable-material">
    <button
      class="m-2 p-2 rounded bg-themeable-background text-themeable-foreground border"
      onclick="changeTheme('material')"
    >
      switch2
    </button>
  </div>

  <div class="themeable-Cecil">
    <button
      class="m-2 p-2 rounded bg-themeable-background text-themeable-foreground border"
      onclick="changeTheme('Cecil')"
    >
      Cecil
    </button>
  </div>

  <div class="themeable-Night">
    <button
      class="m-2 p-2 rounded bg-themeable-background text-themeable-foreground border"
      onclick="changeTheme('Night')"
    >
      Night
    </button>
  </div>

  
</template>

<script setup lang="ts">

(window as any).changeTheme = (themeName: string) => {
  document.getElementById('container_view')!.classList.forEach(cls => {
    if (cls.startsWith('themeable')) {
      document.getElementById('container_view')!.classList.remove(cls);
    }
  });

  document.getElementById('container_view')!.classList.add(`themeable-${themeName}`);
};
</script>

<style></style>
