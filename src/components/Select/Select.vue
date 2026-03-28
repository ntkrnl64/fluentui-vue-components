<script setup lang="ts">
import { computed } from "vue";
import { ChevronDown12Regular } from "@ntkrnl64/fluentui-vue-icons";
import {
  useStyles,
  useResetStyles,
  mergeClasses,
  makeStyles,
  makeResetStyles,
  shorthands,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";

export type SelectAppearance =
  | "outline"
  | "underline"
  | "filled-darker"
  | "filled-lighter";
export type SelectSize = "small" | "medium" | "large";

export interface SelectProps {
  appearance?: SelectAppearance;
  size?: SelectSize;
  disabled?: boolean;
}

const props = withDefaults(defineProps<SelectProps>(), {
  appearance: "outline",
  size: "medium",
  disabled: false,
});

defineOptions({ inheritAttrs: false });
const modelValue = defineModel<string>({ default: "" });

const useBaseClass = makeResetStyles({
  display: "inline-flex",
  alignItems: "center",
  position: "relative",
  fontFamily: tokens.fontFamilyBase,
  ...shorthands.borderRadius(tokens.borderRadiusMedium),
  boxSizing: "border-box",
  "::after": {
    content: '""',
    position: "absolute",
    left: "-1px",
    bottom: "-1px",
    right: "-1px",
    height: `max(2px, ${tokens.borderRadiusMedium})`,
    ...shorthands.borderRadius(
      `0 0 ${tokens.borderRadiusMedium} ${tokens.borderRadiusMedium}`,
    ),
    borderBottomWidth: tokens.strokeWidthThick,
    borderBottomStyle: "solid",
    borderBottomColor: tokens.colorCompoundBrandStroke,
    clipPath: "inset(calc(100% - 2px) 0 0 0)",
    transform: "scaleX(0)",
    transitionProperty: "transform",
    transitionDuration: tokens.durationUltraFast,
  },
  ":focus-within::after": {
    transform: "scaleX(1)",
    transitionDuration: tokens.durationNormal,
  },
});

const useSelectStyles = makeStyles({
  select: {
    flexGrow: 1,
    border: "none",
    backgroundColor: "transparent",
    color: tokens.colorNeutralForeground1,
    fontFamily: "inherit",
    fontSize: "inherit",
    lineHeight: "inherit",
    outlineStyle: "none",
    cursor: "pointer",
    appearance: "none",
    paddingRight: "28px",
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
    minHeight: "24px",
    ...shorthands.padding("0", tokens.spacingHorizontalS),
    fontSize: tokens.fontSizeBase200,
  },
  medium: {
    minHeight: "32px",
    ...shorthands.padding("0", tokens.spacingHorizontalMNudge),
    fontSize: tokens.fontSizeBase300,
  },
  large: {
    minHeight: "40px",
    ...shorthands.padding("0", tokens.spacingHorizontalM),
    fontSize: tokens.fontSizeBase400,
  },
  disabled: {
    ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
    color: tokens.colorNeutralForegroundDisabled,
    cursor: "not-allowed",
    "::after": { content: "unset" },
  },
  chevron: {
    position: "absolute",
    right: tokens.spacingHorizontalSNudge,
    pointerEvents: "none",
    color: tokens.colorNeutralStrokeAccessible,
    fontSize: "12px",
  },
});

const baseClassName = useResetStyles(useBaseClass);
const styles = useStyles(useSelectStyles);

const rootClass = computed(() =>
  mergeClasses(
    "fui-Select",
    baseClassName.value,
    styles.value[props.appearance],
    styles.value[props.size],
    props.disabled && styles.value.disabled,
  ),
);
</script>

<template>
  <span :class="rootClass" v-bind="$attrs">
    <select
      :class="styles.select"
      :disabled="disabled"
      :value="modelValue"
      @change="modelValue = ($event.target as HTMLSelectElement).value"
    >
      <slot />
    </select>
    <span :class="styles.chevron"><ChevronDown12Regular /></span>
  </span>
</template>
