<script setup lang="ts">
import { computed, useSlots } from "vue";
import {
  useStyles,
  useResetStyles,
  mergeClasses,
  makeStyles,
  makeResetStyles,
  shorthands,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";

export type BadgeAppearance = "filled" | "ghost" | "outline" | "tint";
export type BadgeColor =
  | "brand"
  | "danger"
  | "important"
  | "informative"
  | "severe"
  | "subtle"
  | "success"
  | "warning";
export type BadgeShape = "rounded" | "square" | "circular";
export type BadgeSize =
  | "tiny"
  | "extra-small"
  | "small"
  | "medium"
  | "large"
  | "extra-large";

export interface BadgeProps {
  appearance?: BadgeAppearance;
  color?: BadgeColor;
  shape?: BadgeShape;
  size?: BadgeSize;
}

const props = withDefaults(defineProps<BadgeProps>(), {
  appearance: "filled",
  color: "brand",
  shape: "circular",
  size: "medium",
});

defineOptions({ inheritAttrs: false });
const slots = useSlots();

const useBaseClass = makeResetStyles({
  display: "inline-flex",
  boxSizing: "border-box",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  fontFamily: tokens.fontFamilyBase,
  fontWeight: tokens.fontWeightSemibold,
});

const useBadgeStyles = makeStyles({
  // Sizes
  tiny: {
    width: "6px",
    height: "6px",
    fontSize: "4px",
    minWidth: "6px",
    ...shorthands.padding("0"),
  },
  "extra-small": {
    width: "10px",
    height: "10px",
    fontSize: "6px",
    minWidth: "10px",
    ...shorthands.padding("0"),
  },
  small: {
    minWidth: "16px",
    height: "16px",
    ...shorthands.padding("0", "4px"),
    fontSize: tokens.fontSizeBase100,
  },
  medium: {
    minWidth: "20px",
    height: "20px",
    ...shorthands.padding("0", "5px"),
    fontSize: tokens.fontSizeBase200,
  },
  large: {
    minWidth: "24px",
    height: "24px",
    ...shorthands.padding("0", "6px"),
    fontSize: tokens.fontSizeBase200,
  },
  "extra-large": {
    minWidth: "32px",
    height: "32px",
    ...shorthands.padding("0", "8px"),
    fontSize: tokens.fontSizeBase300,
  },

  // Shapes
  rounded: { ...shorthands.borderRadius(tokens.borderRadiusMedium) },
  square: { ...shorthands.borderRadius(tokens.borderRadiusNone) },
  circular: { ...shorthands.borderRadius(tokens.borderRadiusCircular) },

  // Colors (filled)
  filledBrand: {
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
  },
  filledDanger: {
    backgroundColor: tokens.colorPaletteRedBackground3,
    color: tokens.colorNeutralForegroundOnBrand,
  },
  filledImportant: {
    backgroundColor: tokens.colorNeutralForeground1,
    color: tokens.colorNeutralBackground1,
  },
  filledInformative: {
    backgroundColor: tokens.colorNeutralBackground5,
    color: tokens.colorNeutralForeground3,
  },
  filledSevere: {
    backgroundColor: tokens.colorPaletteDarkOrangeBackground3,
    color: tokens.colorNeutralForegroundOnBrand,
  },
  filledSubtle: {
    backgroundColor: tokens.colorNeutralBackground1,
    color: tokens.colorNeutralForeground1,
  },
  filledSuccess: {
    backgroundColor: tokens.colorPaletteGreenBackground3,
    color: tokens.colorNeutralForegroundOnBrand,
  },
  filledWarning: {
    backgroundColor: tokens.colorPaletteYellowBackground3,
    color: tokens.colorNeutralForeground1,
  },

  // Ghost
  ghostBrand: { color: tokens.colorBrandForeground1 },
  ghostDanger: { color: tokens.colorPaletteRedForeground3 },
  ghostImportant: { color: tokens.colorNeutralForeground1 },
  ghostInformative: { color: tokens.colorNeutralForeground2 },
  ghostSevere: { color: tokens.colorPaletteDarkOrangeForeground3 },
  ghostSubtle: { color: tokens.colorNeutralForegroundDisabled },
  ghostSuccess: { color: tokens.colorPaletteGreenForeground3 },
  ghostWarning: { color: tokens.colorPaletteYellowForeground2 },

  // Outline
  outlineBrand: {
    ...shorthands.borderColor(tokens.colorBrandForeground1),
    color: tokens.colorBrandForeground1,
    ...shorthands.borderStyle("solid"),
    ...shorthands.borderWidth(tokens.strokeWidthThin),
  },
  outlineDanger: {
    ...shorthands.borderColor(tokens.colorPaletteRedForeground3),
    color: tokens.colorPaletteRedForeground3,
    ...shorthands.borderStyle("solid"),
    ...shorthands.borderWidth(tokens.strokeWidthThin),
  },
  outlineImportant: {
    ...shorthands.borderColor(tokens.colorNeutralForeground1),
    color: tokens.colorNeutralForeground1,
    ...shorthands.borderStyle("solid"),
    ...shorthands.borderWidth(tokens.strokeWidthThin),
  },
  outlineInformative: {
    ...shorthands.borderColor(tokens.colorNeutralStroke2),
    color: tokens.colorNeutralForeground3,
    ...shorthands.borderStyle("solid"),
    ...shorthands.borderWidth(tokens.strokeWidthThin),
  },
  outlineSevere: {
    ...shorthands.borderColor(tokens.colorPaletteDarkOrangeForeground3),
    color: tokens.colorPaletteDarkOrangeForeground3,
    ...shorthands.borderStyle("solid"),
    ...shorthands.borderWidth(tokens.strokeWidthThin),
  },
  outlineSubtle: {
    ...shorthands.borderColor(tokens.colorNeutralForegroundDisabled),
    color: tokens.colorNeutralForegroundDisabled,
    ...shorthands.borderStyle("solid"),
    ...shorthands.borderWidth(tokens.strokeWidthThin),
  },
  outlineSuccess: {
    ...shorthands.borderColor(tokens.colorPaletteGreenForeground3),
    color: tokens.colorPaletteGreenForeground3,
    ...shorthands.borderStyle("solid"),
    ...shorthands.borderWidth(tokens.strokeWidthThin),
  },
  outlineWarning: {
    ...shorthands.borderColor(tokens.colorPaletteYellowForeground2),
    color: tokens.colorPaletteYellowForeground2,
    ...shorthands.borderStyle("solid"),
    ...shorthands.borderWidth(tokens.strokeWidthThin),
  },

  // Tint
  tintBrand: {
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorBrandForeground2,
    ...shorthands.borderColor(tokens.colorBrandStroke2),
    ...shorthands.borderStyle("solid"),
    ...shorthands.borderWidth(tokens.strokeWidthThin),
  },
  tintDanger: {
    backgroundColor: tokens.colorPaletteRedBackground1,
    color: tokens.colorPaletteRedForeground1,
    ...shorthands.borderColor(tokens.colorPaletteRedBorder1),
    ...shorthands.borderStyle("solid"),
    ...shorthands.borderWidth(tokens.strokeWidthThin),
  },
  tintSuccess: {
    backgroundColor: tokens.colorPaletteGreenBackground1,
    color: tokens.colorPaletteGreenForeground1,
    ...shorthands.borderColor(tokens.colorPaletteGreenBorder2),
    ...shorthands.borderStyle("solid"),
    ...shorthands.borderWidth(tokens.strokeWidthThin),
  },
  tintWarning: {
    backgroundColor: tokens.colorPaletteYellowBackground1,
    color: tokens.colorPaletteYellowForeground2,
    ...shorthands.borderColor(tokens.colorPaletteYellowBorder1),
    ...shorthands.borderStyle("solid"),
    ...shorthands.borderWidth(tokens.strokeWidthThin),
  },

  // Icon
  icon: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

const baseClassName = useResetStyles(useBaseClass);
const styles = useStyles(useBadgeStyles);

const colorKey = computed(
  () =>
    `${props.appearance}${props.color.charAt(0).toUpperCase()}${props.color.slice(1)}` as keyof typeof styles.value,
);

const rootClass = computed(() =>
  mergeClasses(
    "fui-Badge",
    baseClassName.value,
    styles.value[props.size],
    styles.value[props.shape],
    styles.value[colorKey.value],
  ),
);
</script>

<template>
  <div :class="rootClass" v-bind="$attrs">
    <span v-if="$slots.icon" :class="styles.icon"><slot name="icon" /></span>
    <slot />
  </div>
</template>
