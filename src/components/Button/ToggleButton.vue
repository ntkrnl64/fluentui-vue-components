<script setup lang="ts">
import { computed, useSlots, ref } from "vue";
import {
  useStyles,
  useResetStyles,
  mergeClasses,
  makeStyles,
  shorthands,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";
import { useButtonStyles, useButtonBaseClassName } from "./Button.styles";
import type { ToggleButtonProps } from "./Button.types";

const props = withDefaults(defineProps<ToggleButtonProps>(), {
  appearance: "secondary",
  shape: "rounded",
  size: "medium",
  iconPosition: "before",
  disabled: false,
  disabledFocusable: false,
});

defineOptions({ inheritAttrs: false });

const checked = defineModel<boolean>("checked", { default: false });
const emit = defineEmits<{ click: [event: MouseEvent] }>();
const slots = useSlots();

// --- Checked styles (matching React's useToggleButtonStyles.styles.ts) ---
const useRootCheckedStyles = makeStyles({
  base: {
    backgroundColor: tokens.colorNeutralBackground1Selected,
    ...shorthands.borderColor(tokens.colorNeutralStroke1),
    color: tokens.colorNeutralForeground1Selected,
    ...shorthands.borderWidth(tokens.strokeWidthThin),

    ":hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
      ...shorthands.borderColor(tokens.colorNeutralStroke1Hover),
      color: tokens.colorNeutralForeground1Hover,
    },
    ":hover:active": {
      backgroundColor: tokens.colorNeutralBackground1Pressed,
      ...shorthands.borderColor(tokens.colorNeutralStroke1Pressed),
      color: tokens.colorNeutralForeground1Pressed,
    },
  },
  highContrast: {
    "@media (forced-colors: active)": {
      backgroundColor: "Highlight",
      ...shorthands.borderColor("Highlight"),
      color: "HighlightText",
      forcedColorAdjust: "none",

      ":hover": {
        backgroundColor: "HighlightText",
        ...shorthands.borderColor("Highlight"),
        color: "Highlight",
      },
      ":hover:active": {
        backgroundColor: "HighlightText",
        ...shorthands.borderColor("Highlight"),
        color: "Highlight",
      },
    },
  },

  outline: {
    backgroundColor: tokens.colorTransparentBackgroundSelected,
    ...shorthands.borderColor(tokens.colorNeutralStroke1),
    ...shorthands.borderWidth(tokens.strokeWidthThicker),

    ":hover": {
      backgroundColor: tokens.colorTransparentBackgroundHover,
    },
    ":hover:active": {
      backgroundColor: tokens.colorTransparentBackgroundPressed,
    },
  },
  primary: {
    backgroundColor: tokens.colorBrandBackgroundSelected,
    ...shorthands.borderColor("transparent"),
    color: tokens.colorNeutralForegroundOnBrand,

    ":hover": {
      backgroundColor: tokens.colorBrandBackgroundHover,
      ...shorthands.borderColor("transparent"),
      color: tokens.colorNeutralForegroundOnBrand,
    },
    ":hover:active": {
      backgroundColor: tokens.colorBrandBackgroundPressed,
      ...shorthands.borderColor("transparent"),
      color: tokens.colorNeutralForegroundOnBrand,
    },
  },
  secondary: {
    /* same as base */
  },
  subtle: {
    backgroundColor: tokens.colorSubtleBackgroundSelected,
    ...shorthands.borderColor("transparent"),
    color: tokens.colorNeutralForeground2Selected,

    ":hover": {
      backgroundColor: tokens.colorSubtleBackgroundHover,
      ...shorthands.borderColor("transparent"),
      color: tokens.colorNeutralForeground2Hover,
    },
    ":hover:active": {
      backgroundColor: tokens.colorSubtleBackgroundPressed,
      ...shorthands.borderColor("transparent"),
      color: tokens.colorNeutralForeground2Pressed,
    },
  },
  transparent: {
    backgroundColor: tokens.colorTransparentBackgroundSelected,
    ...shorthands.borderColor("transparent"),
    color: tokens.colorNeutralForeground2BrandSelected,

    ":hover": {
      backgroundColor: tokens.colorTransparentBackgroundHover,
      ...shorthands.borderColor("transparent"),
      color: tokens.colorNeutralForeground2BrandHover,
    },
    ":hover:active": {
      backgroundColor: tokens.colorTransparentBackgroundPressed,
      ...shorthands.borderColor("transparent"),
      color: tokens.colorNeutralForeground2BrandPressed,
    },
  },
});

const useRootDisabledStyles = makeStyles({
  base: {
    backgroundColor: tokens.colorNeutralBackgroundDisabled,
    ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
    color: tokens.colorNeutralForegroundDisabled,

    ":hover": {
      backgroundColor: tokens.colorNeutralBackgroundDisabled,
      ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
      color: tokens.colorNeutralForegroundDisabled,
    },
    ":hover:active": {
      backgroundColor: tokens.colorNeutralBackgroundDisabled,
      ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
      color: tokens.colorNeutralForegroundDisabled,
    },
  },
  outline: {
    /* No styles */
  },
  primary: {
    ...shorthands.borderColor("transparent"),
    ":hover": {
      ...shorthands.borderColor("transparent"),
    },
    ":hover:active": {
      ...shorthands.borderColor("transparent"),
    },
  },
  secondary: {
    /* same as base */
  },
  subtle: {
    backgroundColor: tokens.colorTransparentBackground,
    ...shorthands.borderColor("transparent"),
    ":hover": {
      backgroundColor: tokens.colorTransparentBackgroundHover,
      ...shorthands.borderColor("transparent"),
    },
    ":hover:active": {
      backgroundColor: tokens.colorTransparentBackgroundPressed,
      ...shorthands.borderColor("transparent"),
    },
  },
  transparent: {
    backgroundColor: tokens.colorTransparentBackground,
    ...shorthands.borderColor("transparent"),
    ":hover": {
      backgroundColor: tokens.colorTransparentBackgroundHover,
      ...shorthands.borderColor("transparent"),
    },
    ":hover:active": {
      backgroundColor: tokens.colorTransparentBackgroundPressed,
      ...shorthands.borderColor("transparent"),
    },
  },
});

const useIconCheckedStyles = makeStyles({
  subtleOrTransparent: {
    color: tokens.colorNeutralForeground2BrandSelected,
  },
  highContrast: {
    "@media (forced-colors: active)": {
      forcedColorAdjust: "auto",
    },
  },
});

const usePrimaryHighContrastStyles = makeStyles({
  base: {
    "@media (forced-colors: active)": {
      backgroundColor: "ButtonFace",
      ...shorthands.borderColor("ButtonBorder"),
      color: "ButtonText",
      forcedColorAdjust: "auto",
    },
  },
  disabled: {
    "@media (forced-colors: active)": {
      ...shorthands.borderColor("GrayText"),
      color: "GrayText",
      ":focus": {
        ...shorthands.borderColor("GrayText"),
      },
    },
  },
});

const baseClassName = useResetStyles(useButtonBaseClassName);
const buttonStyles = useStyles(useButtonStyles);
const rootCheckedStyles = useStyles(useRootCheckedStyles);
const rootDisabledStyles = useStyles(useRootDisabledStyles);
const iconCheckedStyles = useStyles(useIconCheckedStyles);
const primaryHighContrastStyles = useStyles(usePrimaryHighContrastStyles);

const hasIcon = computed(() => !!slots.icon);
const iconOnly = computed(() => hasIcon.value && !slots.default);
const isDisabled = computed(
  () => props.disabled || props.disabledFocusable,
);

const rootClass = computed(() =>
  mergeClasses(
    "fui-ToggleButton",
    baseClassName.value,
    buttonStyles.value[props.size],
    props.appearance !== "secondary" && buttonStyles.value[props.appearance],
    props.shape === "circular" && buttonStyles.value.circular,
    props.shape === "square" && buttonStyles.value.square,
    iconOnly.value && buttonStyles.value.iconOnly,
    iconOnly.value &&
      props.size === "small" &&
      buttonStyles.value.iconOnlySmall,
    iconOnly.value &&
      props.size === "large" &&
      buttonStyles.value.iconOnlyLarge,

    // Primary high contrast
    props.appearance === "primary" && primaryHighContrastStyles.value.base,
    props.appearance === "primary" &&
      isDisabled.value &&
      primaryHighContrastStyles.value.disabled,

    // Checked styles
    checked.value && rootCheckedStyles.value.base,
    checked.value && rootCheckedStyles.value.highContrast,
    checked.value &&
      rootCheckedStyles.value[
        props.appearance as keyof typeof rootCheckedStyles.value
      ],

    // Disabled styles
    isDisabled.value && rootDisabledStyles.value.base,
    isDisabled.value &&
      rootDisabledStyles.value[
        props.appearance as keyof typeof rootDisabledStyles.value
      ],
    isDisabled.value && buttonStyles.value.disabled,
  ),
);

const iconClass = computed(() =>
  mergeClasses(
    "fui-ToggleButton__icon",
    buttonStyles.value.icon,
    props.size === "small" && buttonStyles.value.iconSmall,
    props.size === "medium" && buttonStyles.value.iconMedium,
    props.size === "large" && buttonStyles.value.iconLarge,
    checked.value &&
      (props.appearance === "subtle" || props.appearance === "transparent") &&
      iconCheckedStyles.value.subtleOrTransparent,
    iconCheckedStyles.value.highContrast,
  ),
);

function handleClick(event: MouseEvent) {
  if (props.disabled) {
    event.preventDefault();
    event.stopPropagation();
    return;
  }
  checked.value = !checked.value;
  emit("click", event);
}

const rootRef = ref<HTMLElement | null>(null);
defineExpose({ el: rootRef });
</script>

<template>
  <button
    ref="rootRef"
    :class="rootClass"
    :disabled="disabled && !disabledFocusable ? true : undefined"
    :aria-disabled="disabledFocusable ? 'true' : undefined"
    :aria-pressed="checked"
    v-bind="$attrs"
    @click="handleClick"
  >
    <span v-if="hasIcon && iconPosition === 'before'" :class="iconClass">
      <slot name="icon" />
    </span>
    <slot v-if="!iconOnly" />
    <span v-if="hasIcon && iconPosition === 'after'" :class="iconClass">
      <slot name="icon" />
    </span>
  </button>
</template>
