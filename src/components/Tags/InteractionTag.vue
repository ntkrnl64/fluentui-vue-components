<script setup lang="ts">
import { computed, inject } from "vue";
import {
  useStyles,
  useResetStyles,
  mergeClasses,
  makeStyles,
  makeResetStyles,
  shorthands,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";
import { TagGroupContextKey } from "./context";
import type { TagSize } from "./context";

export type InteractionTagAppearance = "filled" | "outline" | "brand";
export type InteractionTagShape = "rounded" | "circular";

export interface InteractionTagProps {
  appearance?: InteractionTagAppearance;
  shape?: InteractionTagShape;
  size?: TagSize;
  disabled?: boolean;
}

const props = withDefaults(defineProps<InteractionTagProps>(), {
  appearance: "filled",
  shape: "rounded",
  size: "medium",
  disabled: false,
});

defineOptions({ inheritAttrs: false });

const groupCtx = inject(TagGroupContextKey, null);
const resolvedSize = computed(() => groupCtx?.size ?? props.size);

const useBaseClass = makeResetStyles({
  display: "inline-flex",
  alignItems: "center",
  boxSizing: "border-box",
  fontFamily: tokens.fontFamilyBase,
  fontWeight: tokens.fontWeightRegular,
  whiteSpace: "nowrap",
});

const useInteractionTagStyles = makeStyles({
  filled: {
    backgroundColor: tokens.colorNeutralBackground3,
    color: tokens.colorNeutralForeground2,
    border: `${tokens.strokeWidthThin} solid transparent`,
  },
  outline: {
    backgroundColor: tokens.colorSubtleBackground,
    color: tokens.colorNeutralForeground2,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
  },
  brand: {
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorBrandForeground2,
    border: `${tokens.strokeWidthThin} solid transparent`,
  },
  rounded: {
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
  },
  circular: {
    ...shorthands.borderRadius(tokens.borderRadiusCircular),
  },
  "extra-small": {
    height: "20px",
    fontSize: tokens.fontSizeBase100,
    lineHeight: tokens.lineHeightBase100,
  },
  small: {
    height: "24px",
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
  },
  medium: {
    height: "32px",
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
  },
  disabled: {
    backgroundColor: tokens.colorNeutralBackgroundDisabled,
    color: tokens.colorNeutralForegroundDisabled,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStrokeDisabled}`,
    cursor: "not-allowed",
  },
});

const baseClassName = useResetStyles(useBaseClass);
const styles = useStyles(useInteractionTagStyles);

const rootClass = computed(() =>
  mergeClasses(
    "fui-InteractionTag",
    baseClassName.value,
    styles.value[props.appearance],
    styles.value[props.shape],
    styles.value[resolvedSize.value],
    props.disabled && styles.value.disabled,
  ),
);
</script>

<template>
  <span :class="rootClass" v-bind="$attrs">
    <slot />
  </span>
</template>
