<script setup lang="ts">
import { computed, useSlots, ref } from "vue";
import { useStyles, useResetStyles, mergeClasses } from "@ntkrnl64/griffel-vue";
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
const styles = useStyles(useButtonStyles);
const baseClassName = useResetStyles(useButtonBaseClassName);

const hasIcon = computed(() => !!slots.icon);
const iconOnly = computed(() => hasIcon.value && !slots.default);

const rootClass = computed(() =>
  mergeClasses(
    "fui-Button",
    baseClassName.value,
    styles.value[props.size],
    props.appearance !== "secondary" && styles.value[props.appearance],
    props.shape === "circular" && styles.value.circular,
    props.shape === "square" && styles.value.square,
    (props.disabled || props.disabledFocusable) && styles.value.disabled,
    iconOnly.value && styles.value.iconOnly,
    iconOnly.value && props.size === "small" && styles.value.iconOnlySmall,
    iconOnly.value && props.size === "large" && styles.value.iconOnlyLarge,
  ),
);

const iconClass = computed(() =>
  mergeClasses(
    styles.value.icon,
    props.size === "small" && styles.value.iconSmall,
    props.size === "medium" && styles.value.iconMedium,
    props.size === "large" && styles.value.iconLarge,
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
  </component>
</template>
