<script setup lang="ts">
import Text from "./Text.vue";
defineOptions({ inheritAttrs: false });
</script>
<template>
  <Text :size="200" weight="bold" v-bind="$attrs"><slot /></Text>
</template>
