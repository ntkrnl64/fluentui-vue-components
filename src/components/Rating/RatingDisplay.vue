<script setup lang="ts">
import { computed, provide, ref } from "vue";
import {
  useStyles,
  useResetStyles,
  mergeClasses,
  makeStyles,
  makeResetStyles,
} from "@ntkrnl64/griffel-vue";
import { tokens, typographyStyles } from "@fluentui/react-theme";
import { RatingItemContextKey } from "./context";
import type { RatingColor, RatingSize } from "./context";
import { useId } from "../../composables/useId";

export interface RatingDisplayProps {
  value?: number;
  max?: number;
  count?: number;
  size?: RatingSize;
  color?: RatingColor;
  compact?: boolean;
}

const props = withDefaults(defineProps<RatingDisplayProps>(), {
  max: 5,
  size: "medium",
  color: "neutral",
  compact: false,
});

defineOptions({ inheritAttrs: false });

const generatedName = useId("rating-display-");
const valueTextId = useId("rating-value-");
const countTextId = useId("rating-count-");

const valueRef = computed(() => props.value ?? 0);
const hoveredValue = ref<number | undefined>(undefined);

const ariaLabelledBy = computed(() => {
  const parts: string[] = [];
  if (props.value !== undefined) parts.push(valueTextId);
  if (props.count !== undefined) parts.push(countTextId);
  return parts.length > 0 ? parts.join(" ") : undefined;
});

// --- Styles (matching React's useRatingDisplayStyles.styles.ts exactly) ---

const useRootClassName = makeResetStyles({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
});

const useLabelClassName = makeResetStyles({
  color: tokens.colorNeutralForeground1,
  marginLeft: tokens.spacingHorizontalXS,
  ...typographyStyles.caption1,
});

const useLabelStyles = makeStyles({
  large: {
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
    marginLeft: tokens.spacingHorizontalSNudge,
  },
  extraLarge: {
    fontSize: tokens.fontSizeBase400,
    lineHeight: tokens.lineHeightBase400,
    marginLeft: tokens.spacingHorizontalS,
  },
  strong: {
    fontWeight: tokens.fontWeightSemibold as unknown as string,
  },
  divider: {
    "::before": {
      content: '"· "',
    },
  },
});

const rootClassName = useResetStyles(useRootClassName);
const labelClassName = useResetStyles(useLabelClassName);
const labelStyles = useStyles(useLabelStyles);

const rootClass = computed(() =>
  mergeClasses("fui-RatingDisplay", rootClassName.value),
);

const valueTextClass = computed(() =>
  mergeClasses(
    "fui-RatingDisplay__valueText",
    labelClassName.value,
    labelStyles.value.strong,
    props.size === "large" && labelStyles.value.large,
    props.size === "extra-large" && labelStyles.value.extraLarge,
  ),
);

const countTextClass = computed(() =>
  mergeClasses(
    "fui-RatingDisplay__countText",
    labelClassName.value,
    props.size === "large" && labelStyles.value.large,
    props.size === "extra-large" && labelStyles.value.extraLarge,
    props.value !== undefined && labelStyles.value.divider,
  ),
);

const displayMax = computed(() => (props.compact ? 1 : props.max));

provide(RatingItemContextKey, {
  value: valueRef,
  hoveredValue,
  step: 0.5,
  name: generatedName,
  color: props.color,
  size: props.size,
  interactive: false,
  compact: props.compact,
});
</script>

<template>
  <div
    :class="rootClass"
    role="img"
    :aria-labelledby="ariaLabelledBy"
    v-bind="$attrs"
  >
    <slot>
      <RatingItem v-for="i in displayMax" :key="i" :value="i" />
    </slot>
    <span v-if="value !== undefined" :id="valueTextId" :class="valueTextClass">
      {{ value }}
    </span>
    <span v-if="count !== undefined" :id="countTextId" :class="countTextClass">
      {{ count.toLocaleString() }}
    </span>
  </div>
</template>

<script lang="ts">
import RatingItem from "./RatingItem.vue";
</script>
