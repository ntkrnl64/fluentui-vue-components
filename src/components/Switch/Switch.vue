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

export interface SwitchProps {
  disabled?: boolean;
  labelPosition?: "before" | "after" | "above";
}

const props = withDefaults(defineProps<SwitchProps>(), {
  disabled: false,
  labelPosition: "after",
});

defineOptions({ inheritAttrs: false });
const checked = defineModel<boolean>("checked", { default: false });

const useBaseClass = makeResetStyles({
  display: "inline-flex",
  alignItems: "flex-start",
  cursor: "pointer",
  columnGap: tokens.spacingHorizontalS,
  fontFamily: tokens.fontFamilyBase,
  fontSize: tokens.fontSizeBase300,
  lineHeight: tokens.lineHeightBase300,
  position: "relative",
});

const useSwitchStyles = makeStyles({
  indicator: {
    display: "flex",
    alignItems: "center",
    width: "40px",
    height: "20px",
    boxSizing: "border-box",
    ...shorthands.borderRadius(tokens.borderRadiusCircular),
    ...shorthands.padding("0", "2px"),
    border: "1px solid",
    ...shorthands.borderColor(tokens.colorNeutralStrokeAccessible),
    backgroundColor: tokens.colorNeutralBackground5,
    flexShrink: 0,
    margin: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalS}`,
    // Key transitions for smooth animation
    transitionDuration: tokens.durationNormal,
    transitionTimingFunction: tokens.curveEasyEase,
    transitionProperty: "background, border, color",
    "@media screen and (prefers-reduced-motion: reduce)": {
      transitionDuration: "0.01ms",
    },
  },
  thumb: {
    width: "14px",
    height: "14px",
    ...shorthands.borderRadius(tokens.borderRadiusCircular),
    backgroundColor: tokens.colorNeutralForeground3,
    // Thumb slide transition
    transitionDuration: tokens.durationNormal,
    transitionTimingFunction: tokens.curveEasyEase,
    transitionProperty: "transform",
    "@media screen and (prefers-reduced-motion: reduce)": {
      transitionDuration: "0.01ms",
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
  thumbChecked: {
    transform: "translateX(20px)",
    backgroundColor: tokens.colorNeutralForegroundInverted,
  },
  indicatorUnchecked: {
    ":hover": {
      ...shorthands.borderColor(tokens.colorNeutralStrokeAccessibleHover),
    },
  },
  before: { flexDirection: "row-reverse" },
  above: { flexDirection: "column-reverse", alignItems: "flex-start" },
  disabled: {
    cursor: "not-allowed",
    color: tokens.colorNeutralForegroundDisabled,
  },
  disabledIndicator: {
    ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
    backgroundColor: tokens.colorNeutralBackgroundDisabled,
  },
  disabledThumb: {
    backgroundColor: tokens.colorNeutralForegroundDisabled,
  },
  label: {
    cursor: "inherit",
    alignSelf: "center",
    ...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalS),
  },
  hidden: {
    position: "absolute" as const,
    opacity: 0,
    width: 0,
    height: 0,
    margin: 0,
    padding: 0,
    overflow: "hidden" as const,
  },
});

const baseClassName = useResetStyles(useBaseClass);
const styles = useStyles(useSwitchStyles);

const rootClass = computed(() =>
  mergeClasses(
    "fui-Switch",
    baseClassName.value,
    props.labelPosition === "before" && styles.value.before,
    props.labelPosition === "above" && styles.value.above,
    props.disabled && styles.value.disabled,
  ),
);

const indicatorClass = computed(() =>
  mergeClasses(
    styles.value.indicator,
    checked.value
      ? styles.value.indicatorChecked
      : styles.value.indicatorUnchecked,
    props.disabled && styles.value.disabledIndicator,
  ),
);

const thumbClass = computed(() =>
  mergeClasses(
    styles.value.thumb,
    checked.value && styles.value.thumbChecked,
    props.disabled && styles.value.disabledThumb,
  ),
);

function toggle() {
  if (props.disabled) return;
  checked.value = !checked.value;
}
</script>

<template>
  <label :class="rootClass" v-bind="$attrs" @click.prevent="toggle">
    <input
      :class="styles.hidden"
      type="checkbox"
      role="switch"
      :checked="checked"
      :disabled="disabled"
      @change="toggle"
    />
    <div :class="indicatorClass">
      <div :class="thumbClass" />
    </div>
    <span v-if="$slots.default" :class="styles.label"><slot /></span>
  </label>
</template>
