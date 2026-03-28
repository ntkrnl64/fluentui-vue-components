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
  display: "flex",
  alignItems: "center",
  gap: tokens.spacingHorizontalS,
  width: "100%",
  boxSizing: "border-box",
  fontFamily: tokens.fontFamilyBase,
  fontSize: tokens.fontSizeBase300,
  fontWeight: tokens.fontWeightSemibold,
  lineHeight: tokens.lineHeightBase300,
  color: tokens.colorNeutralForeground1,
  ...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalM),
});

const baseClassName = useResetStyles(useBaseClass);
</script>

<template>
  <div
    :class="mergeClasses('fui-AppItemStatic', baseClassName)"
    v-bind="$attrs"
  >
    <slot name="icon" />
    <slot />
  </div>
</template>
