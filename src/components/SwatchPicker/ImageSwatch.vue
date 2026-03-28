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

export interface ImageSwatchProps {
  src: string;
  value: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<ImageSwatchProps>(), {
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
  border: "1px solid transparent",
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  outlineStyle: "none",
  overflow: "hidden",
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
  },
  rounded: { ...shorthands.borderRadius(tokens.borderRadiusMedium) },
  square: { ...shorthands.borderRadius(tokens.borderRadiusNone) },
  circular: { ...shorthands.borderRadius(tokens.borderRadiusCircular) },
  disabled: { opacity: 0.4, cursor: "not-allowed" },
  image: { width: "100%", height: "100%", objectFit: "cover" },
});

const baseClassName = useResetStyles(useBaseClass);
const styles = useStyles(useSwatchStyles);

const isSelected = computed(() => ctx.selectedValue.value === props.value);

const rootClass = computed(() =>
  mergeClasses(
    "fui-ImageSwatch",
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
    :aria-label="src"
    :disabled="disabled"
    v-bind="$attrs"
    @click="!disabled && ctx.selectValue(value)"
  >
    <img :class="styles.image" :src="src" alt="" />
    <svg
      v-if="isSelected"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      style="position: absolute"
    >
      <path
        d="M13.86 3.66a.75.75 0 0 1 .04 1.06l-7.93 8.5a.75.75 0 0 1-1.08.02L2.22 10.6a.75.75 0 1 1 1.06-1.06l2.11 2.1 7.41-7.94a.75.75 0 0 1 1.06-.04Z"
        fill="currentColor"
      />
    </svg>
  </button>
</template>
