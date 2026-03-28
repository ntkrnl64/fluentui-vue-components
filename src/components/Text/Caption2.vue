<script setup lang="ts">
import Text from "./Text.vue";
defineOptions({ inheritAttrs: false });
</script>
<template>
  <Text :size="100" weight="regular" v-bind="$attrs"><slot /></Text>
</template>
