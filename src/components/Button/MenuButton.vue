<script setup lang="ts">
import { computed, useSlots, ref } from "vue";
import { ChevronDown16Regular } from "@ntkrnl64/fluentui-vue-icons";
import {
  useStyles,
  useResetStyles,
  mergeClasses,
  makeStyles,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";
import { useButtonStyles, useButtonBaseClassName } from "./Button.styles";
import type { ButtonProps } from "./Button.types";

const props = withDefaults(defineProps<ButtonProps>(), {
  appearance: "secondary",
  shape: "rounded",
  size: "medium",
  iconPosition: "before",
  disabled: false,
  disabledFocusable: false,
  as: "button",
});

defineOptions({ inheritAttrs: false });

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

const slots = useSlots();
const baseClassName = useResetStyles(useButtonBaseClassName);
const buttonStyles = useStyles(useButtonStyles);

const useMenuButtonStyles = makeStyles({
  chevron: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    height: "16px",
    width: "16px",
    marginLeft: tokens.spacingHorizontalXS,
    color: "currentColor",
  },
});

const menuButtonStyles = useStyles(useMenuButtonStyles);

const hasIcon = computed(() => !!slots.icon);
const iconOnly = computed(() => hasIcon.value && !slots.default);

const rootClass = computed(() =>
  mergeClasses(
    "fui-MenuButton",
    baseClassName.value,
    buttonStyles.value[props.size],
    props.appearance !== "secondary" && buttonStyles.value[props.appearance],
    props.shape === "circular" && buttonStyles.value.circular,
    props.shape === "square" && buttonStyles.value.square,
    (props.disabled || props.disabledFocusable) && buttonStyles.value.disabled,
    iconOnly.value && buttonStyles.value.iconOnly,
    iconOnly.value &&
      props.size === "small" &&
      buttonStyles.value.iconOnlySmall,
    iconOnly.value &&
      props.size === "large" &&
      buttonStyles.value.iconOnlyLarge,
  ),
);

const iconClass = computed(() =>
  mergeClasses(
    buttonStyles.value.icon,
    props.size === "small" && buttonStyles.value.iconSmall,
    props.size === "medium" && buttonStyles.value.iconMedium,
    props.size === "large" && buttonStyles.value.iconLarge,
  ),
);

function handleClick(event: MouseEvent) {
  if (props.disabled) {
    event.preventDefault();
    event.stopPropagation();
    return;
  }
  emit("click", event);
}

const rootRef = ref<HTMLElement | null>(null);
defineExpose({ el: rootRef });
</script>

<template>
  <component
    :is="as"
    ref="rootRef"
    :class="rootClass"
    :disabled="disabled && !disabledFocusable ? true : undefined"
    :aria-disabled="disabledFocusable ? 'true' : undefined"
    :aria-haspopup="'menu'"
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
    <span :class="menuButtonStyles.chevron"><ChevronDown16Regular /></span>
  </component>
</template>
