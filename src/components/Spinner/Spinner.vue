<script setup lang="ts">
import { computed } from "vue";
import {
  useStyles,
  useResetStyles,
  mergeClasses,
  makeStyles,
  makeResetStyles,
  shorthands,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";

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
  labelPosition?: "before" | "after" | "above" | "below";
}

const props = withDefaults(defineProps<SpinnerProps>(), {
  size: "medium",
  appearance: "primary",
  labelPosition: "after",
});

defineOptions({ inheritAttrs: false });

const spinnerKeyframes = {
  from: { transform: "rotate(0deg)" },
  to: { transform: "rotate(360deg)" },
};

const useBaseClass = makeResetStyles({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  lineHeight: 0,
  gap: tokens.spacingHorizontalXS,
});

const useSpinnerStyles = makeStyles({
  // Layout for label positions
  before: { flexDirection: "row-reverse" },
  after: { flexDirection: "row" },
  above: { flexDirection: "column-reverse" },
  below: { flexDirection: "column" },

  // Spinner track
  spinner: {
    animationName: spinnerKeyframes,
    animationDuration: "1.5s",
    animationIterationCount: "infinite",
    animationTimingFunction: "linear",
    borderRadius: "50%",
    ...shorthands.borderStyle("solid"),
    ...shorthands.borderColor(tokens.colorBrandStroke2Contrast),
    borderTopColor: tokens.colorBrandStroke1,
  },
  inverted: {
    ...shorthands.borderColor("rgba(255,255,255,0.2)"),
    borderTopColor: tokens.colorNeutralForegroundOnBrand,
  },

  // Sizes
  "extra-tiny": {
    width: "16px",
    height: "16px",
    ...shorthands.borderWidth("1.5px"),
  },
  tiny: { width: "20px", height: "20px", ...shorthands.borderWidth("2px") },
  "extra-small": {
    width: "24px",
    height: "24px",
    ...shorthands.borderWidth("2px"),
  },
  small: { width: "28px", height: "28px", ...shorthands.borderWidth("2.5px") },
  medium: { width: "32px", height: "32px", ...shorthands.borderWidth("3px") },
  large: { width: "36px", height: "36px", ...shorthands.borderWidth("3px") },
  "extra-large": {
    width: "40px",
    height: "40px",
    ...shorthands.borderWidth("3.5px"),
  },
  huge: { width: "44px", height: "44px", ...shorthands.borderWidth("4px") },

  label: {
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightRegular,
    lineHeight: tokens.lineHeightBase300,
    color: tokens.colorNeutralForeground1,
  },
});

const baseClassName = useResetStyles(useBaseClass);
const styles = useStyles(useSpinnerStyles);

const rootClass = computed(() =>
  mergeClasses(
    "fui-Spinner",
    baseClassName.value,
    styles.value[props.labelPosition],
  ),
);

const spinnerClass = computed(() =>
  mergeClasses(
    styles.value.spinner,
    styles.value[props.size],
    props.appearance === "inverted" && styles.value.inverted,
  ),
);
</script>

<template>
  <div :class="rootClass" role="progressbar" v-bind="$attrs">
    <span :class="spinnerClass" />
    <span v-if="$slots.default" :class="styles.label">
      <slot />
    </span>
  </div>
</template>
