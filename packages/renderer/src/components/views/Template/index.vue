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

  <div class="themeable-example-theme">
    <button
      class="m-2 p-2 rounded bg-themeable-background text-themeable-foreground border"
      onclick="changeTheme('example-theme')"
    >
      switch3
    </button>
  </div>

  <div class="themeable-example-theme2">
    <button
      class="m-2 p-2 rounded bg-themeable-background text-themeable-foreground border"
      onclick="changeTheme('example-theme2')"
    >
      switch4
    </button>
  </div>

  <div class="relative group w-fit">
    <button
      type="button"
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      Light tooltip
    </button>

    <div
      id="tooltip-light"
      class="group-hover:opacity-100 absolute translate-y-full left-1/2 -translate-x-1/2 transition duration-300 ease-in-out inline-block my-2 z-50 py-2 px-3 text-sm font-medium text-white bg-black rounded-lg opacity-10"
    >
      Tooltipasksa
    </div>
  </div>
</template>

<script setup lang="ts">
(window as any).changeTheme = (themeName: string) => {
  document.getElementById('test_theme')!.classList.forEach(cls => {
    if (cls.startsWith('themeable')) {
      document.getElementById('test_theme')!.classList.remove(cls);
    }
  });

  document.getElementById('test_theme')!.classList.add(`themeable-${themeName}`);
};
</script>

<style></style>
