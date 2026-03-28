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
  padding: `${tokens.spacingVerticalXXL} ${tokens.spacingHorizontalXXL} ${tokens.spacingVerticalS}`,
  gap: tokens.spacingHorizontalS,
});

const baseClassName = useResetStyles(useBaseClass);
</script>

<template>
  <header
    :class="mergeClasses('fui-DrawerHeader', baseClassName)"
    v-bind="$attrs"
  >
    <slot />
  </header>
</template>
