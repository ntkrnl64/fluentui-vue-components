<script setup lang="ts">
import {
  makeResetStyles,
  useResetStyles,
  mergeClasses,
} from "@ntkrnl64/griffel-vue";

defineOptions({ inheritAttrs: false });
const useBaseClass = makeResetStyles({
  flexGrow: 1,
  display: "flex",
  alignItems: "center",
  gap: "4px",
});
const baseClassName = useResetStyles(useBaseClass);
</script>

<template>
  <div
    :class="mergeClasses('fui-MessageBarBody', baseClassName)"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>
