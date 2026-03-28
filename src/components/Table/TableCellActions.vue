<script setup lang="ts">
import {
  useResetStyles,
  mergeClasses,
  makeResetStyles,
  shorthands,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";

defineOptions({ inheritAttrs: false });

const useBaseClass = makeResetStyles({
  position: "absolute",
  right: "0",
  top: "50%",
  transform: "translateY(-50%)",
  display: "flex",
  alignItems: "center",
  gap: tokens.spacingHorizontalXS,
  ...shorthands.padding(tokens.spacingVerticalXXS, tokens.spacingHorizontalS),
  backgroundColor: tokens.colorNeutralBackground1,
  boxShadow: tokens.shadow4,
  ...shorthands.borderRadius(tokens.borderRadiusMedium),
  opacity: 0,
  visibility: "hidden",
  transitionProperty: "opacity, visibility",
  transitionDuration: tokens.durationFast,
});

const baseClassName = useResetStyles(useBaseClass);
</script>

<template>
  <div
    :class="mergeClasses('fui-TableCellActions', baseClassName)"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>
