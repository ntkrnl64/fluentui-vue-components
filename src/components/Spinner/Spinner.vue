<script setup lang="ts">
import { computed } from "vue";
import {
  useStyles,
  useResetStyles,
  mergeClasses,
  makeStyles,
  makeResetStyles,
} from "@ntkrnl64/griffel-vue";
import { tokens, typographyStyles } from "@fluentui/react-theme";

export type SpinnerSize =
  | "extra-tiny"
  | "tiny"
  | "extra-small"
  | "small"
  | "medium"
  | "large"
  | "extra-large"
  | "huge";
export type SpinnerAppearance = "primary" | "inverted";

export interface SpinnerProps {
  size?: SpinnerSize;
  appearance?: SpinnerAppearance;
  label?: string;
  labelPosition?: "before" | "after" | "above" | "below";
}

const props = withDefaults(defineProps<SpinnerProps>(), {
  size: "medium",
  appearance: "primary",
  labelPosition: "after",
});

defineOptions({ inheritAttrs: false });

const strokeWidthVar = "--fui-Spinner--strokeWidth";

// Root layout
const useRootBaseClass = makeResetStyles({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  lineHeight: "0",
  gap: "8px",
  overflow: "hidden",
  minWidth: "min-content",
});

const useRootStyles = makeStyles({
  vertical: { flexDirection: "column" },
});

// Spinner ring (mask-based, matching React)
const useSpinnerBaseClass = makeResetStyles({
  position: "relative",
  flexShrink: 0,
  maskImage:
    `radial-gradient(closest-side, ` +
    `transparent calc(100% - var(${strokeWidthVar}) - 1px), ` +
    `white calc(100% - var(${strokeWidthVar})) calc(100% - 1px), ` +
    `transparent 100%)`,
  backgroundColor: tokens.colorBrandStroke2Contrast,
  color: tokens.colorBrandStroke1,
  animationDuration: "1.5s",
  animationIterationCount: "infinite",
  animationTimingFunction: "linear",
  animationName: {
    "0%": { transform: "rotate(0deg)" },
    "100%": { transform: "rotate(360deg)" },
  },
  "@media screen and (prefers-reduced-motion: reduce)": {
    animationDuration: "1.8s",
  },
});

// Spinner tail (animated arc via conic gradients)
const useSpinnerTailBaseClass = makeResetStyles({
  position: "absolute",
  display: "block",
  width: "100%",
  height: "100%",
  maskImage: "conic-gradient(transparent 105deg, white 105deg)",
  "::before": {
    content: '""',
    position: "absolute",
    display: "block",
    width: "100%",
    height: "100%",
    backgroundImage: "conic-gradient(currentcolor 135deg, transparent 135deg)",
    animationDuration: "1.5s",
    animationIterationCount: "infinite",
    animationTimingFunction: tokens.curveEasyEase,
    animationName: {
      "0%": { transform: "rotate(0deg)" },
      "50%": { transform: "rotate(105deg)" },
      "100%": { transform: "rotate(0deg)" },
    },
  },
  "::after": {
    content: '""',
    position: "absolute",
    display: "block",
    width: "100%",
    height: "100%",
    backgroundImage: "conic-gradient(currentcolor 135deg, transparent 135deg)",
    animationDuration: "1.5s",
    animationIterationCount: "infinite",
    animationTimingFunction: tokens.curveEasyEase,
    animationName: {
      "0%": { transform: "rotate(0deg)" },
      "50%": { transform: "rotate(225deg)" },
      "100%": { transform: "rotate(0deg)" },
    },
  },
  animationDuration: "1.5s",
  animationIterationCount: "infinite",
  animationTimingFunction: tokens.curveEasyEase,
  animationName: {
    "0%": { transform: "rotate(-135deg)" },
    "50%": { transform: "rotate(0deg)" },
    "100%": { transform: "rotate(225deg)" },
  },
  "@media screen and (prefers-reduced-motion: reduce)": {
    animationIterationCount: "0" as unknown as number,
    backgroundImage: "conic-gradient(transparent 120deg, currentcolor 360deg)",
    "::before, ::after": {
      content: "none",
    },
  },
});

const useSpinnerStyles = makeStyles({
  inverted: {
    backgroundColor: tokens.colorNeutralStrokeAlpha2,
    color: tokens.colorNeutralStrokeOnBrand2,
  },
  "extra-tiny": {
    height: "16px",
    width: "16px",
    [strokeWidthVar]: tokens.strokeWidthThick,
  } as Record<string, string>,
  tiny: {
    height: "20px",
    width: "20px",
    [strokeWidthVar]: tokens.strokeWidthThick,
  } as Record<string, string>,
  "extra-small": {
    height: "24px",
    width: "24px",
    [strokeWidthVar]: tokens.strokeWidthThick,
  } as Record<string, string>,
  small: {
    height: "28px",
    width: "28px",
    [strokeWidthVar]: tokens.strokeWidthThick,
  } as Record<string, string>,
  medium: {
    height: "32px",
    width: "32px",
    [strokeWidthVar]: tokens.strokeWidthThicker,
  } as Record<string, string>,
  large: {
    height: "36px",
    width: "36px",
    [strokeWidthVar]: tokens.strokeWidthThicker,
  } as Record<string, string>,
  "extra-large": {
    height: "40px",
    width: "40px",
    [strokeWidthVar]: tokens.strokeWidthThicker,
  } as Record<string, string>,
  huge: {
    height: "44px",
    width: "44px",
    [strokeWidthVar]: tokens.strokeWidthThickest,
  } as Record<string, string>,
});

// Label typography matches React: body1 for small sizes, subtitle2 for medium, subtitle1 for huge
const useLabelStyles = makeStyles({
  "extra-tiny": typographyStyles.body1,
  tiny: typographyStyles.body1,
  "extra-small": typographyStyles.body1,
  small: typographyStyles.body1,
  medium: typographyStyles.subtitle2,
  large: typographyStyles.subtitle2,
  "extra-large": typographyStyles.subtitle2,
  huge: typographyStyles.subtitle1,
  inverted: {
    color: tokens.colorNeutralForegroundStaticInverted,
  },
});

const rootBaseClassName = useResetStyles(useRootBaseClass);
const rootStyles = useStyles(useRootStyles);
const spinnerBaseClassName = useResetStyles(useSpinnerBaseClass);
const spinnerTailBaseClassName = useResetStyles(useSpinnerTailBaseClass);
const spinnerStyles = useStyles(useSpinnerStyles);
const labelStyles = useStyles(useLabelStyles);

const isVertical = computed(
  () => props.labelPosition === "above" || props.labelPosition === "below",
);

const rootClass = computed(() =>
  mergeClasses(
    "fui-Spinner",
    rootBaseClassName.value,
    isVertical.value && rootStyles.value.vertical,
  ),
);

const spinnerClass = computed(() =>
  mergeClasses(
    "fui-Spinner__spinner",
    spinnerBaseClassName.value,
    spinnerStyles.value[props.size],
    props.appearance === "inverted" && spinnerStyles.value.inverted,
  ),
);

const tailClass = computed(() =>
  mergeClasses("fui-Spinner__spinnerTail", spinnerTailBaseClassName.value),
);

const labelClass = computed(() =>
  mergeClasses(
    "fui-Spinner__label",
    labelStyles.value[props.size],
    props.appearance === "inverted" && labelStyles.value.inverted,
  ),
);
</script>

<template>
  <div :class="rootClass" role="progressbar" v-bind="$attrs">
    <span v-if="labelPosition === 'before' || labelPosition === 'above'" />
    <span :class="spinnerClass">
      <span :class="tailClass" />
    </span>
    <span v-if="$slots.default || label" :class="labelClass">
      <slot>{{ label }}</slot>
    </span>
  </div>
</template>
