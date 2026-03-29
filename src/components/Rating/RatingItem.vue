<script setup lang="ts">
import { computed, inject } from "vue";
import { Star20Filled, Star20Regular } from "@ntkrnl64/fluentui-vue-icons";
import {
  useStyles,
  useResetStyles,
  mergeClasses,
  makeStyles,
  makeResetStyles,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";
import { RatingItemContextKey } from "./context";

export interface RatingItemProps {
  value?: number;
}

const props = withDefaults(defineProps<RatingItemProps>(), {
  value: 0,
});

defineOptions({ inheritAttrs: false });

const ctx = inject(RatingItemContextKey)!;

const ratingValue = computed(() => Math.round((ctx.value.value || 0) * 2) / 2);

const displayedRatingValue = computed(
  () => ctx.hoveredValue.value ?? ratingValue.value,
);

const appearance = computed(() => (ctx.interactive ? "outline" : "filled"));

const iconFillWidth = computed(() => {
  if (ctx.compact || displayedRatingValue.value >= props.value) return 1;
  if (displayedRatingValue.value >= props.value - 0.5) return 0.5;
  return 0;
});

const defaultItemLabel = (num: number) => num + "";
const itemLabel = computed(() => ctx.itemLabel ?? defaultItemLabel);

// --- Styles (matching React's useRatingItemStyles.styles.ts exactly) ---

const useRootStyles = makeStyles({
  root: {
    position: "relative",
  },
  small: {
    fontSize: "12px",
    width: "12px",
    height: "12px",
  },
  medium: {
    fontSize: "16px",
    width: "16px",
    height: "16px",
  },
  large: {
    fontSize: "20px",
    width: "20px",
    height: "20px",
  },
  "extra-large": {
    fontSize: "28px",
    width: "28px",
    height: "28px",
  },
});

const useInputBaseClass = makeResetStyles({
  position: "absolute",
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
  boxSizing: "border-box",
  margin: 0,
  opacity: 0,
  cursor: "pointer",
  height: "100%",
});

const useInputStyles = makeStyles({
  lowerHalf: {
    right: "50%",
  },
  upperHalf: {
    left: "50%",
  },
});

const useIndicatorBaseClass = makeResetStyles({
  display: "flex",
  overflow: "hidden",
  color: tokens.colorNeutralForeground1,
  fill: "currentColor",
  pointerEvents: "none",
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
});

const useIndicatorStyles = makeStyles({
  lowerHalf: {
    right: "50%",
    "& > svg": {
      flex: "0 0 auto",
    },
  },
  upperHalf: {
    left: "50%",
    marginLeft: "-50%",
  },
  brand: {
    color: tokens.colorBrandForeground1,
  },
  marigold: {
    color: tokens.colorPaletteMarigoldBorderActive,
  },
  filled: {
    color: tokens.colorNeutralBackground6,
    stroke: tokens.colorTransparentStroke,
    "@media (forced-colors: active)": {
      color: "Canvas",
      stroke: "CanvasText",
    },
  },
  brandFilled: {
    color: tokens.colorBrandBackground2,
  },
  marigoldFilled: {
    color: tokens.colorPaletteMarigoldBackground2,
  },
});

const rootStyles = useStyles(useRootStyles);
const inputBaseClassName = useResetStyles(useInputBaseClass);
const inputStyles = useStyles(useInputStyles);
const indicatorBaseClassName = useResetStyles(useIndicatorBaseClass);
const indicatorStyles = useStyles(useIndicatorStyles);

const rootClass = computed(() =>
  mergeClasses(
    "fui-RatingItem",
    rootStyles.value.root,
    rootStyles.value[ctx.size],
  ),
);

const halfInputClass = computed(() =>
  mergeClasses(
    "fui-RatingItem__halfValueInput",
    inputBaseClassName.value,
    inputStyles.value.lowerHalf,
  ),
);

const fullInputClass = computed(() =>
  mergeClasses(
    "fui-RatingItem__fullValueInput",
    inputBaseClassName.value,
    ctx.step === 0.5 && inputStyles.value.upperHalf,
  ),
);

const unselectedIconClass = computed(() =>
  mergeClasses(
    "fui-RatingItem__unselectedIcon",
    indicatorBaseClassName.value,
    appearance.value === "filled" && indicatorStyles.value.filled,
    ctx.color === "brand" &&
      (appearance.value === "filled"
        ? indicatorStyles.value.brandFilled
        : indicatorStyles.value.brand),
    ctx.color === "marigold" &&
      (appearance.value === "filled"
        ? indicatorStyles.value.marigoldFilled
        : indicatorStyles.value.marigold),
    iconFillWidth.value === 0.5 && indicatorStyles.value.upperHalf,
  ),
);

const selectedIconClass = computed(() =>
  mergeClasses(
    "fui-RatingItem__selectedIcon",
    indicatorBaseClassName.value,
    ctx.color === "brand" && indicatorStyles.value.brand,
    ctx.color === "marigold" && indicatorStyles.value.marigold,
    iconFillWidth.value === 0.5 && indicatorStyles.value.lowerHalf,
  ),
);
</script>

<template>
  <span :class="rootClass" v-bind="$attrs">
    <input
      v-if="ctx.interactive && ctx.step === 0.5"
      :class="halfInputClass"
      type="radio"
      :name="ctx.name"
      :value="value - 0.5"
      :checked="ratingValue === value - 0.5"
      :aria-label="itemLabel(value - 0.5)"
    />
    <input
      v-if="ctx.interactive"
      :class="fullInputClass"
      type="radio"
      :name="ctx.name"
      :value="value"
      :checked="ratingValue === value"
      :aria-label="itemLabel(value)"
    />
    <div
      v-if="iconFillWidth < 1"
      :class="unselectedIconClass"
      aria-hidden="true"
    >
      <Star20Filled v-if="appearance === 'filled'" />
      <Star20Regular v-else />
    </div>
    <div v-if="iconFillWidth > 0" :class="selectedIconClass" aria-hidden="true">
      <Star20Filled />
    </div>
  </span>
</template>
