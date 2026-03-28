<script setup lang="ts">
import { computed, ref } from "vue";
import {
  useStyles,
  useResetStyles,
  mergeClasses,
  makeStyles,
  makeResetStyles,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";

export interface FieldProps {
  label?: string;
  validationState?: "none" | "success" | "warning" | "error";
  validationMessage?: string;
  hint?: string;
  required?: boolean;
  size?: "small" | "medium" | "large";
  orientation?: "horizontal" | "vertical";
}

const props = withDefaults(defineProps<FieldProps>(), {
  validationState: "none",
  required: false,
  size: "medium",
  orientation: "vertical",
});

defineOptions({ inheritAttrs: false });

let fieldCounter = 0;
const fieldId = `fui-field-${++fieldCounter}`;
const labelId = `${fieldId}-label`;
const validationId = `${fieldId}-validation`;
const hintId = `${fieldId}-hint`;

const useBaseClass = makeResetStyles({
  display: "flex",
  fontFamily: tokens.fontFamilyBase,
});

const useFieldStyles = makeStyles({
  vertical: {
    flexDirection: "column",
    gap: tokens.spacingVerticalXXS,
  },
  horizontal: {
    flexDirection: "row",
    alignItems: "start",
    gap: tokens.spacingHorizontalM,
  },
  horizontalLabel: {
    width: "33%",
    paddingTop: tokens.spacingVerticalSNudge,
  },
  horizontalContent: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXS,
  },
  label: {
    cursor: "default",
    color: tokens.colorNeutralForeground1,
    display: "block",
  },
  labelSmall: {
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
  },
  labelMedium: {
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
  },
  labelLarge: {
    fontSize: tokens.fontSizeBase400,
    lineHeight: tokens.lineHeightBase400,
    fontWeight: tokens.fontWeightSemibold,
  },
  required: {
    color: tokens.colorPaletteRedForeground3,
    paddingLeft: tokens.spacingHorizontalXS,
  },
  validationMessage: {
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
  },
  success: {
    color: tokens.colorPaletteGreenForeground1,
  },
  warning: {
    color: tokens.colorPaletteDarkOrangeForeground1,
  },
  error: {
    color: tokens.colorPaletteRedForeground1,
  },
  hint: {
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
    color: tokens.colorNeutralForeground3,
  },
});

const baseClassName = useResetStyles(useBaseClass);
const styles = useStyles(useFieldStyles);

const rootClass = computed(() =>
  mergeClasses(
    "fui-Field",
    baseClassName.value,
    styles.value[props.orientation],
  ),
);

const labelClass = computed(() =>
  mergeClasses(
    "fui-Field__label",
    styles.value.label,
    props.size === "small" && styles.value.labelSmall,
    props.size === "medium" && styles.value.labelMedium,
    props.size === "large" && styles.value.labelLarge,
    props.orientation === "horizontal" && styles.value.horizontalLabel,
  ),
);

const validationClass = computed(() =>
  mergeClasses(
    "fui-Field__validationMessage",
    styles.value.validationMessage,
    props.validationState === "success" && styles.value.success,
    props.validationState === "warning" && styles.value.warning,
    props.validationState === "error" && styles.value.error,
  ),
);
</script>

<template>
  <div :class="rootClass" v-bind="$attrs">
    <template v-if="orientation === 'horizontal'">
      <label v-if="label" :id="labelId" :for="fieldId" :class="labelClass">
        {{ label }}
        <span v-if="required" :class="styles.required" aria-hidden="true"
          >*</span
        >
      </label>
      <div :class="styles.horizontalContent">
        <slot :id="fieldId" :label-id="labelId" />
        <span
          v-if="validationMessage && validationState !== 'none'"
          :id="validationId"
          :class="validationClass"
          role="alert"
        >
          {{ validationMessage }}
        </span>
        <span v-if="hint" :id="hintId" :class="styles.hint">{{ hint }}</span>
      </div>
    </template>
    <template v-else>
      <label v-if="label" :id="labelId" :for="fieldId" :class="labelClass">
        {{ label }}
        <span v-if="required" :class="styles.required" aria-hidden="true"
          >*</span
        >
      </label>
      <slot :id="fieldId" :label-id="labelId" />
      <span
        v-if="validationMessage && validationState !== 'none'"
        :id="validationId"
        :class="validationClass"
        role="alert"
      >
        {{ validationMessage }}
      </span>
      <span v-if="hint" :id="hintId" :class="styles.hint">{{ hint }}</span>
    </template>
  </div>
</template>
