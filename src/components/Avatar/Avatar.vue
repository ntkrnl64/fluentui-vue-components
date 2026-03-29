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

const colorfulColors = [
  "dark-red",
  "cranberry",
  "red",
  "pumpkin",
  "peach",
  "marigold",
  "gold",
  "brass",
  "brown",
  "forest",
  "seafoam",
  "dark-green",
  "light-teal",
  "teal",
  "steel",
  "blue",
  "royal-blue",
  "cornflower",
  "navy",
  "lavender",
  "purple",
  "grape",
  "lilac",
  "pink",
  "magenta",
  "plum",
  "beige",
  "mink",
  "platinum",
  "anchor",
] as const;

const colorfulColorMap: Record<
  string,
  { background: string; foreground: string }
> = {
  "dark-red": {
    background: tokens.colorPaletteDarkRedBackground2,
    foreground: tokens.colorPaletteDarkRedForeground2,
  },
  cranberry: {
    background: tokens.colorPaletteCranberryBackground2,
    foreground: tokens.colorPaletteCranberryForeground2,
  },
  red: {
    background: tokens.colorPaletteRedBackground2,
    foreground: tokens.colorPaletteRedForeground2,
  },
  pumpkin: {
    background: tokens.colorPalettePumpkinBackground2,
    foreground: tokens.colorPalettePumpkinForeground2,
  },
  peach: {
    background: tokens.colorPalettePeachBackground2,
    foreground: tokens.colorPalettePeachForeground2,
  },
  marigold: {
    background: tokens.colorPaletteMarigoldBackground2,
    foreground: tokens.colorPaletteMarigoldForeground2,
  },
  gold: {
    background: tokens.colorPaletteGoldBackground2,
    foreground: tokens.colorPaletteGoldForeground2,
  },
  brass: {
    background: tokens.colorPaletteBrassBackground2,
    foreground: tokens.colorPaletteBrassForeground2,
  },
  brown: {
    background: tokens.colorPaletteBrownBackground2,
    foreground: tokens.colorPaletteBrownForeground2,
  },
  forest: {
    background: tokens.colorPaletteForestBackground2,
    foreground: tokens.colorPaletteForestForeground2,
  },
  seafoam: {
    background: tokens.colorPaletteSeafoamBackground2,
    foreground: tokens.colorPaletteSeafoamForeground2,
  },
  "dark-green": {
    background: tokens.colorPaletteDarkGreenBackground2,
    foreground: tokens.colorPaletteDarkGreenForeground2,
  },
  "light-teal": {
    background: tokens.colorPaletteLightTealBackground2,
    foreground: tokens.colorPaletteLightTealForeground2,
  },
  teal: {
    background: tokens.colorPaletteTealBackground2,
    foreground: tokens.colorPaletteTealForeground2,
  },
  steel: {
    background: tokens.colorPaletteSteelBackground2,
    foreground: tokens.colorPaletteSteelForeground2,
  },
  blue: {
    background: tokens.colorPaletteBlueBackground2,
    foreground: tokens.colorPaletteBlueForeground2,
  },
  "royal-blue": {
    background: tokens.colorPaletteRoyalBlueBackground2,
    foreground: tokens.colorPaletteRoyalBlueForeground2,
  },
  cornflower: {
    background: tokens.colorPaletteCornflowerBackground2,
    foreground: tokens.colorPaletteCornflowerForeground2,
  },
  navy: {
    background: tokens.colorPaletteNavyBackground2,
    foreground: tokens.colorPaletteNavyForeground2,
  },
  lavender: {
    background: tokens.colorPaletteLavenderBackground2,
    foreground: tokens.colorPaletteLavenderForeground2,
  },
  purple: {
    background: tokens.colorPalettePurpleBackground2,
    foreground: tokens.colorPalettePurpleForeground2,
  },
  grape: {
    background: tokens.colorPaletteGrapeBackground2,
    foreground: tokens.colorPaletteGrapeForeground2,
  },
  lilac: {
    background: tokens.colorPaletteLilacBackground2,
    foreground: tokens.colorPaletteLilacForeground2,
  },
  pink: {
    background: tokens.colorPalettePinkBackground2,
    foreground: tokens.colorPalettePinkForeground2,
  },
  magenta: {
    background: tokens.colorPaletteMagentaBackground2,
    foreground: tokens.colorPaletteMagentaForeground2,
  },
  plum: {
    background: tokens.colorPalettePlumBackground2,
    foreground: tokens.colorPalettePlumForeground2,
  },
  beige: {
    background: tokens.colorPaletteBeigeBackground2,
    foreground: tokens.colorPaletteBeigeForeground2,
  },
  mink: {
    background: tokens.colorPaletteMinkBackground2,
    foreground: tokens.colorPaletteMinkForeground2,
  },
  platinum: {
    background: tokens.colorPalettePlatinumBackground2,
    foreground: tokens.colorPalettePlatinumForeground2,
  },
  anchor: {
    background: tokens.colorPaletteAnchorBackground2,
    foreground: tokens.colorPaletteAnchorForeground2,
  },
};

function hashName(name: string): number {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash += name.charCodeAt(i);
  }
  return hash % 30;
}

const resolvedColor = computed(() => {
  let colorName = props.color;
  if (colorName === "colorful") {
    const index = hashName(props.name ?? "");
    colorName = colorfulColors[index];
  }
  if (colorName !== "neutral" && colorName !== "brand") {
    return colorfulColorMap[colorName] ?? null;
  }
  return null;
});

const colorStyle = computed(() => {
  const c = resolvedColor.value;
  if (!c) return {};
  return {
    backgroundColor: c.background,
    color: c.foreground,
  };
});

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
    :style="{ ...sizeStyle, ...colorStyle }"
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
