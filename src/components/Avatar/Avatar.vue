<script setup lang="ts">
import { computed, useSlots } from "vue";
import {
  useStyles,
  useResetStyles,
  mergeClasses,
  makeStyles,
  makeResetStyles,
  shorthands,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";

export type AvatarSize =
  | 16
  | 20
  | 24
  | 28
  | 32
  | 36
  | 40
  | 48
  | 56
  | 64
  | 72
  | 96
  | 120
  | 128;
export type AvatarShape = "circular" | "square";
export type AvatarColor =
  | "neutral"
  | "brand"
  | "colorful"
  | "dark-red"
  | "cranberry"
  | "red"
  | "pumpkin"
  | "peach"
  | "marigold"
  | "gold"
  | "brass"
  | "brown"
  | "forest"
  | "seafoam"
  | "dark-green"
  | "light-teal"
  | "teal"
  | "steel"
  | "blue"
  | "royal-blue"
  | "cornflower"
  | "navy"
  | "lavender"
  | "purple"
  | "grape"
  | "lilac"
  | "pink"
  | "magenta"
  | "plum"
  | "beige"
  | "mink"
  | "platinum"
  | "anchor";

export interface AvatarProps {
  name?: string;
  image?: string;
  size?: AvatarSize;
  shape?: AvatarShape;
  color?: AvatarColor;
  initials?: string;
  active?: "active" | "inactive" | "unset";
}

const props = withDefaults(defineProps<AvatarProps>(), {
  size: 32,
  shape: "circular",
  color: "neutral",
  active: "unset",
});

defineOptions({ inheritAttrs: false });
const slots = useSlots();

const useBaseClass = makeResetStyles({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  position: "relative",
  verticalAlign: "middle",
  overflow: "hidden",
  fontFamily: tokens.fontFamilyBase,
  fontWeight: tokens.fontWeightSemibold,
  backgroundColor: tokens.colorNeutralBackground6,
  color: tokens.colorNeutralForeground3,
});

const useAvatarStyles = makeStyles({
  circular: { ...shorthands.borderRadius(tokens.borderRadiusCircular) },
  square: { ...shorthands.borderRadius(tokens.borderRadiusMedium) },
  brand: {
    backgroundColor: tokens.colorBrandBackgroundStatic,
    color: tokens.colorNeutralForegroundStaticInverted,
  },
  active: {
    transform: "scale(1)",
    transitionProperty: "transform, opacity",
    transitionDuration: tokens.durationNormal,
    transitionTimingFunction: tokens.curveEasyEase,
  },
  inactive: { opacity: 0.8, transform: "scale(0.875)" },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    verticalAlign: "top",
  },
  initials: {
    userSelect: "none",
  },

  // Badge slot
  badge: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
});

const baseClassName = useResetStyles(useBaseClass);
const styles = useStyles(useAvatarStyles);

const computedInitials = computed(() => {
  if (props.initials) return props.initials;
  if (!props.name) return "";
  const parts = props.name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0]?.toUpperCase() ?? "";
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
});

const sizeStyle = computed(() => ({
  width: `${props.size}px`,
  height: `${props.size}px`,
  fontSize: `${Math.max(10, Math.floor(props.size * 0.4))}px`,
}));

const rootClass = computed(() =>
  mergeClasses(
    "fui-Avatar",
    baseClassName.value,
    styles.value[props.shape],
    props.color === "brand" && styles.value.brand,
    props.active === "active" && styles.value.active,
    props.active === "inactive" && styles.value.inactive,
  ),
);
</script>

<template>
  <span
    :class="rootClass"
    :style="sizeStyle"
    role="img"
    :aria-label="name"
    v-bind="$attrs"
  >
    <img v-if="image" :src="image" :alt="name ?? ''" :class="styles.image" />
    <span v-else-if="computedInitials" :class="styles.initials">{{
      computedInitials
    }}</span>
    <slot v-else name="icon" />
    <span v-if="$slots.badge" :class="styles.badge">
      <slot name="badge" />
    </span>
  </span>
</template>
