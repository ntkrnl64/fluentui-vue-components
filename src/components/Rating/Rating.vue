<script setup lang="ts">
import { computed, ref } from "vue";
import { Star20Filled } from "@ntkrnl64/fluentui-vue-icons";
import {
  useStyles,
  useResetStyles,
  mergeClasses,
  makeStyles,
  makeResetStyles,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";

export type RatingSize = "small" | "medium" | "large" | "extra-large";

export interface RatingProps {
  max?: number;
  size?: RatingSize;
  color?: "brand" | "marigold" | "neutral";
  disabled?: boolean;
  readOnly?: boolean;
}

const props = withDefaults(defineProps<RatingProps>(), {
  max: 5,
  size: "medium",
  color: "marigold",
  disabled: false,
  readOnly: false,
});

defineOptions({ inheritAttrs: false });
const modelValue = defineModel<number>({ default: 0 });
const hoverValue = ref<number | null>(null);

const useBaseClass = makeResetStyles({
  display: "inline-flex",
  alignItems: "center",
  gap: "2px",
});

const useRatingStyles = makeStyles({
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

const baseClassName = useResetStyles(useBaseClass);
const styles = useStyles(useRatingStyles);

const rootClass = computed(() =>
  mergeClasses("fui-Rating", baseClassName.value),
);

function getStarClass(index: number) {
  const displayVal = hoverValue.value ?? modelValue.value;
  const isFilled = index <= displayVal;
  return mergeClasses(
    styles.value.star,
    styles.value[props.size],
    isFilled &&
      (props.color === "brand"
        ? styles.value.filledBrand
        : props.color === "neutral"
          ? styles.value.filledNeutral
          : styles.value.filled),
    props.disabled && styles.value.disabled,
    props.readOnly && styles.value.readOnly,
  );
}

function selectStar(index: number) {
  if (props.disabled || props.readOnly) return;
  modelValue.value = index;
}
</script>

<template>
  <div
    :class="rootClass"
    role="radiogroup"
    :aria-label="`Rating: ${modelValue} of ${max}`"
    v-bind="$attrs"
  >
    <span
      v-for="i in max"
      :key="i"
      :class="getStarClass(i)"
      role="radio"
      :aria-checked="i === modelValue"
      :aria-label="`${i} star${i > 1 ? 's' : ''}`"
      tabindex="0"
      @click="selectStar(i)"
      @mouseenter="!disabled && !readOnly && (hoverValue = i)"
      @mouseleave="hoverValue = null"
      @keydown.enter.space.prevent="selectStar(i)"
      ><Star20Filled
    /></span>
  </div>
</template>
