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
});

const baseClassName = useResetStyles(useBaseClass);
</script>

<template>
  <nav
    :class="mergeClasses('fui-DrawerHeaderNavigation', baseClassName)"
    v-bind="$attrs"
  >
    <slot />
  </nav>
</template>
