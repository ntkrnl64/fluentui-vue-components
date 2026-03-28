<script setup lang="ts">
import {
  makeResetStyles,
  useResetStyles,
  mergeClasses,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";

defineOptions({ inheritAttrs: false });
const useBaseClass = makeResetStyles({
  display: "flex",
  alignItems: "center",
  gap: tokens.spacingHorizontalS,
  marginLeft: "auto",
});
const baseClassName = useResetStyles(useBaseClass);
</script>

<template>
  <div
    :class="mergeClasses('fui-MessageBarActions', baseClassName)"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>
