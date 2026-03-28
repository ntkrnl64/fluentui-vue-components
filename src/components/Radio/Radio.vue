<script setup lang="ts">
import { computed, inject, ref } from "vue";
import {
  useStyles,
  useResetStyles,
  mergeClasses,
  makeStyles,
  makeResetStyles,
  shorthands,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";
import { RadioGroupContextKey } from "./context";

export interface RadioProps {
  value: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<RadioProps>(), {
  disabled: false,
});

defineOptions({ inheritAttrs: false });

const group = inject(RadioGroupContextKey, undefined);
const isSelected = computed(() => group?.modelValue.value === props.value);
const isDisabled = computed(() => props.disabled || group?.disabled.value);

const useBaseClass = makeResetStyles({
  display: "inline-flex",
  alignItems: "center",
  cursor: "pointer",
  columnGap: tokens.spacingHorizontalS,
  fontFamily: tokens.fontFamilyBase,
  fontSize: tokens.fontSizeBase300,
  lineHeight: tokens.lineHeightBase300,
  color: tokens.colorNeutralForeground1,
});

const useRadioStyles = makeStyles({
  indicator: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
    flexShrink: 0,
    width: "16px",
    height: "16px",
    ...shorthands.borderRadius(tokens.borderRadiusCircular),
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStrokeAccessible}`,
    transitionProperty: "background-color, border-color",
    transitionDuration: tokens.durationFaster,
  },
  indicatorSelected: {
    ...shorthands.borderColor(tokens.colorCompoundBrandStroke),
    "::after": {
      content: '""',
      ...shorthands.borderRadius(tokens.borderRadiusCircular),
      width: "10px",
      height: "10px",
      backgroundColor: tokens.colorCompoundBrandBackground,
    },
  },
  disabled: {
    cursor: "not-allowed",
    color: tokens.colorNeutralForegroundDisabled,
  },
  disabledIndicator: {
    ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
  },
  hidden: { position: "absolute", opacity: 0, width: 0, height: 0 },
});

const baseClassName = useResetStyles(useBaseClass);
const styles = useStyles(useRadioStyles);

const rootClass = computed(() =>
  mergeClasses(
    "fui-Radio",
    baseClassName.value,
    isDisabled.value && styles.value.disabled,
  ),
);

const indicatorClass = computed(() =>
  mergeClasses(
    styles.value.indicator,
    isSelected.value && styles.value.indicatorSelected,
    isDisabled.value && styles.value.disabledIndicator,
  ),
);

function select() {
  if (isDisabled.value) return;
  if (group) group.modelValue.value = props.value;
}
</script>

<template>
  <label :class="rootClass" v-bind="$attrs" @click.prevent="select">
    <input
      :class="styles.hidden"
      type="radio"
      :name="group?.name"
      :value="value"
      :checked="isSelected"
      :disabled="isDisabled"
      @change="select"
    />
    <div :class="indicatorClass" />
    <slot />
  </label>
</template>
