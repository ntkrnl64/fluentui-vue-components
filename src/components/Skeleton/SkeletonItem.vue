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

export type SkeletonItemSize =
  | 8
  | 12
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
  | 96
  | 120
  | 128;
export type SkeletonItemShape = "rectangle" | "circle" | "square";

export interface SkeletonItemProps {
  size?: SkeletonItemSize;
  shape?: SkeletonItemShape;
  animation?: "wave" | "pulse";
}

const props = withDefaults(defineProps<SkeletonItemProps>(), {
  size: 16,
  shape: "rectangle",
  animation: "wave",
});

defineOptions({ inheritAttrs: false });

const waveKeyframes = {
  "0%": { backgroundPosition: "-200% 0" },
  "100%": { backgroundPosition: "200% 0" },
};

const pulseKeyframes = {
  "0%": { opacity: "1" },
  "50%": { opacity: "0.4" },
  "100%": { opacity: "1" },
};

const useBaseClass = makeResetStyles({
  backgroundColor: tokens.colorNeutralStencil1,
  ...shorthands.borderRadius(tokens.borderRadiusMedium),
  width: "100%",
});

const useSkeletonItemStyles = makeStyles({
  circle: { ...shorthands.borderRadius(tokens.borderRadiusCircular) },
  square: {},
  wave: {
    backgroundImage: `linear-gradient(90deg, ${tokens.colorNeutralStencil1} 0%, ${tokens.colorNeutralStencil2} 50%, ${tokens.colorNeutralStencil1} 100%)`,
    backgroundSize: "200% 100%",
    animationName: waveKeyframes,
    animationDuration: "2s",
    animationIterationCount: "infinite",
    animationTimingFunction: "linear",
  },
  pulse: {
    animationName: pulseKeyframes,
    animationDuration: "1s",
    animationIterationCount: "infinite",
    animationTimingFunction: "ease-in-out",
  },
});

const baseClassName = useResetStyles(useBaseClass);
const styles = useStyles(useSkeletonItemStyles);

const sizeStyle = computed(() => {
  const s = `${props.size}px`;
  if (props.shape === "rectangle") {
    return { height: s };
  }
  return { width: s, height: s };
});

const rootClass = computed(() =>
  mergeClasses(
    "fui-SkeletonItem",
    baseClassName.value,
    props.shape !== "rectangle" && styles.value[props.shape],
    styles.value[props.animation],
  ),
);
</script>

<template>
  <div :class="rootClass" :style="sizeStyle" v-bind="$attrs" />
</template>
