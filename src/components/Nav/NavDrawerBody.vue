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
  flexDirection: "column",
  flexGrow: 1,
  overflowY: "auto",
  padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalM}`,
  gap: tokens.spacingVerticalXS,
});

const baseClassName = useResetStyles(useBaseClass);
</script>

<template>
  <div
    :class="mergeClasses('fui-NavDrawerBody', baseClassName)"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>
