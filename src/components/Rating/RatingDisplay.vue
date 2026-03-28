<script setup lang="ts">
import { computed } from "vue";
import { Star20Filled } from "@ntkrnl64/fluentui-vue-icons";
import {
  useStyles,
  useResetStyles,
  mergeClasses,
  makeStyles,
  makeResetStyles,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";
import type { RatingSize } from "./context";

export interface RatingDisplayProps {
  value: number;
  max?: number;
  count?: number;
  size?: RatingSize;
  color?: string;
}

const props = withDefaults(defineProps<RatingDisplayProps>(), {
  max: 5,
  size: "medium",
  color: "marigold",
});

defineOptions({ inheritAttrs: false });

const useBaseClass = makeResetStyles({
  display: "inline-flex",
  alignItems: "center",
  gap: "2px",
});

const useDisplayStyles = makeStyles({
  star: {
    color: tokens.colorNeutralForeground3,
  },
  filled: { color: tokens.colorPaletteYellowForeground1 },
  filledBrand: { color: tokens.colorBrandForeground1 },
  filledNeutral: { color: tokens.colorNeutralForeground1 },
  small: { fontSize: "16px" },
  medium: { fontSize: "20px" },
  large: { fontSize: "24px" },
  "extra-large": { fontSize: "32px" },
  count: {
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
    color: tokens.colorNeutralForeground3,
    marginLeft: tokens.spacingHorizontalXS,
  },
});

const baseClassName = useResetStyles(useBaseClass);
const styles = useStyles(useDisplayStyles);

function getStarClass(index: number) {
  const isFilled = index <= props.value;
  return mergeClasses(
    styles.value.star,
    styles.value[props.size],
    isFilled &&
      (props.color === "brand"
        ? styles.value.filledBrand
        : props.color === "neutral"
          ? styles.value.filledNeutral
          : styles.value.filled),
  );
}

const rootClass = computed(() =>
  mergeClasses("fui-RatingDisplay", baseClassName.value),
);
</script>

<template>
  <div
    :class="rootClass"
    role="img"
    :aria-label="`Rating: ${value} of ${max}`"
    v-bind="$attrs"
  >
    <span v-for="i in max" :key="i" :class="getStarClass(i)"
      ><Star20Filled
    /></span>
    <span v-if="count !== undefined" :class="styles.count">({{ count }})</span>
  </div>
</template>
