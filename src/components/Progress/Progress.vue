<script setup lang="ts">
import { computed } from "vue";
import {
  useStyles,
  mergeClasses,
  makeStyles,
  shorthands,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";

export type ProgressThickness = "medium" | "large";
export type ProgressShape = "rounded" | "square";
export type ProgressColor = "brand" | "error" | "warning" | "success";

export interface ProgressBarProps {
  value?: number;
  max?: number;
  thickness?: ProgressThickness;
  shape?: ProgressShape;
  color?: ProgressColor;
}

const props = withDefaults(defineProps<ProgressBarProps>(), {
  max: 1,
  thickness: "medium",
  shape: "rounded",
  color: "brand",
});

defineOptions({ inheritAttrs: false });

const ZERO_THRESHOLD = 0.01;

const isIndeterminate = computed(() => props.value === undefined);
const percentage = computed(() => {
  if (isIndeterminate.value) return 0;
  return Math.min(100, Math.max(0, ((props.value ?? 0) / props.max) * 100));
});
const isNonZero = computed(
  () => !isIndeterminate.value && (props.value ?? 0) > ZERO_THRESHOLD,
);

// Indeterminate: horizontal slide from off-screen left to off-screen right
const indeterminateSlide = {
  "0%": { transform: "translateX(-100%)" },
  "100%": { transform: "translateX(300%)" },
};

// Reduced motion: opacity pulse
const indeterminatePulse = {
  "0%": { opacity: "0.2" },
  "50%": { opacity: "1" },
  "100%": { opacity: "0.2" },
};

const useRootStyles = makeStyles({
  root: {
    display: "block",
    backgroundColor: tokens.colorNeutralBackground6,
    width: "100%",
    overflow: "hidden",
  },
  rounded: {
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
  },
  square: {
    ...shorthands.borderRadius(tokens.borderRadiusNone),
  },
  medium: {
    height: "2px",
  },
  large: {
    height: "4px",
  },
});

const useBarStyles = makeStyles({
  base: {
    ...shorthands.borderRadius("inherit"),
    height: "100%",
  },
  nonZeroDeterminate: {
    transitionProperty: "width",
    transitionDuration: "0.3s",
    transitionTimingFunction: "ease",
  },
  indeterminate: {
    maxWidth: "33%",
    position: "relative",
    backgroundImage: `linear-gradient(
      to right,
      ${tokens.colorNeutralBackground6} 0%,
      ${tokens.colorTransparentBackground} 50%,
      ${tokens.colorNeutralBackground6} 100%
    )`,
    animationName: indeterminateSlide,
    animationDuration: "3s",
    animationIterationCount: "infinite",
    animationTimingFunction: "linear",
    "@media screen and (prefers-reduced-motion: reduce)": {
      maxWidth: "100%",
      animationName: indeterminatePulse,
    },
  },
  brand: {
    backgroundColor: tokens.colorCompoundBrandBackground,
  },
  error: {
    backgroundColor: tokens.colorPaletteRedBackground3,
  },
  warning: {
    backgroundColor: tokens.colorPaletteDarkOrangeBackground3,
  },
  success: {
    backgroundColor: tokens.colorPaletteGreenBackground3,
  },
});

const rootStyles = useStyles(useRootStyles);
const barStyles = useStyles(useBarStyles);

const rootClass = computed(() =>
  mergeClasses(
    "fui-ProgressBar",
    rootStyles.value.root,
    rootStyles.value[props.shape],
    rootStyles.value[props.thickness],
  ),
);

const barClass = computed(() =>
  mergeClasses(
    "fui-ProgressBar__bar",
    barStyles.value.base,
    barStyles.value.brand,
    isIndeterminate.value && barStyles.value.indeterminate,
    isNonZero.value && barStyles.value.nonZeroDeterminate,
    !isIndeterminate.value && props.color && barStyles.value[props.color],
  ),
);
</script>

<template>
  <div
    :class="rootClass"
    role="progressbar"
    :aria-valuenow="isIndeterminate ? undefined : value"
    :aria-valuemin="isIndeterminate ? undefined : 0"
    :aria-valuemax="isIndeterminate ? undefined : max"
    v-bind="$attrs"
  >
    <div
      :class="barClass"
      :style="isIndeterminate ? {} : { width: `${percentage}%` }"
    />
  </div>
</template>
