<script setup lang="ts">
import { computed, useSlots, ref } from "vue";
import {
  useStyles,
  useResetStyles,
  mergeClasses,
  makeStyles,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";
import { useButtonStyles, useButtonBaseClassName } from "./Button.styles";
import type { CompoundButtonProps } from "./Button.types";

const props = withDefaults(defineProps<CompoundButtonProps>(), {
  appearance: "secondary",
  shape: "rounded",
  size: "medium",
  iconPosition: "before",
  disabled: false,
  disabledFocusable: false,
});

defineOptions({ inheritAttrs: false });

const emit = defineEmits<{ click: [event: MouseEvent] }>();
const slots = useSlots();

const useCompoundStyles = makeStyles({
  root: {
    height: "auto",
    ...({ "--fui-Button--textAlign": "left" } as Record<string, string>),
  },
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
  },
  secondaryContent: {
    lineHeight: "100%",
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightRegular,
    color: tokens.colorNeutralForeground2,
  },
});

const baseClassName = useResetStyles(useButtonBaseClassName);
const buttonStyles = useStyles(useButtonStyles);
const compoundStyles = useStyles(useCompoundStyles);

const hasIcon = computed(() => !!slots.icon);

const rootClass = computed(() =>
  mergeClasses(
    "fui-CompoundButton",
    baseClassName.value,
    buttonStyles.value[props.size],
    props.appearance !== "secondary" && buttonStyles.value[props.appearance],
    (props.disabled || props.disabledFocusable) && buttonStyles.value.disabled,
    compoundStyles.value.root,
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
  <button
    ref="rootRef"
    :class="rootClass"
    :disabled="disabled && !disabledFocusable ? true : undefined"
    :aria-disabled="disabledFocusable ? 'true' : undefined"
    v-bind="$attrs"
    @click="handleClick"
  >
    <span
      v-if="hasIcon && iconPosition === 'before'"
      :class="buttonStyles.icon"
    >
      <slot name="icon" />
    </span>
    <span :class="compoundStyles.contentContainer">
      <slot />
      <span v-if="secondaryContent" :class="compoundStyles.secondaryContent">
        {{ secondaryContent }}
      </span>
    </span>
    <span v-if="hasIcon && iconPosition === 'after'" :class="buttonStyles.icon">
      <slot name="icon" />
    </span>
  </button>
</template>
