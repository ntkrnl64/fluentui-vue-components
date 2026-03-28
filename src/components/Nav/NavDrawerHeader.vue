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
  padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalM}`,
  gap: tokens.spacingHorizontalS,
});

const baseClassName = useResetStyles(useBaseClass);
</script>

<template>
  <header
    :class="mergeClasses('fui-NavDrawerHeader', baseClassName)"
    v-bind="$attrs"
  >
    <slot />
  </header>
</template>
