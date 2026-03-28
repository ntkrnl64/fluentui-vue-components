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
  justifyContent: "space-between",
  marginBottom: tokens.spacingVerticalS,
});

const baseClassName = useResetStyles(useBaseClass);
</script>

<template>
  <div
    :class="mergeClasses('fui-TeachingPopoverHeader', baseClassName)"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>
