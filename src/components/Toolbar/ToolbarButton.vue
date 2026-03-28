<script setup lang="ts">
import { computed, inject, useSlots, ref } from "vue";
import { useStyles, useResetStyles, mergeClasses } from "@ntkrnl64/griffel-vue";
import {
  useButtonStyles,
  useButtonBaseClassName,
} from "../Button/Button.styles";
import { ToolbarContextKey } from "./context";
import type { ButtonProps } from "../Button/Button.types";

interface ToolbarButtonProps extends /* @vue-ignore */ Omit<
  ButtonProps,
  "appearance"
> {
  appearance?: ButtonProps["appearance"];
}

const props = withDefaults(defineProps<ToolbarButtonProps>(), {
  appearance: "subtle",
  shape: "rounded",
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
const toolbarCtx = inject(ToolbarContextKey, undefined);

const resolvedSize = computed(() => props.size ?? toolbarCtx?.size ?? "medium");

const baseClassName = useResetStyles(useButtonBaseClassName);
const styles = useStyles(useButtonStyles);

const hasIcon = computed(() => !!slots.icon);
const iconOnly = computed(() => hasIcon.value && !slots.default);

const rootClass = computed(() =>
  mergeClasses(
    "fui-ToolbarButton",
    baseClassName.value,
    styles.value[resolvedSize.value],
    props.appearance !== "secondary" && styles.value[props.appearance],
    props.shape === "circular" && styles.value.circular,
    props.shape === "square" && styles.value.square,
    (props.disabled || props.disabledFocusable) && styles.value.disabled,
    iconOnly.value && styles.value.iconOnly,
    iconOnly.value &&
      resolvedSize.value === "small" &&
      styles.value.iconOnlySmall,
    iconOnly.value &&
      resolvedSize.value === "large" &&
      styles.value.iconOnlyLarge,
  ),
);

const iconClass = computed(() =>
  mergeClasses(
    styles.value.icon,
    resolvedSize.value === "small" && styles.value.iconSmall,
    resolvedSize.value === "medium" && styles.value.iconMedium,
    resolvedSize.value === "large" && styles.value.iconLarge,
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
