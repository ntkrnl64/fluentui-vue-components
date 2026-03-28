<script setup lang="ts">
import {
  useResetStyles,
  mergeClasses,
  makeResetStyles,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";

defineOptions({ inheritAttrs: false });

const useBaseClass = makeResetStyles({
  display: "flex",
  alignItems: "center",
  gap: tokens.spacingHorizontalS,
  marginTop: tokens.spacingVerticalXS,
});

const baseClassName = useResetStyles(useBaseClass);
</script>

<template>
  <div :class="mergeClasses('fui-ToastFooter', baseClassName)" v-bind="$attrs">
    <slot />
  </div>
</template>
