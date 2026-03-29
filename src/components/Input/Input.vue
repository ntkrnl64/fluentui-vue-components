<script setup lang="ts">
import { computed, ref, useSlots } from "vue";
import {
  useStyles,
  useResetStyles,
  mergeClasses,
  makeStyles,
  makeResetStyles,
  shorthands,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";

export type InputAppearance =
  | "outline"
  | "underline"
  | "filled-darker"
  | "filled-lighter";
export type InputSize = "small" | "medium" | "large";
export type InputType =
  | "text"
  | "password"
  | "email"
  | "number"
  | "search"
  | "tel"
  | "url";

export interface InputProps {
  appearance?: InputAppearance;
  size?: InputSize;
  type?: InputType;
  disabled?: boolean;
  placeholder?: string;
}

const props = withDefaults(defineProps<InputProps>(), {
  appearance: "outline",
  size: "medium",
  type: "text",
  disabled: false,
});

defineOptions({ inheritAttrs: false });
const modelValue = defineModel<string>({ default: "" });
const slots = useSlots();

const useBaseClass = makeResetStyles({
  display: "inline-flex",
  alignItems: "center",
  flexWrap: "nowrap",
  gap: tokens.spacingHorizontalXXS,
  fontFamily: tokens.fontFamilyBase,
  ...shorthands.borderRadius(tokens.borderRadiusMedium),
  position: "relative",
  boxSizing: "border-box",
  // Bottom border animation
  "::after": {
    boxSizing: "border-box",
    content: '""',
    position: "absolute",
    left: "-1px",
    bottom: "-1px",
    right: "-1px",
    height: `max(2px, ${tokens.borderRadiusMedium})`,
    borderBottomLeftRadius: tokens.borderRadiusMedium,
    borderBottomRightRadius: tokens.borderRadiusMedium,
    borderBottom: `2px solid ${tokens.colorCompoundBrandStroke}`,
    clipPath: "inset(calc(100% - 2px) 0 0 0)",
    transform: "scaleX(0)",
    transitionProperty: "transform",
    transitionDuration: tokens.durationUltraFast,
    transitionDelay: tokens.curveAccelerateMid,
  },
  ":focus-within::after": {
    transform: "scaleX(1)",
    transitionProperty: "transform",
    transitionDuration: tokens.durationNormal,
    transitionDelay: tokens.curveDecelerateMid,
  },
  ":focus-within:active::after": {
    borderBottomColor: tokens.colorCompoundBrandStrokePressed,
  },
});

const useInputStyles = makeStyles({
  input: {
    flexGrow: 1,
    minWidth: 0,
    border: "none",
    padding: "0",
    color: tokens.colorNeutralForeground1,
    backgroundColor: "transparent",
    fontFamily: "inherit",
    fontSize: "inherit",
    lineHeight: "inherit",
    outlineStyle: "none",
    "::placeholder": { color: tokens.colorNeutralForeground4 },
  },
  outline: {
    backgroundColor: tokens.colorNeutralBackground1,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
    borderBottomColor: tokens.colorNeutralStrokeAccessible,
    ":hover": {
      ...shorthands.borderColor(tokens.colorNeutralStroke1Hover),
      borderBottomColor: tokens.colorNeutralStrokeAccessibleHover,
    },
  },
  underline: {
    backgroundColor: "transparent",
    borderBottom: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStrokeAccessible}`,
    borderTop: "none",
    borderLeft: "none",
    borderRight: "none",
    ...shorthands.borderRadius(0),
  },
  "filled-darker": {
    backgroundColor: tokens.colorNeutralBackground3,
    border: `${tokens.strokeWidthThin} solid transparent`,
  },
  "filled-lighter": {
    backgroundColor: tokens.colorNeutralBackground1,
    border: `${tokens.strokeWidthThin} solid transparent`,
  },
  small: {
    minHeight: "24px",
    ...shorthands.padding("0", tokens.spacingHorizontalS),
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
  },
  medium: {
    minHeight: "32px",
    ...shorthands.padding("0", tokens.spacingHorizontalMNudge),
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
  },
  large: {
    minHeight: "40px",
    ...shorthands.padding("0", tokens.spacingHorizontalM),
    fontSize: tokens.fontSizeBase400,
    lineHeight: tokens.lineHeightBase400,
    columnGap: tokens.spacingHorizontalS,
  },
  disabled: {
    backgroundColor: tokens.colorTransparentBackground,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStrokeDisabled}`,
    color: tokens.colorNeutralForegroundDisabled,
    cursor: "not-allowed",
    "::after": { content: "unset" },
  },
  contentBefore: {
    display: "inline-flex",
    alignItems: "center",
    color: tokens.colorNeutralForeground3,
  },
  contentAfter: {
    display: "inline-flex",
    alignItems: "center",
    color: tokens.colorNeutralForeground3,
  },
});

const baseClassName = useResetStyles(useBaseClass);
const styles = useStyles(useInputStyles);

const rootClass = computed(() =>
  mergeClasses(
    "fui-Input",
    baseClassName.value,
    styles.value[props.appearance],
    styles.value[props.size],
    props.disabled && styles.value.disabled,
  ),
);

const rootRef = ref<HTMLElement | null>(null);
defineExpose({ el: rootRef });
</script>

<template>
  <span ref="rootRef" :class="rootClass" v-bind="$attrs">
    <span v-if="slots.contentBefore" :class="styles.contentBefore">
      <slot name="contentBefore" />
    </span>
    <input
      :class="styles.input"
      :type="type"
      :disabled="disabled"
      :placeholder="placeholder"
      :value="modelValue"
      @input="modelValue = ($event.target as HTMLInputElement).value"
    />
    <span v-if="slots.contentAfter" :class="styles.contentAfter">
      <slot name="contentAfter" />
    </span>
  </span>
</template>
