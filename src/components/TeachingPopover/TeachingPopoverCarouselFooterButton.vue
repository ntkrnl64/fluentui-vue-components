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
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: tokens.fontFamilyBase,
  fontSize: tokens.fontSizeBase300,
  fontWeight: tokens.fontWeightSemibold,
  lineHeight: tokens.lineHeightBase300,
  ...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalM),
  ...shorthands.borderRadius(tokens.borderRadiusMedium),
  border: "none",
  cursor: "pointer",
  outlineStyle: "none",
  backgroundColor: tokens.colorBrandBackground,
  color: tokens.colorNeutralForegroundOnBrand,
  ":hover": { backgroundColor: tokens.colorBrandBackgroundHover },
  ":hover:active": { backgroundColor: tokens.colorBrandBackgroundPressed },
  ":focus-visible": {
    outlineColor: tokens.colorStrokeFocus2,
    outlineWidth: tokens.strokeWidthThick,
    outlineStyle: "solid",
    outlineOffset: "2px",
  },
});

const baseClassName = useResetStyles(useBaseClass);
</script>

<template>
  <button
    :class="
      mergeClasses('fui-TeachingPopoverCarouselFooterButton', baseClassName)
    "
    type="button"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>
