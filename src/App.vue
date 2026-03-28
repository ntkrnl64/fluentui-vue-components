<script setup lang="ts">
import { ref, computed } from "vue";
import { FluentProvider, webLightTheme, webDarkTheme } from "./index";
import GalleryShell from "./gallery/GalleryShell.vue";

const isDark = ref(false);
const theme = computed(() => (isDark.value ? webDarkTheme : webLightTheme));
</script>

<template>
  <FluentProvider :theme="theme">
    <GalleryShell @update:dark="isDark = $event" />
  </FluentProvider>
</template>

<style>
/* Reset */
* {
  margin: 0;
  padding: 0;
}
html,
body,
#app {
  height: 100%;
  overflow: hidden;
}
/* Scrollbar styling */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: var(--colorNeutralForeground4);
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: var(--colorNeutralForeground3);
}
</style>
