<script setup lang="ts">
import Text from "./Text.vue";
defineOptions({ inheritAttrs: false });
</script>
<template>
  <Text :size="900" weight="semibold" v-bind="$attrs"><slot /></Text>
</template>
