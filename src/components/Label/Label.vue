<script setup lang="ts">
import { computed } from "vue";
import {
  useStyles,
  useResetStyles,
  mergeClasses,
  makeStyles,
  makeResetStyles,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";

export interface LabelProps {
  required?: boolean | string;
  disabled?: boolean;
  size?: "small" | "medium" | "large";
  weight?: "regular" | "semibold";
}

const props = withDefaults(defineProps<LabelProps>(), {
  required: false,
  disabled: false,
  size: "medium",
  weight: "regular",
});

defineOptions({ inheritAttrs: false });

const useBaseClass = makeResetStyles({
  fontFamily: tokens.fontFamilyBase,
  color: tokens.colorNeutralForeground1,
  cursor: "default",
});

const useLabelStyles = makeStyles({
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
    fontWeight: tokens.fontWeightSemibold,
  },
  semibold: { fontWeight: tokens.fontWeightSemibold },
  disabled: { color: tokens.colorNeutralForegroundDisabled, cursor: "default" },
  required: {
    color: tokens.colorPaletteRedForeground3,
    paddingLeft: tokens.spacingHorizontalXS,
  },
});

const baseClassName = useResetStyles(useBaseClass);
const styles = useStyles(useLabelStyles);

const rootClass = computed(() =>
  mergeClasses(
    "fui-Label",
    baseClassName.value,
    styles.value[props.size],
    props.weight === "semibold" && styles.value.semibold,
    props.disabled && styles.value.disabled,
  ),
);

const requiredText = computed(() => {
  if (typeof props.required === "string") return props.required;
  if (props.required) return "*";
  return null;
});
</script>

<template>
  <label :class="rootClass" v-bind="$attrs">
    <slot />
    <span v-if="requiredText" :class="styles.required" aria-hidden="true">{{
      requiredText
    }}</span>
  </label>
</template>
