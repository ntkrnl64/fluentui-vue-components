<script setup lang="ts">
defineOptions({ inheritAttrs: false });
</script>

<template>
  <div role="group" v-bind="$attrs">
    <slot />
  </div>
</template>
