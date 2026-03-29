<script setup lang="ts">
import {
  provide,
  ref,
  computed,
  watch,
  nextTick,
  onMounted,
  onUnmounted,
} from "vue";
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
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  size as sizeMiddleware,
} from "@floating-ui/vue";
import { useId } from "../../composables/useId";
import { ComboboxContextKey } from "./context";
import type { ComboboxAppearance, ComboboxSize } from "./context";

// --- Key action mapper (port of React's getDropdownActionFromKey) ---
type DropdownAction =
  | "Close"
  | "CloseSelect"
  | "First"
  | "Last"
  | "Next"
  | "None"
  | "Open"
  | "PageDown"
  | "PageUp"
  | "Previous"
  | "Select"
  | "Tab"
  | "Type";

function getActionFromKey(
  e: KeyboardEvent,
  openState: boolean,
  multi: boolean,
): DropdownAction {
  const { key, altKey, ctrlKey, metaKey } = e;
  if (key.length === 1 && key !== " " && !altKey && !ctrlKey && !metaKey)
    return "Type";
  if (!openState) {
    if (
      key === "ArrowDown" ||
      key === "ArrowUp" ||
      key === "Enter" ||
      key === " "
    )
      return "Open";
    return "None";
  }
  if (
    (key === "ArrowUp" && altKey) ||
    key === "Enter" ||
    (!multi && key === " ")
  )
    return "CloseSelect";
  if (multi && key === " ") return "Select";
  if (key === "Escape") return "Close";
  if (key === "ArrowDown") return "Next";
  if (key === "ArrowUp") return "Previous";
  if (key === "Home") return "First";
  if (key === "End") return "Last";
  if (key === "PageUp") return "PageUp";
  if (key === "PageDown") return "PageDown";
  if (key === "Tab") return "Tab";
  return "None";
}

// --- Props ---
export interface ComboboxProps {
  appearance?: ComboboxAppearance;
  size?: ComboboxSize;
  disabled?: boolean;
  placeholder?: string;
  multiselect?: boolean;
  freeform?: boolean;
}

const props = withDefaults(defineProps<ComboboxProps>(), {
  appearance: "outline",
  size: "medium",
  disabled: false,
  multiselect: false,
  freeform: false,
});

defineOptions({ inheritAttrs: false });
const modelValue = defineModel<string | string[]>({ default: "" });

// --- Refs ---
const listboxId = useId("fui-combobox-listbox-");
const open = ref(false);
const inputValue = ref("");
const activeDescendant = ref("");
const triggerRef = ref<HTMLElement | null>(null);
const listboxRef = ref<HTMLElement | null>(null);
const rootRef = ref<HTMLElement | null>(null);
const hasFocus = ref(false);

// --- Floating-UI positioning ---
const middleware = computed(() => [
  offset(2),
  flip({ fallbackPlacements: ["top-start"] }),
  shift({ padding: 8 }),
  sizeMiddleware({
    apply({ rects, elements }) {
      Object.assign(elements.floating.style, {
        minWidth: `${rects.reference.width}px`,
      });
    },
  }),
]);
const { floatingStyles } = useFloating(triggerRef, listboxRef, {
  placement: "bottom-start",
  middleware,
  whileElementsMounted: autoUpdate,
});

// --- Option registry (value -> display text) ---
const optionTextMap = new Map<string, string>();
function registerOption(value: string, text: string) {
  optionTextMap.set(value, text);
}
function getOptionText(value: string): string {
  return optionTextMap.get(value) ?? value;
}

// --- Selection ---
const selectedValues = computed<string[]>({
  get() {
    const v = modelValue.value;
    return Array.isArray(v) ? v : v ? [v] : [];
  },
  set(vals) {
    modelValue.value = props.multiselect ? vals : (vals[0] ?? "");
  },
});

function selectOption(value: string) {
  if (props.multiselect) {
    const cur = [...selectedValues.value];
    const i = cur.indexOf(value);
    if (i >= 0) cur.splice(i, 1);
    else cur.push(value);
    selectedValues.value = cur;
  } else {
    selectedValues.value = [value];
    inputValue.value = getOptionText(value);
  }
}
function isSelected(value: string) {
  return selectedValues.value.includes(value);
}

// --- Open state ---
function setOpen(val: boolean) {
  if (props.disabled) return;
  open.value = val;
  if (!val) {
    activeDescendant.value = "";
    if (!props.freeform) {
      inputValue.value =
        !props.multiselect && selectedValues.value.length > 0
          ? getOptionText(selectedValues.value[0])
          : "";
    }
  }
}

// --- Active descendant navigation ---
function getOptions(): HTMLElement[] {
  return listboxRef.value
    ? Array.from(
        listboxRef.value.querySelectorAll<HTMLElement>(
          '[role="option"]:not([aria-disabled="true"])',
        ),
      )
    : [];
}
function getActiveIndex(): number {
  if (!activeDescendant.value) return -1;
  return getOptions().findIndex((el) => el.id === activeDescendant.value);
}
function focusAt(index: number) {
  const opts = getOptions();
  if (!opts.length) return;
  const el = opts[Math.max(0, Math.min(index, opts.length - 1))];
  if (el) {
    activeDescendant.value = el.id;
    el.scrollIntoView?.({ block: "nearest" });
  }
}
function adFirst() {
  focusAt(0);
}
function adLast() {
  focusAt(getOptions().length - 1);
}
function adNext() {
  const i = getActiveIndex();
  focusAt(i >= 0 ? i + 1 : 0);
}
function adPrev() {
  const i = getActiveIndex();
  focusAt(i > 0 ? i - 1 : 0);
}
function adPageDown() {
  for (let i = 0; i < 10; i++) adNext();
}
function adPageUp() {
  for (let i = 0; i < 10; i++) adPrev();
}
function getActiveOption(): { value: string; disabled: boolean } | null {
  if (!activeDescendant.value || !listboxRef.value) return null;
  const el = listboxRef.value.querySelector<HTMLElement>(
    `#${CSS.escape(activeDescendant.value)}`,
  );
  if (!el) return null;
  return {
    value: el.getAttribute("data-value") ?? el.textContent?.trim() ?? "",
    disabled: el.getAttribute("aria-disabled") === "true",
  };
}
function setActiveDescendant(id: string) {
  activeDescendant.value = id;
}

// When open changes, focus selected or first option
watch(open, (isOpen) => {
  if (isOpen) {
    nextTick(() => {
      if (!props.multiselect && selectedValues.value.length > 0) {
        const sel = listboxRef.value?.querySelector<HTMLElement>(
          `[data-value="${CSS.escape(selectedValues.value[0])}"]`,
        );
        if (sel?.id) {
          activeDescendant.value = sel.id;
          sel.scrollIntoView?.({ block: "nearest" });
          return;
        }
      }
      adFirst();
    });
  } else {
    activeDescendant.value = "";
  }
});

// --- Event handlers (matching React's useTriggerSlot + useInputTriggerSlot) ---

// Trigger blur closes dropdown. mousedown.prevent on listbox/expandIcon prevents blur when clicking them.
function handleTriggerBlur() {
  setOpen(false);
  hasFocus.value = false;
}

function handleTriggerFocus(event: FocusEvent) {
  if (event.target === event.currentTarget) hasFocus.value = true;
}

// Trigger click toggles open
function handleTriggerClick() {
  if (!props.disabled) setOpen(!open.value);
}

function handleInputInput(event: Event) {
  inputValue.value = (event.target as HTMLInputElement).value;
  if (!open.value) setOpen(true);
}

// Expand icon: mousedown.prevent + toggle + refocus trigger
function handleExpandIconMouseDown(event: MouseEvent) {
  event.preventDefault();
  setOpen(!open.value);
  (triggerRef.value as HTMLInputElement | null)?.focus();
}

// Listbox mousedown.prevent prevents trigger blur; click refocuses trigger
function handleListboxMouseDown(event: MouseEvent) {
  event.preventDefault();
}
function handleListboxClick() {
  (triggerRef.value as HTMLInputElement | null)?.focus();
}

// Keyboard handling (port of React's useTriggerKeydown + useInputTriggerSlot keydown)
function handleKeydown(event: KeyboardEvent) {
  const action = getActionFromKey(event, open.value, props.multiselect);
  const activeOpt = getActiveOption();

  // Prevent default for navigation/selection actions
  switch (action) {
    case "First":
    case "Last":
    case "Next":
    case "Previous":
    case "PageDown":
    case "PageUp":
    case "Open":
    case "Close":
    case "CloseSelect":
    case "Select":
      event.preventDefault();
      break;
  }

  switch (action) {
    case "Open":
      setOpen(true);
      break;
    case "Close":
      event.stopPropagation();
      setOpen(false);
      break;
    case "First":
      adFirst();
      break;
    case "Last":
      adLast();
      break;
    case "Next":
      adNext();
      break;
    case "Previous":
      adPrev();
      break;
    case "PageDown":
      adPageDown();
      break;
    case "PageUp":
      adPageUp();
      break;
    case "CloseSelect":
      if (activeOpt && !activeOpt.disabled) {
        selectOption(activeOpt.value);
        if (!props.multiselect) setOpen(false);
      }
      break;
    case "Select":
      if (activeOpt && !activeOpt.disabled) selectOption(activeOpt.value);
      break;
    case "Tab":
      if (!props.multiselect && activeOpt && !activeOpt.disabled)
        selectOption(activeOpt.value);
      // Don't preventDefault - let Tab proceed naturally, blur handler will close
      break;
    case "Type":
      // For freeform combobox, open on typing if closed
      if (!open.value) setOpen(true);
      break;
  }
}

// Click outside (backup for cases where blur doesn't fire, e.g. clicking on iframe)
function handleOutsideClick(event: MouseEvent) {
  const t = event.target as Node;
  if (rootRef.value?.contains(t) || listboxRef.value?.contains(t)) return;
  setOpen(false);
}
onMounted(() =>
  document.addEventListener("mousedown", handleOutsideClick, true),
);
onUnmounted(() =>
  document.removeEventListener("mousedown", handleOutsideClick, true),
);

// Sync inputValue with selected for single-select
watch(
  selectedValues,
  (vals) => {
    if (!props.multiselect && vals.length > 0)
      inputValue.value = getOptionText(vals[0]);
  },
  { immediate: true },
);

// --- Styles ---
const useBaseClass = makeResetStyles({
  display: "inline-flex",
  alignItems: "center",
  flexWrap: "nowrap",
  minWidth: "250px",
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
    borderBottomLeftRadius: tokens.borderRadiusMedium,
    borderBottomRightRadius: tokens.borderRadiusMedium,
    borderBottom: `2px solid ${tokens.colorCompoundBrandStroke}`,
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

const useComboboxStyles = makeStyles({
  input: {
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
    "::placeholder": { color: tokens.colorNeutralForeground4 },
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
    color: tokens.colorNeutralStrokeAccessible,
    fontSize: "12px",
    boxSizing: "border-box",
    flexShrink: 0,
    border: "none",
    backgroundColor: "transparent",
    padding: "0",
    cursor: "pointer",
  },
  listbox: {
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow16,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    border: `${tokens.strokeWidthThin} solid ${tokens.colorTransparentStroke}`,
    ...shorthands.padding(tokens.spacingVerticalXS, "0"),
    maxHeight: "80vh",
    overflowY: "auto",
    zIndex: 1000000,
  },
});

const baseClassName = useResetStyles(useBaseClass);
const styles = useStyles(useComboboxStyles);
const rootClass = computed(() =>
  mergeClasses(
    "fui-Combobox",
    baseClassName.value,
    styles.value[props.appearance],
    styles.value[props.size],
    props.disabled && styles.value.disabled,
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
  registerOption,
  getOptionText,
});
</script>

<template>
  <div ref="rootRef" :class="rootClass" v-bind="$attrs">
    <input
      :ref="
        (el) => {
          triggerRef = el as HTMLElement;
        }
      "
      :class="styles.input"
      role="combobox"
      :aria-expanded="open"
      :aria-controls="open ? listboxId : undefined"
      :aria-activedescendant="activeDescendant || undefined"
      :aria-autocomplete="freeform ? 'list' : 'none'"
      :disabled="disabled"
      :placeholder="placeholder"
      :readonly="!freeform"
      :value="inputValue"
      @click="handleTriggerClick"
      @focus="handleTriggerFocus"
      @blur="handleTriggerBlur"
      @input="handleInputInput"
      @keydown="handleKeydown"
    />
    <span
      :class="styles.expandIcon"
      role="button"
      aria-hidden="true"
      :aria-expanded="open"
      :aria-disabled="disabled || undefined"
      @mousedown="handleExpandIconMouseDown"
    >
      <ChevronDown16Regular />
    </span>
    <Teleport to="body">
      <div
        v-if="open || hasFocus"
        v-show="open"
        :ref="
          (el) => {
            listboxRef = el as HTMLElement;
          }
        "
        :id="listboxId"
        role="listbox"
        :aria-multiselectable="multiselect || undefined"
        :class="styles.listbox"
        :style="floatingStyles"
        @mousedown="handleListboxMouseDown"
        @click="handleListboxClick"
      >
        <slot />
      </div>
    </Teleport>
  </div>
</template>
