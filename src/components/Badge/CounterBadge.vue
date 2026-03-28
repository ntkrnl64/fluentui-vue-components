<script setup lang="ts">
import { computed } from "vue";
import Badge from "./Badge.vue";
import type {
  BadgeAppearance,
  BadgeColor,
  BadgeShape,
  BadgeSize,
} from "./Badge.vue";

export interface CounterBadgeProps {
  count?: number;
  overflowCount?: number;
  showZero?: boolean;
  dot?: boolean;
  appearance?: BadgeAppearance;
  color?: BadgeColor;
  shape?: BadgeShape;
  size?: BadgeSize;
}

const props = withDefaults(defineProps<CounterBadgeProps>(), {
  count: 0,
  overflowCount: 99,
  showZero: false,
  dot: false,
  appearance: "filled",
  color: "brand",
  shape: "circular",
  size: "medium",
});

defineOptions({ inheritAttrs: false });

const displayValue = computed(() => {
  if (props.dot) return "";
  if (props.count > props.overflowCount) return `${props.overflowCount}+`;
  return `${props.count}`;
});

const isHidden = computed(
  () => !props.showZero && props.count === 0 && !props.dot,
);
</script>

<template>
  <Badge
    v-if="!isHidden"
    :appearance="appearance"
    :color="color"
    :shape="shape"
    :size="dot ? 'tiny' : size"
    v-bind="$attrs"
  >
    {{ displayValue }}
  </Badge>
</template>
