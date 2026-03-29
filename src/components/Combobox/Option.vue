<script setup lang="ts">
import { computed, inject, onMounted, ref, watch, nextTick } from "vue";
import { Checkmark16Filled } from "@ntkrnl64/fluentui-vue-icons";
import {
  useStyles,
  useResetStyles,
  mergeClasses,
  makeStyles,
  makeResetStyles,
  shorthands,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";
import { ComboboxContextKey } from "./context";
import { useId } from "../../composables/useId";

export interface OptionProps {
  value: string;
  disabled?: boolean;
  text?: string;
}

const props = withDefaults(defineProps<OptionProps>(), { disabled: false });
defineOptions({ inheritAttrs: false });

const comboboxCtx = inject(ComboboxContextKey)!;
const optionId = useId("fui-option-");
const optionRef = ref<HTMLElement | null>(null);

const displayText = computed(() => props.text ?? props.value);

// Extract text from DOM slot content when text prop is not provided
// (matches React's useOption which extracts text from children)
function getRegistrationText(): string {
  if (props.text) return props.text;
  if (optionRef.value) {
    const el = optionRef.value;
    // Get text content excluding the check icon (first child span with aria-hidden)
    let text = "";
    for (const child of el.childNodes) {
      if (
        child instanceof HTMLElement &&
        child.getAttribute("aria-hidden") === "true"
      )
        continue;
      text += child.textContent ?? "";
    }
    const trimmed = text.trim();
    if (trimmed) return trimmed;
  }
  return props.value;
}

// Register this option's value->text mapping with the parent
onMounted(() => {
  nextTick(() => {
    comboboxCtx.registerOption(props.value, getRegistrationText());
  });
});
watch(
  () => [props.value, props.text],
  () => {
    nextTick(() => {
      comboboxCtx.registerOption(props.value, getRegistrationText());
    });
  },
);

const isSelected = computed(() => comboboxCtx.isSelected(props.value));
const isActive = computed(
  () => comboboxCtx.activeDescendant.value === optionId,
);

const useBaseClass = makeResetStyles({
  display: "flex",
  alignItems: "center",
  boxSizing: "border-box",
  ...shorthands.padding(
    tokens.spacingVerticalSNudge,
    tokens.spacingHorizontalS,
  ),
  columnGap: tokens.spacingHorizontalXS,
  fontFamily: tokens.fontFamilyBase,
  fontSize: tokens.fontSizeBase300,
  lineHeight: tokens.lineHeightBase300,
  color: tokens.colorNeutralForeground1,
  cursor: "pointer",
  outlineStyle: "none",
  ...shorthands.borderRadius(tokens.borderRadiusMedium),
  ":hover": {
    backgroundColor: tokens.colorNeutralBackground1Hover,
    color: tokens.colorNeutralForeground1Hover,
  },
  ":active": {
    backgroundColor: tokens.colorNeutralBackground1Pressed,
  },
});

const useOptionStyles = makeStyles({
  selected: {
    backgroundColor: tokens.colorNeutralBackground1Selected,
  },
  // Keyboard-focused (activeDescendant) highlight
  active: {
    backgroundColor: tokens.colorNeutralBackground1Hover,
    color: tokens.colorNeutralForeground1Hover,
  },
  disabled: {
    color: tokens.colorNeutralForegroundDisabled,
    cursor: "not-allowed",
    ":hover": {
      backgroundColor: "transparent",
      color: tokens.colorNeutralForegroundDisabled,
    },
  },
  checkIcon: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "16px",
    height: "16px",
    fontSize: "12px",
    flexShrink: 0,
    visibility: "hidden",
  },
  checkIconVisible: {
    visibility: "visible",
  },
});

const baseClassName = useResetStyles(useBaseClass);
const styles = useStyles(useOptionStyles);

const rootClass = computed(() =>
  mergeClasses(
    "fui-Option",
    baseClassName.value,
    isActive.value && !props.disabled && styles.value.active,
    isSelected.value && styles.value.selected,
    props.disabled && styles.value.disabled,
  ),
);

const checkClass = computed(() =>
  mergeClasses(
    styles.value.checkIcon,
    isSelected.value && styles.value.checkIconVisible,
  ),
);

function handleClick() {
  if (!props.disabled) {
    comboboxCtx.selectOption(props.value);
  }
}
</script>

<template>
  <div
    ref="optionRef"
    :id="optionId"
    :class="rootClass"
    role="option"
    :aria-selected="isSelected"
    :aria-disabled="disabled || undefined"
    :data-value="value"
    v-bind="$attrs"
    @click="handleClick"
  >
    <span :class="checkClass" aria-hidden="true"><Checkmark16Filled /></span>
    <slot>{{ displayText }}</slot>
  </div>
</template>
