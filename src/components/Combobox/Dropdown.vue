<script setup lang="ts">
import { provide, ref, computed, watch } from "vue";
import { ChevronDown16Regular } from "@ntkrnl64/fluentui-vue-icons";
import {
  useStyles,
  useResetStyles,
  mergeClasses,
  makeStyles,
  makeResetStyles,
  shorthands,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";
import { useId } from "../../composables/useId";
import { ComboboxContextKey } from "./context";
import type { ComboboxAppearance, ComboboxSize } from "./context";

export interface DropdownProps {
  appearance?: ComboboxAppearance;
  size?: ComboboxSize;
  disabled?: boolean;
  placeholder?: string;
  multiselect?: boolean;
}

const props = withDefaults(defineProps<DropdownProps>(), {
  appearance: "outline",
  size: "medium",
  disabled: false,
  multiselect: false,
});

defineOptions({ inheritAttrs: false });

const modelValue = defineModel<string | string[]>({ default: "" });

const listboxId = useId("fui-dropdown-listbox-");
const isOpen = ref(false);
const activeDescendant = ref("");
const triggerRef = ref<HTMLElement | null>(null);
const listboxRef = ref<HTMLElement | null>(null);

const selectedValues = computed<string[]>({
  get() {
    const val = modelValue.value;
    if (Array.isArray(val)) return val;
    return val ? [val] : [];
  },
  set(values: string[]) {
    if (props.multiselect) {
      modelValue.value = values;
    } else {
      modelValue.value = values[0] ?? "";
    }
  },
});

const displayText = computed(() => {
  if (selectedValues.value.length === 0) return "";
  if (props.multiselect) {
    return selectedValues.value.join(", ");
  }
  return selectedValues.value[0];
});

function selectOption(value: string) {
  if (props.multiselect) {
    const current = [...selectedValues.value];
    const index = current.indexOf(value);
    if (index >= 0) {
      current.splice(index, 1);
    } else {
      current.push(value);
    }
    selectedValues.value = current;
  } else {
    selectedValues.value = [value];
    isOpen.value = false;
  }
}

function isSelected(value: string): boolean {
  return selectedValues.value.includes(value);
}

function setActiveDescendant(id: string) {
  activeDescendant.value = id;
}

function handleTriggerClick() {
  if (!props.disabled) {
    isOpen.value = !isOpen.value;
  }
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === "Escape") {
    isOpen.value = false;
  } else if (event.key === "ArrowDown" && !isOpen.value) {
    isOpen.value = true;
  }
}

const useBaseClass = makeResetStyles({
  display: "inline-flex",
  alignItems: "center",
  flexWrap: "nowrap",
  gap: tokens.spacingHorizontalXXS,
  fontFamily: tokens.fontFamilyBase,
  ...shorthands.borderRadius(tokens.borderRadiusMedium),
  position: "relative",
  boxSizing: "border-box",
  "::after": {
    boxSizing: "border-box",
    content: '""',
    position: "absolute",
    left: "-1px",
    bottom: "-1px",
    right: "-1px",
    height: `max(2px, ${tokens.borderRadiusMedium})`,
    ...shorthands.borderRadius(
      `0 0 ${tokens.borderRadiusMedium} ${tokens.borderRadiusMedium}`,
    ),
    borderBottomWidth: tokens.strokeWidthThick,
    borderBottomStyle: "solid",
    borderBottomColor: tokens.colorCompoundBrandStroke,
    clipPath: "inset(calc(100% - 2px) 0 0 0)",
    transform: "scaleX(0)",
    transitionProperty: "transform",
    transitionDuration: tokens.durationUltraFast,
    transitionDelay: tokens.curveAccelerateMid,
  },
  ":focus-within::after": {
    transform: "scaleX(1)",
    transitionProperty: "transform",
    transitionDuration: tokens.durationNormal,
    transitionDelay: tokens.curveDecelerateMid,
  },
});

const useDropdownStyles = makeStyles({
  button: {
    flexGrow: 1,
    minWidth: 0,
    border: "none",
    padding: "0",
    color: tokens.colorNeutralForeground1,
    backgroundColor: "transparent",
    fontFamily: "inherit",
    fontSize: "inherit",
    lineHeight: "inherit",
    outlineStyle: "none",
    textAlign: "left",
    cursor: "pointer",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  placeholder: {
    color: tokens.colorNeutralForeground4,
  },
  outline: {
    backgroundColor: tokens.colorNeutralBackground1,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
    borderBottomColor: tokens.colorNeutralStrokeAccessible,
    ":hover": {
      ...shorthands.borderColor(tokens.colorNeutralStroke1Hover),
      borderBottomColor: tokens.colorNeutralStrokeAccessibleHover,
    },
  },
  underline: {
    backgroundColor: "transparent",
    borderBottom: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStrokeAccessible}`,
    borderTop: "none",
    borderLeft: "none",
    borderRight: "none",
    ...shorthands.borderRadius(0),
  },
  "filled-darker": {
    backgroundColor: tokens.colorNeutralBackground3,
    border: `${tokens.strokeWidthThin} solid transparent`,
  },
  "filled-lighter": {
    backgroundColor: tokens.colorNeutralBackground1,
    border: `${tokens.strokeWidthThin} solid transparent`,
  },
  small: {
    minHeight: "24px",
    ...shorthands.padding("0", tokens.spacingHorizontalS),
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
  },
  medium: {
    minHeight: "32px",
    ...shorthands.padding("0", tokens.spacingHorizontalMNudge),
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
  },
  large: {
    minHeight: "40px",
    ...shorthands.padding("0", tokens.spacingHorizontalM),
    fontSize: tokens.fontSizeBase400,
    lineHeight: tokens.lineHeightBase400,
  },
  disabled: {
    backgroundColor: tokens.colorTransparentBackground,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStrokeDisabled}`,
    color: tokens.colorNeutralForegroundDisabled,
    cursor: "not-allowed",
    "::after": { content: "unset" },
  },
  expandIcon: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: tokens.colorNeutralStrokeAccessible,
    fontSize: "12px",
    boxSizing: "border-box",
    flexShrink: 0,
    border: "none",
    backgroundColor: "transparent",
    padding: "0",
  },
  listbox: {
    position: "absolute",
    top: "100%",
    left: "0",
    right: "0",
    zIndex: 1000,
    backgroundColor: tokens.colorNeutralBackground1,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    boxShadow: tokens.shadow16,
    ...shorthands.padding(tokens.spacingVerticalXS, "0"),
    maxHeight: "300px",
    overflowY: "auto",
    marginTop: tokens.spacingVerticalXXS,
  },
});

const baseClassName = useResetStyles(useBaseClass);
const styles = useStyles(useDropdownStyles);

const rootClass = computed(() =>
  mergeClasses(
    "fui-Dropdown",
    baseClassName.value,
    styles.value[props.appearance],
    styles.value[props.size],
    props.disabled && styles.value.disabled,
  ),
);

const buttonClass = computed(() =>
  mergeClasses(
    styles.value.button,
    !displayText.value && styles.value.placeholder,
  ),
);

provide(ComboboxContextKey, {
  selectedValues,
  selectOption,
  isSelected,
  multiselect: props.multiselect,
  activeDescendant,
  setActiveDescendant,
  listboxId,
});
</script>

<template>
  <div :class="rootClass" v-bind="$attrs" @keydown="handleKeydown">
    <button
      ref="triggerRef"
      :class="buttonClass"
      type="button"
      role="combobox"
      :aria-expanded="isOpen"
      :aria-controls="listboxId"
      :aria-activedescendant="activeDescendant || undefined"
      :disabled="disabled"
      @click="handleTriggerClick"
    >
      {{ displayText || placeholder }}
    </button>
    <span :class="styles.expandIcon" aria-hidden="true"
      ><ChevronDown16Regular
    /></span>
    <div
      v-if="isOpen"
      ref="listboxRef"
      :id="listboxId"
      role="listbox"
      :aria-multiselectable="multiselect || undefined"
      :class="styles.listbox"
    >
      <slot />
    </div>
  </div>
</template>
