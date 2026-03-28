<script setup lang="ts">
import { computed, ref } from "vue";
import {
  ChevronUp12Regular,
  ChevronDown12Regular,
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
import { clamp } from "../../utils/clamp";

export type SpinButtonSize = "small" | "medium";
export type SpinButtonAppearance =
  | "outline"
  | "underline"
  | "filled-darker"
  | "filled-lighter";

export interface SpinButtonProps {
  min?: number;
  max?: number;
  step?: number;
  size?: SpinButtonSize;
  appearance?: SpinButtonAppearance;
  disabled?: boolean;
  precision?: number;
}

const props = withDefaults(defineProps<SpinButtonProps>(), {
  min: -Infinity,
  max: Infinity,
  step: 1,
  size: "medium",
  appearance: "outline",
  disabled: false,
  precision: 0,
});

defineOptions({ inheritAttrs: false });
const modelValue = defineModel<number | null>({ default: 0 });

const useBaseClass = makeResetStyles({
  display: "inline-flex",
  alignItems: "center",
  fontFamily: tokens.fontFamilyBase,
  fontSize: tokens.fontSizeBase300,
  lineHeight: tokens.lineHeightBase300,
  ...shorthands.borderRadius(tokens.borderRadiusMedium),
  border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
  borderBottomColor: tokens.colorNeutralStrokeAccessible,
  backgroundColor: tokens.colorNeutralBackground1,
  position: "relative",
  boxSizing: "border-box",
});

const useSpinStyles = makeStyles({
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
    textAlign: "start",
  },
  small: {
    minHeight: "24px",
    ...shorthands.padding("0", tokens.spacingHorizontalS),
    fontSize: tokens.fontSizeBase200,
  },
  medium: {
    minHeight: "32px",
    ...shorthands.padding("0", tokens.spacingHorizontalMNudge),
  },
  buttons: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    backgroundColor: "transparent",
    color: tokens.colorNeutralForeground3,
    cursor: "pointer",
    padding: "0 4px",
    fontSize: "10px",
    lineHeight: 1,
    ":hover": { color: tokens.colorNeutralForeground3Hover },
  },
  disabled: {
    ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
    backgroundColor: tokens.colorTransparentBackground,
    color: tokens.colorNeutralForegroundDisabled,
    cursor: "not-allowed",
  },
});

const baseClassName = useResetStyles(useBaseClass);
const styles = useStyles(useSpinStyles);

const rootClass = computed(() =>
  mergeClasses(
    "fui-SpinButton",
    baseClassName.value,
    styles.value[props.size],
    props.disabled && styles.value.disabled,
  ),
);

function increment() {
  if (props.disabled) return;
  modelValue.value = clamp(
    (modelValue.value ?? 0) + props.step,
    props.min,
    props.max,
  );
}

function decrement() {
  if (props.disabled) return;
  modelValue.value = clamp(
    (modelValue.value ?? 0) - props.step,
    props.min,
    props.max,
  );
}

function onInput(event: Event) {
  const v = Number((event.target as HTMLInputElement).value);
  if (!isNaN(v)) modelValue.value = clamp(v, props.min, props.max);
}
</script>

<template>
  <span :class="rootClass" v-bind="$attrs">
    <input
      :class="styles.input"
      type="text"
      role="spinbutton"
      :aria-valuemin="min === -Infinity ? undefined : min"
      :aria-valuemax="max === Infinity ? undefined : max"
      :aria-valuenow="modelValue ?? undefined"
      :value="modelValue?.toFixed(precision) ?? ''"
      :disabled="disabled"
      @input="onInput"
      @keydown.up.prevent="increment"
      @keydown.down.prevent="decrement"
    />
    <span :class="styles.buttons">
      <button
        :class="styles.button"
        tabindex="-1"
        :disabled="disabled"
        @click="increment"
        aria-label="Increment"
      >
        <ChevronUp12Regular />
      </button>
      <button
        :class="styles.button"
        tabindex="-1"
        :disabled="disabled"
        @click="decrement"
        aria-label="Decrement"
      >
        <ChevronDown12Regular />
      </button>
    </span>
  </span>
</template>
