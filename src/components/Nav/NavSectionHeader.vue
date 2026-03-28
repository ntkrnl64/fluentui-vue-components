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
  fontFamily: tokens.fontFamilyBase,
  fontSize: tokens.fontSizeBase200,
  lineHeight: tokens.lineHeightBase200,
  fontWeight: tokens.fontWeightSemibold,
  color: tokens.colorNeutralForeground3,
  ...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalM),
  textTransform: "uppercase",
  letterSpacing: "0.5px",
});

const baseClassName = useResetStyles(useBaseClass);
</script>

<template>
  <div
    :class="mergeClasses('fui-NavSectionHeader', baseClassName)"
    role="heading"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>
