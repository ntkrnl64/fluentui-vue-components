<script setup lang="ts">
import { computed } from "vue";
import { Info16Regular } from "@ntkrnl64/fluentui-vue-icons";
import {
  useStyles,
  useResetStyles,
  mergeClasses,
  makeStyles,
  makeResetStyles,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";

export interface InfoLabelProps {
  required?: boolean | string;
  disabled?: boolean;
  size?: "small" | "medium" | "large";
  weight?: "regular" | "semibold";
  info?: string;
}

const props = withDefaults(defineProps<InfoLabelProps>(), {
  required: false,
  disabled: false,
  size: "medium",
  weight: "regular",
});

defineOptions({ inheritAttrs: false });

const useBaseClass = makeResetStyles({
  display: "inline-flex",
  alignItems: "center",
  gap: tokens.spacingHorizontalXS,
  fontFamily: tokens.fontFamilyBase,
  cursor: "default",
});

const useInfoLabelStyles = makeStyles({
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
  disabled: { color: tokens.colorNeutralForegroundDisabled },
  label: {
    color: tokens.colorNeutralForeground1,
  },
  required: {
    color: tokens.colorPaletteRedForeground3,
    paddingLeft: tokens.spacingHorizontalXS,
  },
});

const baseClassName = useResetStyles(useBaseClass);
const styles = useStyles(useInfoLabelStyles);

const rootClass = computed(() =>
  mergeClasses(
    "fui-InfoLabel",
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
  <span :class="rootClass" v-bind="$attrs">
    <label :class="styles.label">
      <slot />
      <span v-if="requiredText" :class="styles.required" aria-hidden="true">{{
        requiredText
      }}</span>
    </label>
    <slot name="infoButton">
      <span v-if="info" style="display: inline-flex">
        <!-- Default info button rendered inline; consumers can override via #infoButton slot -->
        <slot name="info" :info="info">
          <Info16Regular
            :title="info"
            role="img"
            aria-label="Information"
            style="cursor: help; font-size: 12px; color: inherit"
          />
        </slot>
      </span>
    </slot>
  </span>
</template>
