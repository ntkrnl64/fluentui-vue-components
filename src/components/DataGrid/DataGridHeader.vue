<script setup lang="ts">
defineOptions({ inheritAttrs: false });
</script>

<template>
  <thead role="rowgroup" v-bind="$attrs">
    <slot />
  </thead>
</template>
