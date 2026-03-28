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
  justifyContent: "flex-end",
  gap: tokens.spacingHorizontalS,
  padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalXXL} ${tokens.spacingVerticalXXL}`,
});

const baseClassName = useResetStyles(useBaseClass);
</script>

<template>
  <footer
    :class="mergeClasses('fui-DrawerFooter', baseClassName)"
    v-bind="$attrs"
  >
    <slot />
  </footer>
</template>
