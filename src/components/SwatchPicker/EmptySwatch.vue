<script setup lang="ts">
import { inject, computed } from "vue";
import {
  useStyles,
  useResetStyles,
  mergeClasses,
  makeStyles,
  makeResetStyles,
  shorthands,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";
import { SwatchPickerContextKey } from "./context";

export interface EmptySwatchProps {
  value: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<EmptySwatchProps>(), {
  disabled: false,
});
defineOptions({ inheritAttrs: false });
const ctx = inject(SwatchPickerContextKey)!;

const sizes = {
  "extra-small": "20px",
  small: "24px",
  medium: "28px",
  large: "32px",
};

const useBaseClass = makeResetStyles({
  border: `${tokens.strokeWidthThin} dashed ${tokens.colorNeutralStroke1}`,
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  outlineStyle: "none",
  backgroundColor: "transparent",
  ...shorthands.padding("0"),
  ":focus-visible": {
    outlineColor: tokens.colorStrokeFocus2,
    outlineWidth: tokens.strokeWidthThick,
    outlineStyle: "solid",
    outlineOffset: "2px",
  },
});

const useSwatchStyles = makeStyles({
  selected: {
    ...shorthands.borderColor(tokens.colorNeutralForeground1),
    ...shorthands.borderWidth("2px"),
    ...shorthands.borderStyle("solid"),
  },
  rounded: { ...shorthands.borderRadius(tokens.borderRadiusMedium) },
  square: { ...shorthands.borderRadius(tokens.borderRadiusNone) },
  circular: { ...shorthands.borderRadius(tokens.borderRadiusCircular) },
  disabled: { opacity: 0.4, cursor: "not-allowed" },
});

const baseClassName = useResetStyles(useBaseClass);
const styles = useStyles(useSwatchStyles);

const isSelected = computed(() => ctx.selectedValue.value === props.value);

const rootClass = computed(() =>
  mergeClasses(
    "fui-EmptySwatch",
    baseClassName.value,
    styles.value[ctx.shape.value],
    isSelected.value && styles.value.selected,
    props.disabled && styles.value.disabled,
  ),
);

const sizeStyle = computed(() => {
  const s = sizes[ctx.size.value];
  return { width: s, height: s };
});
</script>

<template>
  <button
    :class="rootClass"
    :style="sizeStyle"
    role="radio"
    :aria-checked="isSelected"
    aria-label="Empty"
    :disabled="disabled"
    v-bind="$attrs"
    @click="!disabled && ctx.selectValue(value)"
  >
    <slot />
  </button>
</template>
