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

const useToggleStyles = makeStyles({
  checked: {
    backgroundColor: tokens.colorNeutralBackground1Selected,
    ...shorthands.borderColor(tokens.colorNeutralStroke1),
    color: tokens.colorNeutralForeground1Selected,
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
    ":hover:active": {
      backgroundColor: tokens.colorNeutralBackground1Pressed,
    },
  },
  checkedPrimary: {
    backgroundColor: tokens.colorBrandBackgroundSelected,
    ":hover": {
      backgroundColor: tokens.colorBrandBackgroundHover,
    },
    ":hover:active": {
      backgroundColor: tokens.colorBrandBackgroundPressed,
    },
  },
  checkedSubtle: {
    backgroundColor: tokens.colorSubtleBackgroundSelected,
    color: tokens.colorNeutralForeground2Selected,
    ":hover": {
      backgroundColor: tokens.colorSubtleBackgroundHover,
    },
  },
});

const baseClassName = useResetStyles(useButtonBaseClassName);
const buttonStyles = useStyles(useButtonStyles);
const toggleStyles = useStyles(useToggleStyles);

const hasIcon = computed(() => !!slots.icon);
const iconOnly = computed(() => hasIcon.value && !slots.default);

const rootClass = computed(() =>
  mergeClasses(
    "fui-ToggleButton",
    baseClassName.value,
    buttonStyles.value[props.size],
    props.appearance !== "secondary" && buttonStyles.value[props.appearance],
    props.shape === "circular" && buttonStyles.value.circular,
    props.shape === "square" && buttonStyles.value.square,
    (props.disabled || props.disabledFocusable) && buttonStyles.value.disabled,
    iconOnly.value && buttonStyles.value.iconOnly,
    checked.value && toggleStyles.value.checked,
    checked.value &&
      props.appearance === "primary" &&
      toggleStyles.value.checkedPrimary,
    checked.value &&
      props.appearance === "subtle" &&
      toggleStyles.value.checkedSubtle,
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
    <span
      v-if="hasIcon && iconPosition === 'before'"
      :class="buttonStyles.icon"
    >
      <slot name="icon" />
    </span>
    <slot v-if="!iconOnly" />
    <span v-if="hasIcon && iconPosition === 'after'" :class="buttonStyles.icon">
      <slot name="icon" />
    </span>
  </button>
</template>
