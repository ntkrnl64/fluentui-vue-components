<script setup lang="ts">
import { computed, onMounted } from "vue";
import {
  useStyles,
  useResetStyles,
  mergeClasses,
  makeStyles,
  makeResetStyles,
  shorthands,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";

export interface ToastProps {
  appearance?: "inverted";
}

const props = defineProps<ToastProps>();
const emit = defineEmits<{ dismiss: [] }>();

defineOptions({ inheritAttrs: false });

const slideInFadeKeyframes = {
  from: { opacity: 0, transform: "translateX(24px)" },
  to: { opacity: 1, transform: "translateX(0)" },
};

const useBaseClass = makeResetStyles({
  display: "flex",
  flexDirection: "column",
  gap: tokens.spacingVerticalS,
  ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalM),
  ...shorthands.borderRadius(tokens.borderRadiusMedium),
  boxShadow: tokens.shadow16,
  pointerEvents: "auto",
  backgroundColor: tokens.colorNeutralBackground1,
  color: tokens.colorNeutralForeground1,
  border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
  // Entrance animation: fade + slide from right
  animationName: slideInFadeKeyframes,
  animationDuration: tokens.durationGentle,
  animationTimingFunction: tokens.curveDecelerateMid,
  animationFillMode: "forwards",
  "@media screen and (prefers-reduced-motion: reduce)": {
    animationDuration: "0.01ms",
  },
});

const useToastStyles = makeStyles({
  inverted: {
    backgroundColor: tokens.colorNeutralBackgroundInverted,
    color: tokens.colorNeutralForegroundInverted,
  },
});

const baseClassName = useResetStyles(useBaseClass);
const styles = useStyles(useToastStyles);

const rootClass = computed(() =>
  mergeClasses(
    "fui-Toast",
    baseClassName.value,
    props.appearance === "inverted" && styles.value.inverted,
  ),
);
</script>

<template>
  <div :class="rootClass" role="status" aria-live="polite" v-bind="$attrs">
    <slot />
  </div>
</template>
