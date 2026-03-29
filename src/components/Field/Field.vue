<script setup lang="ts">
import { computed } from "vue";
import {
  useStyles,
  useResetStyles,
  mergeClasses,
  makeStyles,
  makeResetStyles,
} from "@ntkrnl64/griffel-vue";
import { tokens, typographyStyles } from "@fluentui/react-theme";
import {
  CheckmarkCircle12Filled,
  Dismiss12Filled,
  Warning12Filled,
} from "@ntkrnl64/fluentui-vue-icons";
import { useId } from "../../composables/useId";

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

const baseId = useId("field-");
const controlId = `${baseId}__control`;
const labelId = `${baseId}__label`;
const validationMessageId = `${baseId}__validationMessage`;
const hintId = `${baseId}__hint`;

// Size of the icon in the validation message
const iconSize = "12px";

const effectiveValidationState = computed(() => {
  if (props.validationState !== "none") return props.validationState;
  if (props.validationMessage) return "error";
  return "none";
});

const showValidationIcon = computed(
  () => effectiveValidationState.value !== "none",
);

const validationRole = computed(() => {
  const state = effectiveValidationState.value;
  return state === "error" || state === "warning" ? "alert" : undefined;
});

// --- Styles (matching React's useFieldStyles.styles.ts exactly) ---

const useRootStyles = makeStyles({
  base: {
    display: "grid",
  },
  horizontal: {
    gridTemplateColumns: "33% 1fr",
    gridTemplateRows: "auto auto auto 1fr",
  },
  horizontalNoLabel: {
    paddingLeft: "33%",
    gridTemplateColumns: "1fr",
  },
});

const useLabelStyles = makeStyles({
  base: {
    maxWidth: "max-content",
    maxHeight: "max-content",
  },
  vertical: {
    paddingTop: tokens.spacingVerticalXXS,
    paddingBottom: tokens.spacingVerticalXXS,
    marginBottom: tokens.spacingVerticalXXS,
  },
  verticalLarge: {
    paddingTop: "1px",
    paddingBottom: "1px",
    marginBottom: tokens.spacingVerticalXS,
  },
  horizontal: {
    paddingTop: tokens.spacingVerticalSNudge,
    paddingBottom: tokens.spacingVerticalSNudge,
    marginRight: tokens.spacingHorizontalM,
    gridRowStart: "1",
    gridRowEnd: "-1",
  },
  horizontalSmall: {
    paddingTop: tokens.spacingVerticalXS,
    paddingBottom: tokens.spacingVerticalXS,
  },
  horizontalLarge: {
    paddingTop: "9px",
    paddingBottom: "9px",
  },
});

const useSecondaryTextBaseClass = makeResetStyles({
  marginTop: tokens.spacingVerticalXXS,
  color: tokens.colorNeutralForeground3,
  ...typographyStyles.caption1,
});

const useSecondaryTextStyles = makeStyles({
  error: {
    color: tokens.colorPaletteRedForeground1,
  },
  withIcon: {
    paddingLeft: `calc(${iconSize} + ${tokens.spacingHorizontalXS})`,
  },
});

const useValidationMessageIconBaseClass = makeResetStyles({
  display: "inline-block",
  fontSize: iconSize,
  marginLeft: `calc(-${iconSize} - ${tokens.spacingHorizontalXS})`,
  marginRight: tokens.spacingHorizontalXS,
  lineHeight: "0",
  verticalAlign: "-1px",
});

const useValidationMessageIconStyles = makeStyles({
  error: {
    color: tokens.colorPaletteRedForeground1,
  },
  warning: {
    color: tokens.colorPaletteDarkOrangeForeground1,
  },
  success: {
    color: tokens.colorPaletteGreenForeground1,
  },
});

const useRequiredStyles = makeStyles({
  asterisk: {
    color: tokens.colorPaletteRedForeground3,
    paddingLeft: tokens.spacingHorizontalXS,
  },
});

const rootStyles = useStyles(useRootStyles);
const labelStyles = useStyles(useLabelStyles);
const secondaryTextBaseClassName = useResetStyles(useSecondaryTextBaseClass);
const secondaryTextStyles = useStyles(useSecondaryTextStyles);
const validationMessageIconBaseClassName = useResetStyles(
  useValidationMessageIconBaseClass,
);
const validationMessageIconStyles = useStyles(useValidationMessageIconStyles);
const requiredStyles = useStyles(useRequiredStyles);

const isHorizontal = computed(() => props.orientation === "horizontal");

const rootClass = computed(() =>
  mergeClasses(
    "fui-Field",
    rootStyles.value.base,
    isHorizontal.value && rootStyles.value.horizontal,
    isHorizontal.value && !props.label && rootStyles.value.horizontalNoLabel,
  ),
);

const labelClass = computed(() =>
  mergeClasses(
    "fui-Field__label",
    labelStyles.value.base,
    isHorizontal.value && labelStyles.value.horizontal,
    isHorizontal.value &&
      props.size === "small" &&
      labelStyles.value.horizontalSmall,
    isHorizontal.value &&
      props.size === "large" &&
      labelStyles.value.horizontalLarge,
    !isHorizontal.value && labelStyles.value.vertical,
    !isHorizontal.value &&
      props.size === "large" &&
      labelStyles.value.verticalLarge,
  ),
);

const validationMessageClass = computed(() =>
  mergeClasses(
    "fui-Field__validationMessage",
    secondaryTextBaseClassName.value,
    effectiveValidationState.value === "error" &&
      secondaryTextStyles.value.error,
    showValidationIcon.value && secondaryTextStyles.value.withIcon,
  ),
);

const validationMessageIconClass = computed(() =>
  mergeClasses(
    "fui-Field__validationMessageIcon",
    validationMessageIconBaseClassName.value,
    effectiveValidationState.value !== "none" &&
      validationMessageIconStyles.value[effectiveValidationState.value],
  ),
);

const hintClass = computed(() =>
  mergeClasses("fui-Field__hint", secondaryTextBaseClassName.value),
);
</script>

<template>
  <div :class="rootClass" v-bind="$attrs">
    <label v-if="label" :id="labelId" :for="controlId" :class="labelClass">
      {{ label }}
      <span v-if="required" :class="requiredStyles.asterisk" aria-hidden="true"
        >*</span
      >
    </label>
    <slot :id="controlId" :label-id="labelId" />
    <div
      v-if="validationMessage && effectiveValidationState !== 'none'"
      :id="validationMessageId"
      :class="validationMessageClass"
      :role="validationRole"
    >
      <span v-if="showValidationIcon" :class="validationMessageIconClass">
        <Dismiss12Filled v-if="effectiveValidationState === 'error'" />
        <Warning12Filled v-if="effectiveValidationState === 'warning'" />
        <CheckmarkCircle12Filled
          v-if="effectiveValidationState === 'success'"
        />
      </span>
      {{ validationMessage }}
    </div>
    <div v-if="hint" :id="hintId" :class="hintClass">{{ hint }}</div>
  </div>
</template>
