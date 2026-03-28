<script setup lang="ts">
import { inject, computed } from "vue";
import { Star20Filled } from "@ntkrnl64/fluentui-vue-icons";
import { useStyles, mergeClasses, makeStyles } from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";
import { RatingContextKey } from "./context";

export interface RatingItemProps {
  value: number;
}

const props = defineProps<RatingItemProps>();
defineOptions({ inheritAttrs: false });
const ctx = inject(RatingContextKey)!;

const useRatingItemStyles = makeStyles({
  star: {
    cursor: "pointer",
    color: tokens.colorNeutralForeground3,
    transitionProperty: "color, transform",
    transitionDuration: tokens.durationFaster,
    ":hover": { transform: "scale(1.1)" },
  },
  filled: { color: tokens.colorPaletteYellowForeground1 },
  filledBrand: { color: tokens.colorBrandForeground1 },
  filledNeutral: { color: tokens.colorNeutralForeground1 },
  disabled: { cursor: "not-allowed", opacity: 0.4 },
  readOnly: { cursor: "default", ":hover": { transform: "none" } },
  small: { fontSize: "16px" },
  medium: { fontSize: "20px" },
  large: { fontSize: "24px" },
  "extra-large": { fontSize: "32px" },
});

const styles = useStyles(useRatingItemStyles);

const isFilled = computed(() => {
  const displayVal = ctx.hoverValue.value ?? ctx.modelValue.value;
  return props.value <= displayVal;
});

const rootClass = computed(() =>
  mergeClasses(
    "fui-RatingItem",
    styles.value.star,
    styles.value[ctx.size],
    isFilled.value &&
      (ctx.color === "brand"
        ? styles.value.filledBrand
        : ctx.color === "neutral"
          ? styles.value.filledNeutral
          : styles.value.filled),
    ctx.disabled && styles.value.disabled,
    ctx.readOnly && styles.value.readOnly,
  ),
);

function handleClick() {
  ctx.selectStar(props.value);
}
function handleMouseEnter() {
  if (!ctx.disabled && !ctx.readOnly) ctx.setHover(props.value);
}
function handleMouseLeave() {
  ctx.setHover(null);
}
</script>

<template>
  <span
    :class="rootClass"
    role="radio"
    :aria-checked="value === ctx.modelValue.value"
    :aria-label="`${value} star${value > 1 ? 's' : ''}`"
    tabindex="0"
    v-bind="$attrs"
    @click="handleClick"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @keydown.enter.space.prevent="handleClick"
  >
    <slot><Star20Filled /></slot>
  </span>
</template>
