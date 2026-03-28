<script setup lang="ts">
import { computed, useSlots, ref } from "vue";
import { ChevronDown16Regular } from "@ntkrnl64/fluentui-vue-icons";
import {
  useStyles,
  useResetStyles,
  mergeClasses,
  makeStyles,
  shorthands,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";
import { useButtonStyles, useButtonBaseClassName } from "./Button.styles";
import type { SplitButtonProps } from "./Button.types";

const props = withDefaults(defineProps<SplitButtonProps>(), {
  appearance: "secondary",
  shape: "rounded",
  size: "medium",
  iconPosition: "before",
  disabled: false,
  disabledFocusable: false,
  menuButtonDisabled: false,
});

defineOptions({ inheritAttrs: false });

const emit = defineEmits<{
  click: [event: MouseEvent];
  menuButtonClick: [event: MouseEvent];
}>();

const slots = useSlots();
const baseClassName = useResetStyles(useButtonBaseClassName);
const buttonStyles = useStyles(useButtonStyles);

const useSplitStyles = makeStyles({
  root: {
    display: "inline-flex",
    alignItems: "stretch",
    position: "relative",
  },
  primaryButton: {
    borderTopRightRadius: "0",
    borderBottomRightRadius: "0",
    borderRightWidth: "0",
  },
  menuButton: {
    borderTopLeftRadius: "0",
    borderBottomLeftRadius: "0",
    minWidth: "auto",
    ...shorthands.padding("0", tokens.spacingHorizontalSNudge),
  },
  chevron: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    height: "16px",
    width: "16px",
    color: "currentColor",
  },
  divider: {
    width: tokens.strokeWidthThin,
    backgroundColor: tokens.colorNeutralStroke1,
    alignSelf: "stretch",
  },
  dividerPrimary: {
    backgroundColor: tokens.colorNeutralForegroundOnBrand,
    opacity: 0.4,
  },
});

const splitStyles = useStyles(useSplitStyles);

const hasIcon = computed(() => !!slots.icon);
const iconOnly = computed(() => hasIcon.value && !slots.default);

const primaryClass = computed(() =>
  mergeClasses(
    "fui-SplitButton__primaryAction",
    baseClassName.value,
    buttonStyles.value[props.size],
    props.appearance !== "secondary" && buttonStyles.value[props.appearance],
    (props.disabled || props.disabledFocusable) && buttonStyles.value.disabled,
    splitStyles.value.primaryButton,
  ),
);

const menuClass = computed(() =>
  mergeClasses(
    "fui-SplitButton__menuButton",
    baseClassName.value,
    buttonStyles.value[props.size],
    props.appearance !== "secondary" && buttonStyles.value[props.appearance],
    (props.menuButtonDisabled || props.disabled || props.disabledFocusable) &&
      buttonStyles.value.disabled,
    splitStyles.value.menuButton,
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

const dividerClass = computed(() =>
  mergeClasses(
    splitStyles.value.divider,
    props.appearance === "primary" && splitStyles.value.dividerPrimary,
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

function handleMenuClick(event: MouseEvent) {
  if (props.menuButtonDisabled || props.disabled) {
    event.preventDefault();
    event.stopPropagation();
    return;
  }
  emit("menuButtonClick", event);
}

const rootRef = ref<HTMLElement | null>(null);
defineExpose({ el: rootRef });
</script>

<template>
  <div
    ref="rootRef"
    :class="mergeClasses('fui-SplitButton', splitStyles.root)"
    v-bind="$attrs"
  >
    <button
      :class="primaryClass"
      :disabled="disabled && !disabledFocusable ? true : undefined"
      :aria-disabled="disabledFocusable ? 'true' : undefined"
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
    <span :class="dividerClass" />
    <button
      :class="menuClass"
      :disabled="
        (menuButtonDisabled || disabled) && !disabledFocusable
          ? true
          : undefined
      "
      :aria-disabled="disabledFocusable ? 'true' : undefined"
      aria-haspopup="menu"
      @click="handleMenuClick"
    >
      <span :class="splitStyles.chevron"><ChevronDown16Regular /></span>
    </button>
  </div>
</template>
