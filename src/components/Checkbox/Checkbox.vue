<script setup lang="ts">
import { computed, ref } from "vue";
import {
  useStyles,
  useResetStyles,
  mergeClasses,
  makeStyles,
  makeResetStyles,
  shorthands,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";

export type CheckboxShape = "square" | "circular";
export type CheckboxSize = "medium" | "large";

export interface CheckboxProps {
  shape?: CheckboxShape;
  size?: CheckboxSize;
  disabled?: boolean;
  labelPosition?: "before" | "after";
}

const props = withDefaults(defineProps<CheckboxProps>(), {
  shape: "square",
  size: "medium",
  disabled: false,
  labelPosition: "after",
});

defineOptions({ inheritAttrs: false });
const checked = defineModel<boolean | "mixed">("checked", { default: false });

const useBaseClass = makeResetStyles({
  display: "inline-flex",
  alignItems: "center",
  cursor: "pointer",
  position: "relative",
  columnGap: tokens.spacingHorizontalS,
  fontFamily: tokens.fontFamilyBase,
  fontSize: tokens.fontSizeBase300,
  lineHeight: tokens.lineHeightBase300,
  color: tokens.colorNeutralForeground1,
});

const useCheckboxStyles = makeStyles({
  indicator: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
    flexShrink: 0,
    width: "16px",
    height: "16px",
    ...shorthands.borderRadius(tokens.borderRadiusSmall),
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStrokeAccessible}`,
    fill: "currentColor",
    color: tokens.colorNeutralForegroundInverted,
    backgroundColor: tokens.colorNeutralBackground1,
    transitionProperty: "background-color, border-color",
    transitionDuration: tokens.durationFaster,
    transitionTimingFunction: tokens.curveEasyEase,
    ":hover": {
      ...shorthands.borderColor(tokens.colorNeutralStrokeAccessibleHover),
    },
  },
  indicatorChecked: {
    backgroundColor: tokens.colorCompoundBrandBackground,
    ...shorthands.borderColor(tokens.colorCompoundBrandBackground),
    ":hover": {
      backgroundColor: tokens.colorCompoundBrandBackgroundHover,
      ...shorthands.borderColor(tokens.colorCompoundBrandBackgroundHover),
    },
  },
  indicatorMixed: {
    backgroundColor: tokens.colorCompoundBrandBackground,
    ...shorthands.borderColor(tokens.colorCompoundBrandBackground),
  },
  circular: { ...shorthands.borderRadius(tokens.borderRadiusCircular) },
  large: { width: "20px", height: "20px" },
  largeLabel: {
    fontSize: tokens.fontSizeBase400,
    lineHeight: tokens.lineHeightBase400,
  },
  disabled: {
    cursor: "not-allowed",
    color: tokens.colorNeutralForegroundDisabled,
  },
  disabledIndicator: {
    ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
    backgroundColor: tokens.colorNeutralBackgroundDisabled,
    color: tokens.colorNeutralForegroundDisabled,
  },
  before: { flexDirection: "row-reverse" },
  hidden: {
    position: "absolute",
    opacity: 0,
    width: 0,
    height: 0,
    margin: 0,
    padding: 0,
    overflow: "hidden",
  },
});

const baseClassName = useResetStyles(useBaseClass);
const styles = useStyles(useCheckboxStyles);

const rootClass = computed(() =>
  mergeClasses(
    "fui-Checkbox",
    baseClassName.value,
    props.labelPosition === "before" && styles.value.before,
    props.size === "large" && styles.value.largeLabel,
    props.disabled && styles.value.disabled,
  ),
);

const indicatorClass = computed(() =>
  mergeClasses(
    styles.value.indicator,
    props.shape === "circular" && styles.value.circular,
    props.size === "large" && styles.value.large,
    checked.value === true && styles.value.indicatorChecked,
    checked.value === "mixed" && styles.value.indicatorMixed,
    props.disabled && styles.value.disabledIndicator,
  ),
);

function toggle() {
  if (props.disabled) return;
  checked.value = checked.value === true ? false : true;
}
</script>

<template>
  <label :class="rootClass" v-bind="$attrs" @click.prevent="toggle">
    <input
      :class="styles.hidden"
      type="checkbox"
      :checked="checked === true"
      :indeterminate="checked === 'mixed'"
      :disabled="disabled"
      @change="toggle"
    />
    <div :class="indicatorClass">
      <svg
        v-if="checked === true"
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
      >
        <path
          d="M9.76 3.2a.75.75 0 0 1 .04 1.06l-4.25 4.5a.75.75 0 0 1-1.08.02L2.22 6.53a.75.75 0 0 1 1.06-1.06l1.7 1.7 3.72-3.93a.75.75 0 0 1 1.06-.04Z"
          fill="currentColor"
        />
      </svg>
      <svg
        v-else-if="checked === 'mixed'"
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
      >
        <rect
          x="2"
          y="5.25"
          width="8"
          height="1.5"
          rx="0.75"
          fill="currentColor"
        />
      </svg>
    </div>
    <slot />
  </label>
</template>
