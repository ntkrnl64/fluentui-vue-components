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

export type ProgressThickness = "medium" | "large";
export type ProgressShape = "rounded" | "square";

export interface ProgressProps {
  value?: number;
  max?: number;
  thickness?: ProgressThickness;
  shape?: ProgressShape;
}

const props = withDefaults(defineProps<ProgressProps>(), {
  max: 1,
  thickness: "medium",
  shape: "rounded",
});

defineOptions({ inheritAttrs: false });

const useBaseClass = makeResetStyles({
  display: "block",
  backgroundColor: tokens.colorNeutralBackground6,
  justifySelf: "stretch",
  overflow: "hidden",
  ...shorthands.borderRadius(tokens.borderRadiusMedium),
  height: "2px",
});

const useProgressStyles = makeStyles({
  large: { height: "4px" },
  square: { ...shorthands.borderRadius(tokens.borderRadiusNone) },
  bar: {
    backgroundColor: tokens.colorBrandBackground,
    ...shorthands.borderRadius("inherit"),
    height: "100%",
    transitionProperty: "width",
    transitionDuration: "0.3s",
    transitionTimingFunction: "ease",
  },
  indeterminate: {
    maxWidth: "33%",
    position: "relative",
    animationName: {
      "0%": { left: "0%" },
      "100%": { left: "100%" },
    },
    animationDuration: "3s",
    animationIterationCount: "infinite",
  },
});

const baseClassName = useResetStyles(useBaseClass);
const styles = useStyles(useProgressStyles);

const isIndeterminate = computed(() => props.value === undefined);
const percentage = computed(() => {
  if (isIndeterminate.value) return 0;
  return Math.min(100, Math.max(0, ((props.value ?? 0) / props.max) * 100));
});

const rootClass = computed(() =>
  mergeClasses(
    "fui-ProgressBar",
    baseClassName.value,
    props.thickness === "large" && styles.value.large,
    props.shape === "square" && styles.value.square,
  ),
);

const barClass = computed(() =>
  mergeClasses(
    styles.value.bar,
    isIndeterminate.value && styles.value.indeterminate,
  ),
);
</script>

<template>
  <div
    :class="rootClass"
    role="progressbar"
    :aria-valuenow="isIndeterminate ? undefined : value"
    :aria-valuemin="0"
    :aria-valuemax="max"
    v-bind="$attrs"
  >
    <div
      :class="barClass"
      :style="isIndeterminate ? {} : { width: `${percentage}%` }"
    />
  </div>
</template>
