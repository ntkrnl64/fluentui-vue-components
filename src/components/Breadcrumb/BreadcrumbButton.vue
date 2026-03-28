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
import { BreadcrumbContextKey } from "./context";

export interface BreadcrumbButtonProps {
  current?: boolean;
  as?: "a" | "button";
}

const props = withDefaults(defineProps<BreadcrumbButtonProps>(), {
  current: false,
  as: "button",
});

defineOptions({ inheritAttrs: false });

const breadcrumbCtx = inject(BreadcrumbContextKey, undefined);
const resolvedSize = computed(() => breadcrumbCtx?.size ?? "medium");

const useBaseClass = makeResetStyles({
  display: "inline-flex",
  alignItems: "center",
  boxSizing: "border-box",
  backgroundColor: "transparent",
  border: "none",
  cursor: "pointer",
  fontFamily: tokens.fontFamilyBase,
  color: tokens.colorNeutralForeground2,
  textDecorationLine: "none",
  outlineStyle: "none",
  ...shorthands.borderRadius(tokens.borderRadiusMedium),
  ":hover": {
    color: tokens.colorNeutralForeground2Hover,
    backgroundColor: tokens.colorSubtleBackgroundHover,
  },
  ":hover:active": {
    color: tokens.colorNeutralForeground2Pressed,
    backgroundColor: tokens.colorSubtleBackgroundPressed,
  },
  ":focus-visible": {
    outlineColor: tokens.colorStrokeFocus2,
    outlineWidth: tokens.strokeWidthThick,
    outlineStyle: "solid",
    outlineOffset: "2px",
  },
});

const useBreadcrumbButtonStyles = makeStyles({
  small: {
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
    ...shorthands.padding(
      tokens.spacingVerticalXS,
      tokens.spacingHorizontalSNudge,
    ),
  },
  medium: {
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
    ...shorthands.padding(
      tokens.spacingVerticalXS,
      tokens.spacingHorizontalSNudge,
    ),
  },
  large: {
    fontSize: tokens.fontSizeBase400,
    lineHeight: tokens.lineHeightBase400,
    ...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalS),
  },
  current: {
    color: tokens.colorNeutralForeground1,
    fontWeight: tokens.fontWeightSemibold,
    cursor: "default",
    ":hover": {
      backgroundColor: "transparent",
      color: tokens.colorNeutralForeground1,
    },
  },
});

const baseClassName = useResetStyles(useBaseClass);
const styles = useStyles(useBreadcrumbButtonStyles);

const rootClass = computed(() =>
  mergeClasses(
    "fui-BreadcrumbButton",
    baseClassName.value,
    styles.value[resolvedSize.value],
    props.current && styles.value.current,
  ),
);
</script>

<template>
  <component
    :is="as"
    :class="rootClass"
    :aria-current="current ? 'page' : undefined"
    v-bind="$attrs"
  >
    <slot />
  </component>
</template>
