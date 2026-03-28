<script setup lang="ts">
defineOptions({ inheritAttrs: false });
</script>

<template>
  <tbody role="rowgroup" v-bind="$attrs">
    <slot />
  </tbody>
</template>
