<script setup lang="ts">
import { computed, ref, useSlots, onMounted, watch } from "vue";
import {
  useStyles,
  useResetStyles,
  mergeClasses,
  makeStyles,
  makeResetStyles,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";
import {
  Checkmark12Filled,
  Checkmark16Filled,
  Square12Filled,
  Square16Filled,
  Circle12Filled,
  Circle16Filled,
} from "@ntkrnl64/fluentui-vue-icons";

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
const vueSlots = useSlots();
const hasLabel = computed(() => !!vueSlots.default);
const inputRef = ref<HTMLInputElement | null>(null);

// Set indeterminate via JS (can't be set via HTML attribute)
function syncIndeterminate() {
  if (inputRef.value) {
    inputRef.value.indeterminate = checked.value === "mixed";
  }
}
onMounted(syncIndeterminate);
watch(checked, syncIndeterminate);

// CSS variables used internally for indicator styling
const vars = {
  indicatorColor: "--fui-Checkbox__indicator--color",
  indicatorBorderColor: "--fui-Checkbox__indicator--borderColor",
  indicatorBackgroundColor: "--fui-Checkbox__indicator--backgroundColor",
} as const;

const indicatorSizeMedium = "16px";
const indicatorSizeLarge = "20px";

// --- Styles (matching React's useCheckboxStyles.styles.ts exactly) ---

const useRootBaseClass = makeResetStyles({
  position: "relative",
  display: "inline-flex",
  cursor: "pointer",
  maxWidth: "fit-content",
  verticalAlign: "middle",
  color: tokens.colorNeutralForeground3,
});

const useRootStyles = makeStyles({
  unchecked: {
    ":hover": {
      color: tokens.colorNeutralForeground2,
      [vars.indicatorBorderColor]: tokens.colorNeutralStrokeAccessibleHover,
    },
    ":active": {
      color: tokens.colorNeutralForeground1,
      [vars.indicatorBorderColor]: tokens.colorNeutralStrokeAccessiblePressed,
    },
  },
  checked: {
    color: tokens.colorNeutralForeground1,
    [vars.indicatorBackgroundColor]: tokens.colorCompoundBrandBackground,
    [vars.indicatorColor]: tokens.colorNeutralForegroundInverted,
    [vars.indicatorBorderColor]: tokens.colorCompoundBrandBackground,

    ":hover": {
      [vars.indicatorBackgroundColor]: tokens.colorCompoundBrandBackgroundHover,
      [vars.indicatorBorderColor]: tokens.colorCompoundBrandBackgroundHover,
    },
    ":active": {
      [vars.indicatorBackgroundColor]:
        tokens.colorCompoundBrandBackgroundPressed,
      [vars.indicatorBorderColor]: tokens.colorCompoundBrandBackgroundPressed,
    },
  },
  mixed: {
    color: tokens.colorNeutralForeground1,
    [vars.indicatorBorderColor]: tokens.colorCompoundBrandStroke,
    [vars.indicatorColor]: tokens.colorCompoundBrandForeground1,

    ":hover": {
      [vars.indicatorBorderColor]: tokens.colorCompoundBrandStrokeHover,
      [vars.indicatorColor]: tokens.colorCompoundBrandForeground1Hover,
    },
    ":active": {
      [vars.indicatorBorderColor]: tokens.colorCompoundBrandStrokePressed,
      [vars.indicatorColor]: tokens.colorCompoundBrandForeground1Pressed,
    },
  },
  disabled: {
    cursor: "default",
    color: tokens.colorNeutralForegroundDisabled,
    [vars.indicatorBorderColor]: tokens.colorNeutralStrokeDisabled,
    [vars.indicatorColor]: tokens.colorNeutralForegroundDisabled,

    "@media (forced-colors: active)": {
      color: "GrayText",
      [vars.indicatorColor]: "GrayText",
    },
  },
});

const useInputBaseClass = makeResetStyles({
  boxSizing: "border-box",
  cursor: "inherit",
  height: "100%",
  margin: 0,
  opacity: 0,
  position: "absolute",
  top: 0,
  width: `calc(${indicatorSizeMedium} + 2 * ${tokens.spacingHorizontalS})`,
});

const useInputStyles = makeStyles({
  before: {
    right: 0,
  },
  after: {
    left: 0,
  },
  large: {
    width: `calc(${indicatorSizeLarge} + 2 * ${tokens.spacingHorizontalS})`,
  },
});

const useIndicatorBaseClass = makeResetStyles({
  alignSelf: "flex-start",
  boxSizing: "border-box",
  flexShrink: 0,

  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",

  color: `var(${vars.indicatorColor})`,
  backgroundColor: `var(${vars.indicatorBackgroundColor})`,
  borderColor: `var(${vars.indicatorBorderColor}, ${tokens.colorNeutralStrokeAccessible})`,
  borderStyle: "solid",
  borderWidth: tokens.strokeWidthThin,
  borderRadius: tokens.borderRadiusSmall,
  margin: tokens.spacingVerticalS + " " + tokens.spacingHorizontalS,
  fill: "currentColor",
  pointerEvents: "none",

  fontSize: "12px",
  height: indicatorSizeMedium,
  width: indicatorSizeMedium,
});

const useIndicatorStyles = makeStyles({
  large: {
    fontSize: "16px",
    height: indicatorSizeLarge,
    width: indicatorSizeLarge,
  },
  circular: { borderRadius: tokens.borderRadiusCircular },
});

const useLabelStyles = makeStyles({
  base: {
    alignSelf: "center",
    color: "inherit",
    cursor: "inherit",
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalS}`,
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
    fontWeight: tokens.fontWeightRegular as unknown as string,
  },
  before: {
    paddingRight: tokens.spacingHorizontalXS,
  },
  after: {
    paddingLeft: tokens.spacingHorizontalXS,
  },
  medium: {
    marginTop: `calc((${indicatorSizeMedium} - ${tokens.lineHeightBase300}) / 2)`,
    marginBottom: `calc((${indicatorSizeMedium} - ${tokens.lineHeightBase300}) / 2)`,
  },
  large: {
    marginTop: `calc((${indicatorSizeLarge} - ${tokens.lineHeightBase300}) / 2)`,
    marginBottom: `calc((${indicatorSizeLarge} - ${tokens.lineHeightBase300}) / 2)`,
  },
});

const rootBaseClassName = useResetStyles(useRootBaseClass);
const rootStyles = useStyles(useRootStyles);
const inputBaseClassName = useResetStyles(useInputBaseClass);
const inputStyles = useStyles(useInputStyles);
const indicatorBaseClassName = useResetStyles(useIndicatorBaseClass);
const indicatorStyles = useStyles(useIndicatorStyles);
const labelStyles = useStyles(useLabelStyles);

const rootClass = computed(() =>
  mergeClasses(
    "fui-Checkbox",
    rootBaseClassName.value,
    props.disabled
      ? rootStyles.value.disabled
      : checked.value === "mixed"
        ? rootStyles.value.mixed
        : checked.value
          ? rootStyles.value.checked
          : rootStyles.value.unchecked,
  ),
);

const inputClass = computed(() =>
  mergeClasses(
    "fui-Checkbox__input",
    inputBaseClassName.value,
    props.size === "large" && inputStyles.value.large,
    inputStyles.value[props.labelPosition],
  ),
);

const indicatorClass = computed(() =>
  mergeClasses(
    "fui-Checkbox__indicator",
    indicatorBaseClassName.value,
    props.size === "large" && indicatorStyles.value.large,
    props.shape === "circular" && indicatorStyles.value.circular,
  ),
);

const labelClass = computed(() =>
  mergeClasses(
    "fui-Checkbox__label",
    labelStyles.value.base,
    labelStyles.value[props.size],
    labelStyles.value[props.labelPosition],
  ),
);

function handleChange(event: Event) {
  if (props.disabled) return;
  const input = event.target as HTMLInputElement;
  checked.value = input.indeterminate ? "mixed" : input.checked;
}
</script>

<template>
  <span :class="rootClass" v-bind="$attrs">
    <input
      ref="inputRef"
      :class="inputClass"
      type="checkbox"
      :checked="checked === true"
      :disabled="disabled"
      @change="handleChange"
    />
    <span v-if="labelPosition === 'before' && hasLabel" :class="labelClass">
      <slot />
    </span>
    <div :class="indicatorClass" aria-hidden="true">
      <template v-if="checked === 'mixed'">
        <Circle16Filled v-if="shape === 'circular' && size === 'large'" />
        <Circle12Filled v-else-if="shape === 'circular'" />
        <Square16Filled v-else-if="size === 'large'" />
        <Square12Filled v-else />
      </template>
      <template v-else-if="checked === true">
        <Checkmark16Filled v-if="size === 'large'" />
        <Checkmark12Filled v-else />
      </template>
    </div>
    <span v-if="labelPosition === 'after' && hasLabel" :class="labelClass">
      <slot />
    </span>
  </span>
</template>
