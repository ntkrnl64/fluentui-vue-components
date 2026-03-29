<script setup lang="ts">
import { computed, inject } from "vue";
import { useStyles, mergeClasses, makeStyles } from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";
import { SkeletonContextKey } from "./context";
import type { SkeletonAnimation, SkeletonAppearance } from "./context";

export type SkeletonItemSize =
  | 8
  | 12
  | 14
  | 16
  | 20
  | 22
  | 24
  | 28
  | 32
  | 36
  | 40
  | 48
  | 52
  | 56
  | 64
  | 72
  | 92
  | 96
  | 120
  | 128;
export type SkeletonItemShape = "rectangle" | "circle" | "square";

export interface SkeletonItemProps {
  size?: SkeletonItemSize;
  shape?: SkeletonItemShape;
  animation?: SkeletonAnimation;
  appearance?: SkeletonAppearance;
}

const props = withDefaults(defineProps<SkeletonItemProps>(), {
  size: 16,
  shape: "rectangle",
});

defineOptions({ inheritAttrs: false });

const skeletonCtx = inject(SkeletonContextKey, {});

const effectiveAnimation = computed(
  () => props.animation ?? skeletonCtx.animation ?? "wave",
);
const effectiveAppearance = computed(
  () => props.appearance ?? skeletonCtx.appearance ?? "opaque",
);

// --- Keyframes ---
const skeletonWaveAnimation = {
  to: {
    transform: "translate(100%)",
  },
};

const skeletonPulseAnimation = {
  "0%": { opacity: "1" },
  "50%": { opacity: "0.4" },
  "100%": { opacity: "1" },
};

// --- Styles (matching React's useSkeletonItemStyles.styles.ts exactly) ---

const useRootStyles = makeStyles({
  root: {
    position: "relative",
    overflow: "hidden",

    "::after": {
      content: '""',
      display: "block",
      position: "absolute",
      inset: "0",
      animationIterationCount: "infinite",
      animationDuration: "3s",
      animationTimingFunction: "ease-in-out",
      "@media screen and (prefers-reduced-motion: reduce)": {
        animationDuration: "0.01ms",
        animationIterationCount: "1",
      },
    },
  },
  wave: {
    backgroundColor: tokens.colorNeutralStencil1,

    "::after": {
      animationName: skeletonWaveAnimation,
      backgroundImage: `linear-gradient(
        to right,
        ${tokens.colorNeutralStencil1} 0%,
        ${tokens.colorNeutralStencil2} 50%,
        ${tokens.colorNeutralStencil1} 100%)`,
      transform: "translate(-100%)",

      "@media screen and (forced-colors: active)": {
        backgroundColor: "WindowText",
      },
    },
  },
  pulse: {
    "::after": {
      animationName: skeletonPulseAnimation,
      animationDuration: "1s",
      backgroundColor: tokens.colorNeutralStencil1,
    },
  },
  translucent: {
    backgroundColor: tokens.colorNeutralStencil1Alpha,

    "::after": {
      backgroundImage: `linear-gradient(
        to right,
        transparent 0%,
        ${tokens.colorNeutralStencil1Alpha} 50%,
        transparent 100%)`,
    },
  },
  translucentPulse: {
    backgroundColor: "none",

    "::after": {
      backgroundColor: tokens.colorNeutralStencil1Alpha,
    },
  },
});

const useRectangleStyles = makeStyles({
  root: {
    width: "100%",
    borderRadius: "4px",
  },
  8: { height: "8px" },
  12: { height: "12px" },
  14: { height: "14px" },
  16: { height: "16px" },
  20: { height: "20px" },
  22: { height: "22px" },
  24: { height: "24px" },
  28: { height: "28px" },
  32: { height: "32px" },
  36: { height: "36px" },
  40: { height: "40px" },
  48: { height: "48px" },
  52: { height: "52px" },
  56: { height: "56px" },
  64: { height: "64px" },
  72: { height: "72px" },
  92: { height: "92px" },
  96: { height: "96px" },
  120: { height: "120px" },
  128: { height: "128px" },
});

const useSizeStyles = makeStyles({
  8: { width: "8px", height: "8px" },
  12: { width: "12px", height: "12px" },
  14: { width: "14px", height: "14px" },
  16: { width: "16px", height: "16px" },
  20: { width: "20px", height: "20px" },
  22: { width: "22px", height: "22px" },
  24: { width: "24px", height: "24px" },
  28: { width: "28px", height: "28px" },
  32: { width: "32px", height: "32px" },
  36: { width: "36px", height: "36px" },
  40: { width: "40px", height: "40px" },
  48: { width: "48px", height: "48px" },
  52: { width: "52px", height: "52px" },
  56: { width: "56px", height: "56px" },
  64: { width: "64px", height: "64px" },
  72: { width: "72px", height: "72px" },
  92: { width: "92px", height: "92px" },
  96: { width: "96px", height: "96px" },
  120: { width: "120px", height: "120px" },
  128: { width: "128px", height: "128px" },
});

const useCircleSizeStyles = makeStyles({
  root: {
    borderRadius: "50%",
  },
});

const rootStyles = useStyles(useRootStyles);
const rectStyles = useStyles(useRectangleStyles);
const sizeStyles = useStyles(useSizeStyles);
const circleStyles = useStyles(useCircleSizeStyles);

const rootClass = computed(() =>
  mergeClasses(
    "fui-SkeletonItem",
    rootStyles.value.root,
    effectiveAnimation.value === "wave" && rootStyles.value.wave,
    effectiveAnimation.value === "pulse" && rootStyles.value.pulse,
    effectiveAppearance.value === "translucent" && rootStyles.value.translucent,
    effectiveAnimation.value === "pulse" &&
      effectiveAppearance.value === "translucent" &&
      rootStyles.value.translucentPulse,
    props.shape === "rectangle" && rectStyles.value.root,
    props.shape === "rectangle" &&
      rectStyles.value[props.size as unknown as keyof typeof rectStyles.value],
    props.shape === "square" &&
      sizeStyles.value[props.size as unknown as keyof typeof sizeStyles.value],
    props.shape === "circle" && circleStyles.value.root,
    props.shape === "circle" &&
      sizeStyles.value[props.size as unknown as keyof typeof sizeStyles.value],
  ),
);
</script>

<template>
  <div :class="rootClass" v-bind="$attrs" />
</template>
