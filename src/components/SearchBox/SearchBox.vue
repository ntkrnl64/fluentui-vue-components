<script setup lang="ts">
import { computed, ref } from "vue";
import {
  Search20Regular,
  Dismiss16Regular,
} from "@ntkrnl64/fluentui-vue-icons";
import {
  useStyles,
  useResetStyles,
  mergeClasses,
  makeStyles,
  makeResetStyles,
  shorthands,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";

export type SearchBoxAppearance =
  | "outline"
  | "underline"
  | "filled-darker"
  | "filled-lighter";
export type SearchBoxSize = "small" | "medium" | "large";

export interface SearchBoxProps {
  appearance?: SearchBoxAppearance;
  size?: SearchBoxSize;
  disabled?: boolean;
  placeholder?: string;
}

const props = withDefaults(defineProps<SearchBoxProps>(), {
  appearance: "outline",
  size: "medium",
  disabled: false,
  placeholder: "Search",
});

defineOptions({ inheritAttrs: false });

const modelValue = defineModel<string>({ default: "" });

const emit = defineEmits<{
  dismiss: [event: MouseEvent];
}>();

const useBaseClass = makeResetStyles({
  display: "inline-flex",
  alignItems: "center",
  flexWrap: "nowrap",
  gap: tokens.spacingHorizontalXXS,
  fontFamily: tokens.fontFamilyBase,
  ...shorthands.borderRadius(tokens.borderRadiusMedium),
  position: "relative",
  boxSizing: "border-box",
  "::after": {
    boxSizing: "border-box",
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
    transitionDelay: tokens.curveAccelerateMid,
  },
  ":focus-within::after": {
    transform: "scaleX(1)",
    transitionProperty: "transform",
    transitionDuration: tokens.durationNormal,
    transitionDelay: tokens.curveDecelerateMid,
  },
});

const useSearchBoxStyles = makeStyles({
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
  },
  disabled: {
    backgroundColor: tokens.colorTransparentBackground,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStrokeDisabled}`,
    color: tokens.colorNeutralForegroundDisabled,
    cursor: "not-allowed",
    "::after": { content: "unset" },
  },
  searchIcon: {
    display: "inline-flex",
    alignItems: "center",
    color: tokens.colorNeutralForeground3,
    fontSize: "16px",
    flexShrink: 0,
  },
  dismissButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    backgroundColor: "transparent",
    cursor: "pointer",
    color: tokens.colorNeutralForeground3,
    fontSize: "12px",
    padding: "2px",
    ...shorthands.borderRadius(tokens.borderRadiusSmall),
    ":hover": {
      color: tokens.colorNeutralForeground3Hover,
      backgroundColor: tokens.colorSubtleBackgroundHover,
    },
    ":focus-visible": {
      outlineColor: tokens.colorStrokeFocus2,
      outlineWidth: tokens.strokeWidthThick,
      outlineStyle: "solid",
    },
  },
});

const baseClassName = useResetStyles(useBaseClass);
const styles = useStyles(useSearchBoxStyles);

const rootClass = computed(() =>
  mergeClasses(
    "fui-SearchBox",
    baseClassName.value,
    styles.value[props.appearance],
    styles.value[props.size],
    props.disabled && styles.value.disabled,
  ),
);

function handleDismiss(event: MouseEvent) {
  modelValue.value = "";
  emit("dismiss", event);
}

const rootRef = ref<HTMLElement | null>(null);
defineExpose({ el: rootRef });
</script>

<template>
  <span ref="rootRef" :class="rootClass" v-bind="$attrs">
    <span :class="styles.searchIcon" aria-hidden="true">
      <slot name="searchIcon"><Search20Regular /></slot>
    </span>
    <input
      :class="styles.input"
      type="search"
      :disabled="disabled"
      :placeholder="placeholder"
      :value="modelValue"
      @input="modelValue = ($event.target as HTMLInputElement).value"
    />
    <button
      v-if="modelValue"
      :class="styles.dismissButton"
      type="button"
      aria-label="Clear"
      :disabled="disabled"
      @click="handleDismiss"
    >
      <Dismiss16Regular />
    </button>
  </span>
</template>
