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

export type TextareaAppearance =
  | "outline"
  | "underline"
  | "filled-darker"
  | "filled-lighter";
export type TextareaSize = "small" | "medium" | "large";
export type TextareaResize = "none" | "horizontal" | "vertical" | "both";

export interface TextareaProps {
  appearance?: TextareaAppearance;
  size?: TextareaSize;
  resize?: TextareaResize;
  disabled?: boolean;
  placeholder?: string;
}

const props = withDefaults(defineProps<TextareaProps>(), {
  appearance: "outline",
  size: "medium",
  resize: "none",
  disabled: false,
});

defineOptions({ inheritAttrs: false });
const modelValue = defineModel<string>({ default: "" });

const useBaseClass = makeResetStyles({
  display: "flex",
  flexDirection: "column",
  position: "relative",
  fontFamily: tokens.fontFamilyBase,
  ...shorthands.borderRadius(tokens.borderRadiusMedium),
  boxSizing: "border-box",
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
});

const useTextareaStyles = makeStyles({
  textarea: {
    flexGrow: 1,
    border: "none",
    color: tokens.colorNeutralForeground1,
    backgroundColor: "transparent",
    fontFamily: "inherit",
    fontSize: "inherit",
    lineHeight: "inherit",
    outlineStyle: "none",
    ...shorthands.padding(
      tokens.spacingVerticalSNudge,
      tokens.spacingHorizontalMNudge,
    ),
    "::placeholder": { color: tokens.colorNeutralForeground4 },
  },
  outline: {
    backgroundColor: tokens.colorNeutralBackground1,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
    borderBottomColor: tokens.colorNeutralStrokeAccessible,
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
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
  },
  medium: {
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
  },
  large: {
    fontSize: tokens.fontSizeBase400,
    lineHeight: tokens.lineHeightBase400,
  },
  disabled: {
    backgroundColor: tokens.colorTransparentBackground,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStrokeDisabled}`,
    color: tokens.colorNeutralForegroundDisabled,
    cursor: "not-allowed",
    "::after": { content: "unset" },
  },
  resizeNone: { resize: "none" },
  resizeHorizontal: { resize: "horizontal" },
  resizeVertical: { resize: "vertical" },
  resizeBoth: { resize: "both" },
});

const baseClassName = useResetStyles(useBaseClass);
const styles = useStyles(useTextareaStyles);

const resizeClass = computed(() => {
  const map = {
    none: "resizeNone",
    horizontal: "resizeHorizontal",
    vertical: "resizeVertical",
    both: "resizeBoth",
  } as const;
  return styles.value[map[props.resize]];
});

const rootClass = computed(() =>
  mergeClasses(
    "fui-Textarea",
    baseClassName.value,
    styles.value[props.appearance],
    styles.value[props.size],
    props.disabled && styles.value.disabled,
  ),
);
</script>

<template>
  <span :class="rootClass" v-bind="$attrs">
    <textarea
      :class="mergeClasses(styles.textarea, resizeClass)"
      :disabled="disabled"
      :placeholder="placeholder"
      :value="modelValue"
      @input="modelValue = ($event.target as HTMLTextAreaElement).value"
    />
  </span>
</template>
