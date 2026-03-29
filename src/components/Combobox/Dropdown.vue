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
import {
  ChevronDown16Regular,
  Dismiss16Regular,
} from "@ntkrnl64/fluentui-vue-icons";
import {
  useStyles,
  useResetStyles,
  mergeClasses,
  makeStyles,
  makeResetStyles,
  shorthands,
} from "@ntkrnl64/griffel-vue";
import { tokens, typographyStyles } from "@fluentui/react-theme";
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

// Icon size tokens matching React's internalTokens
const iconSizes = {
  small: "16px",
  medium: "20px",
  large: "24px",
};

// --- Key action mapper (exact port of React's getDropdownActionFromKey) ---
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

function getDropdownActionFromKey(
  e: KeyboardEvent,
  options: { open?: boolean; multiselect?: boolean } = {},
): DropdownAction {
  const { open = true, multiselect = false } = options;
  const { key, altKey, ctrlKey, metaKey } = e;

  // typing action occurs whether open or closed
  if (key.length === 1 && key !== " " && !altKey && !ctrlKey && !metaKey)
    return "Type";

  // handle opening the dropdown if closed
  if (!open) {
    if (
      key === "ArrowDown" ||
      key === "ArrowUp" ||
      key === "Enter" ||
      key === " "
    )
      return "Open";
    return "None";
  }

  // select or close actions
  if (
    (key === "ArrowUp" && altKey) ||
    key === "Enter" ||
    (!multiselect && key === " ")
  )
    return "CloseSelect";
  if (multiselect && key === " ") return "Select";
  if (key === "Escape") return "Close";

  // navigation interactions
  if (key === "ArrowDown") return "Next";
  if (key === "ArrowUp") return "Previous";
  if (key === "Home") return "First";
  if (key === "End") return "Last";
  if (key === "PageUp") return "PageUp";
  if (key === "PageDown") return "PageDown";
  if (key === "Tab") return "Tab";

  return "None";
}

/**
 * @returns whether every character in the string is the same
 */
function allCharactersSame(str: string): boolean {
  for (let i = 1; i < str.length; i++) {
    if (str[i] !== str[i - 1]) return false;
  }
  return true;
}

// --- Props ---
export interface DropdownProps {
  appearance?: ComboboxAppearance;
  size?: ComboboxSize;
  disabled?: boolean;
  placeholder?: string;
  multiselect?: boolean;
  clearable?: boolean;
  inlinePopup?: boolean;
}

const props = withDefaults(defineProps<DropdownProps>(), {
  appearance: "outline",
  size: "medium",
  disabled: false,
  multiselect: false,
  clearable: false,
  inlinePopup: false,
});

defineOptions({ inheritAttrs: false });
const modelValue = defineModel<string | string[]>({ default: "" });

const listboxId = useId("fui-dropdown-listbox-");
const open = ref(false);
const activeDescendant = ref("");
const triggerRef = ref<HTMLElement | null>(null);
const listboxRef = ref<HTMLElement | null>(null);
const rootRef = ref<HTMLElement | null>(null);
const hasFocus = ref(false);

// Type-to-find state (matching React's useButtonTriggerSlot)
let searchString = "";
let searchTimeout: ReturnType<typeof setTimeout> | null = null;

// Floating-UI positioning (matching React's useComboboxPositioning)
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

// --- Option registry (value -> display text, reactive for display computation) ---
const optionTextMap = ref(new Map<string, string>());
function registerOption(value: string, text: string) {
  optionTextMap.value = new Map(optionTextMap.value).set(value, text);
}
function getOptionText(value: string): string {
  return optionTextMap.value.get(value) ?? value;
}

// --- Selection (matching React's useSelection) ---
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
    const selectedIndex = selectedValues.value.indexOf(value);
    if (selectedIndex > -1) {
      selectedValues.value = [
        ...selectedValues.value.slice(0, selectedIndex),
        ...selectedValues.value.slice(selectedIndex + 1),
      ];
    } else {
      selectedValues.value = [...selectedValues.value, value];
    }
  } else {
    selectedValues.value = [value];
  }
}
function isSelected(value: string) {
  return selectedValues.value.includes(value);
}
function clearSelection() {
  selectedValues.value = [];
}

// --- Computed display value (matching React's useComboboxBaseState value computation) ---
const displayValue = computed(() => {
  if (selectedValues.value.length === 0) return undefined;
  if (props.multiselect) {
    return selectedValues.value.map((v) => getOptionText(v)).join(", ");
  }
  return getOptionText(selectedValues.value[0]);
});

const placeholderVisible = computed(
  () => !displayValue.value && !!props.placeholder,
);

const showClearButton = computed(
  () =>
    selectedValues.value.length > 0 &&
    !props.disabled &&
    props.clearable &&
    !props.multiselect,
);

// --- Open state (matching React's useComboboxBaseState setOpen) ---
function setOpen(val: boolean) {
  if (props.disabled) return;
  open.value = val;
  if (!val) {
    activeDescendant.value = "";
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
  if (i >= 0) {
    focusAt(i + 1);
  } else {
    adFirst();
  }
}
function adPrev() {
  const i = getActiveIndex();
  if (i > 0) {
    focusAt(i - 1);
  } else {
    adFirst();
  }
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

// --- Type-to-find: matching React's useButtonTriggerSlot ---
function moveToNextMatchingOption(
  matcher: (optionText: string) => boolean,
  startFromNext: boolean = false,
): boolean {
  const opts = getOptions();
  if (!opts.length) return false;

  const activeIdx = getActiveIndex();
  const startIdx = startFromNext
    ? activeIdx >= 0
      ? activeIdx + 1
      : 0
    : activeIdx >= 0
      ? activeIdx
      : 0;

  // Search from startIdx to end
  for (let i = startIdx; i < opts.length; i++) {
    const text =
      opts[i].getAttribute("data-value") ?? opts[i].textContent?.trim() ?? "";
    const optionText = getOptionText(text);
    if (matcher(optionText)) {
      activeDescendant.value = opts[i].id;
      opts[i].scrollIntoView?.({ block: "nearest" });
      return true;
    }
  }

  // Cycle back from beginning to startIdx
  for (let i = 0; i < startIdx; i++) {
    const text =
      opts[i].getAttribute("data-value") ?? opts[i].textContent?.trim() ?? "";
    const optionText = getOptionText(text);
    if (matcher(optionText)) {
      activeDescendant.value = opts[i].id;
      opts[i].scrollIntoView?.({ block: "nearest" });
      return true;
    }
  }

  return false;
}

function moveToNextMatchingOptionWithSameCharacterHandling() {
  if (
    moveToNextMatchingOption(
      (optionText) =>
        optionText.toLocaleLowerCase().indexOf(searchString) === 0,
      // Slowly pressing the same key will cycle through options
      searchString.length === 1,
    )
  ) {
    return;
  }

  // if there are no direct matches, check if the search is all the same letter, e.g. "aaa"
  if (
    allCharactersSame(searchString) &&
    moveToNextMatchingOption(
      (optionText) =>
        optionText.toLocaleLowerCase().indexOf(searchString[0]) === 0,
      // if the search is all the same letter, cycle through options starting with that letter
      true,
    )
  ) {
    return;
  }

  // No match found - blur active descendant
  activeDescendant.value = "";
}

// Focus selected/first when opening (matching React's useComboboxBaseState effect)
watch(open, (isOpen) => {
  if (isOpen) {
    nextTick(() => {
      // if it is single-select and there is a selected option, start at the selected option
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

// --- Event handlers ---
function handleTriggerBlur() {
  setOpen(false);
  hasFocus.value = false;
}
function handleTriggerFocus(event: FocusEvent) {
  if (event.target === event.currentTarget) hasFocus.value = true;
}
function handleTriggerClick() {
  if (!props.disabled) setOpen(!open.value);
}
function handleListboxMouseDown(event: MouseEvent) {
  event.preventDefault();
}
function handleListboxClick() {
  (triggerRef.value as HTMLButtonElement | null)?.focus();
}

function handleClearButtonClick(event: MouseEvent) {
  event.stopPropagation();
  clearSelection();
  (triggerRef.value as HTMLButtonElement | null)?.focus();
}
function handleClearButtonMouseDown(event: MouseEvent) {
  event.preventDefault();
}

// Keyboard handling (matching React's useTriggerSlot + useButtonTriggerSlot)
function handleKeydown(event: KeyboardEvent) {
  // Type-to-find handling (from useButtonTriggerSlot)
  if (searchTimeout !== null) {
    clearTimeout(searchTimeout);
    searchTimeout = null;
  }

  if (getDropdownActionFromKey(event) === "Type") {
    searchString += event.key.toLowerCase();
    searchTimeout = setTimeout(() => {
      searchString = "";
    }, 500);

    if (open.value) {
      moveToNextMatchingOptionWithSameCharacterHandling();
    }

    if (!open.value) setOpen(true);
    return;
  }

  // Standard keyboard handling (from useTriggerSlot)
  const action = getDropdownActionFromKey(event, {
    open: open.value,
    multiselect: props.multiselect,
  });
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
      // stop propagation for escape key to avoid dismissing any parent popups
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
      if (!props.multiselect && activeOpt && !activeOpt.disabled) {
        setOpen(false);
      }
      if (activeOpt && !activeOpt.disabled) {
        selectOption(activeOpt.value);
      }
      break;
    case "Select":
      if (activeOpt && !activeOpt.disabled) selectOption(activeOpt.value);
      break;
    case "Tab":
      if (!props.multiselect && activeOpt && !activeOpt.disabled)
        selectOption(activeOpt.value);
      break;
  }
}

// Click outside (matching React's useOnClickOutside)
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

// Close on option click for single-select (matching React's onOptionClick)
provide(ComboboxContextKey, {
  selectedValues,
  selectOption(value: string) {
    selectOption(value);
    if (!props.multiselect) {
      setOpen(false);
    }
  },
  isSelected,
  multiselect: props.multiselect,
  activeDescendant,
  setActiveDescendant,
  listboxId,
  registerOption,
  getOptionText,
});

// --- Styles (matching React's useDropdownStyles.styles.ts exactly) ---
const useRootStyles = makeStyles({
  root: {
    borderRadius: tokens.borderRadiusMedium,
    boxSizing: "border-box",
    display: "inline-flex",
    minWidth: "250px",
    position: "relative",
    verticalAlign: "middle",

    // windows high contrast mode focus indicator
    ":focus-within": {
      outlineWidth: "2px",
      outlineStyle: "solid",
      outlineColor: "transparent",
    },

    // bottom focus border, shared with Input, Select, and SpinButton
    "::after": {
      boxSizing: "border-box",
      content: '""',
      position: "absolute",
      left: "-1px",
      bottom: "-1px",
      right: "-1px",
      height: `max(${tokens.strokeWidthThick}, ${tokens.borderRadiusMedium})`,
      borderBottomLeftRadius: tokens.borderRadiusMedium,
      borderBottomRightRadius: tokens.borderRadiusMedium,
      borderBottom: `${tokens.strokeWidthThick} solid ${tokens.colorCompoundBrandStroke}`,
      clipPath: "inset(calc(100% - 2px) 0 0 0)",
      transform: "scaleX(0)",
      transitionProperty: "transform",
      transitionDuration: tokens.durationUltraFast,
      transitionDelay: tokens.curveAccelerateMid,

      "@media screen and (prefers-reduced-motion: reduce)": {
        transitionDuration: "0.01ms",
        transitionDelay: "0.01ms",
      },
    },
    ":focus-within::after": {
      transform: "scaleX(1)",
      transitionProperty: "transform",
      transitionDuration: tokens.durationNormal,
      transitionDelay: tokens.curveDecelerateMid,

      "@media screen and (prefers-reduced-motion: reduce)": {
        transitionDuration: "0.01ms",
        transitionDelay: "0.01ms",
      },
    },
    ":focus-within:active::after": {
      borderBottomColor: tokens.colorCompoundBrandStrokePressed,
    },
  },

  // appearance variants
  outline: {
    backgroundColor: tokens.colorNeutralBackground1,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
    borderBottomColor: tokens.colorNeutralStrokeAccessible,
  },
  outlineInteractive: {
    ":hover": {
      ...shorthands.borderColor(tokens.colorNeutralStroke1Hover),
      borderBottomColor: tokens.colorNeutralStrokeAccessibleHover,
    },
    ":active": {
      ...shorthands.borderColor(tokens.colorNeutralStroke1Pressed),
      borderBottomColor: tokens.colorNeutralStrokeAccessiblePressed,
    },
    ":focus-within": {
      ...shorthands.borderColor(tokens.colorNeutralStroke1Pressed),
      borderBottomColor: tokens.colorNeutralStrokeAccessiblePressed,
    },
  },
  underline: {
    backgroundColor: tokens.colorTransparentBackground,
    borderBottom: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStrokeAccessible}`,
    borderRadius: "0",
  },
  "filled-lighter": {
    backgroundColor: tokens.colorNeutralBackground1,
    border: `${tokens.strokeWidthThin} solid transparent`,
  },
  "filled-darker": {
    backgroundColor: tokens.colorNeutralBackground3,
    border: `${tokens.strokeWidthThin} solid transparent`,
  },
  disabled: {
    cursor: "not-allowed",
    backgroundColor: tokens.colorTransparentBackground,
    ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
    "@media (forced-colors: active)": {
      ...shorthands.borderColor("GrayText"),
    },
  },

  listbox: {
    boxSizing: "border-box",
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: `${tokens.shadow16}`,
    borderRadius: tokens.borderRadiusMedium,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorTransparentStroke}`,
    ...shorthands.padding(tokens.spacingVerticalXS, "0"),
    maxHeight: "80vh",
    overflowY: "auto",
    zIndex: 1000000,
  },
  listboxCollapsed: {
    display: "none",
  },
  inlineListbox: {
    zIndex: 1,
  },
});

const useButtonStyles = makeStyles({
  button: {
    alignItems: "center",
    backgroundColor: tokens.colorTransparentBackground,
    border: "none",
    boxSizing: "border-box",
    color: tokens.colorNeutralForeground1,
    columnGap: tokens.spacingHorizontalXXS,
    cursor: "pointer",
    display: "grid",
    fontFamily: tokens.fontFamilyBase,
    gridTemplateColumns: "[content] 1fr [icon] auto [end]",
    justifyContent: "space-between",
    textAlign: "left",
    width: "100%",

    ":focus": {
      outlineStyle: "none",
    },
  },
  placeholder: {
    color: tokens.colorNeutralForeground4,
  },
  // size variants
  small: {
    ...typographyStyles.caption1,
    padding: `3px ${tokens.spacingHorizontalSNudge} 3px calc(${tokens.spacingHorizontalSNudge} + ${tokens.spacingHorizontalXXS})`,
  },
  medium: {
    ...typographyStyles.body1,
    padding: `5px ${tokens.spacingHorizontalMNudge} 5px calc(${tokens.spacingHorizontalMNudge} + ${tokens.spacingHorizontalXXS})`,
  },
  large: {
    columnGap: tokens.spacingHorizontalSNudge,
    ...typographyStyles.body2,
    padding: `7px ${tokens.spacingHorizontalM} 7px calc(${tokens.spacingHorizontalM} + ${tokens.spacingHorizontalSNudge})`,
  },
  disabledText: {
    color: tokens.colorNeutralForegroundDisabled,
    cursor: "not-allowed",
  },
});

const useIconStyles = makeStyles({
  icon: {
    boxSizing: "border-box",
    color: tokens.colorNeutralStrokeAccessible,
    display: "block",
    fontSize: tokens.fontSizeBase500,
    gridColumnStart: "icon",
    gridColumnEnd: "end",
    "& svg": {
      display: "block",
    },
  },
  small: {
    fontSize: iconSizes.small,
    marginLeft: tokens.spacingHorizontalXXS,
  },
  medium: {
    fontSize: iconSizes.medium,
    marginLeft: tokens.spacingHorizontalXXS,
  },
  large: {
    fontSize: iconSizes.large,
    marginLeft: tokens.spacingHorizontalSNudge,
  },
  disabled: {
    color: tokens.colorNeutralForegroundDisabled,
  },
});

const useClearButtonStyles = makeResetStyles({
  alignSelf: "center",
  backgroundColor: tokens.colorTransparentBackground,
  border: "none",
  cursor: "pointer",
  height: "fit-content",
  margin: 0,
  marginRight: tokens.spacingHorizontalMNudge,
  padding: 0,
  position: "relative",
});

const useHiddenStyle = makeStyles({
  hidden: {
    display: "none",
  },
});

const rootStyles = useStyles(useRootStyles);
const buttonStyles = useStyles(useButtonStyles);
const iconStylesRef = useStyles(useIconStyles);
const clearButtonBaseClass = useResetStyles(useClearButtonStyles);
const hiddenStyles = useStyles(useHiddenStyle);

const rootClass = computed(() =>
  mergeClasses(
    "fui-Dropdown",
    rootStyles.value.root,
    rootStyles.value[props.appearance],
    !props.disabled &&
      props.appearance === "outline" &&
      rootStyles.value.outlineInteractive,
    props.disabled && rootStyles.value.disabled,
  ),
);

const buttonClass = computed(() =>
  mergeClasses(
    "fui-Dropdown__button",
    buttonStyles.value.button,
    buttonStyles.value[props.size],
    placeholderVisible.value && buttonStyles.value.placeholder,
    props.disabled && buttonStyles.value.disabledText,
  ),
);

const expandIconClass = computed(() =>
  mergeClasses(
    "fui-Dropdown__expandIcon",
    iconStylesRef.value.icon,
    iconStylesRef.value[props.size],
    props.disabled && iconStylesRef.value.disabled,
    showClearButton.value && hiddenStyles.value.hidden,
  ),
);

const clearButtonClass = computed(() =>
  mergeClasses(
    "fui-Dropdown__clearButton",
    clearButtonBaseClass.value,
    iconStylesRef.value.icon,
    iconStylesRef.value[props.size],
    props.disabled && iconStylesRef.value.disabled,
    !showClearButton.value && hiddenStyles.value.hidden,
  ),
);

const listboxClass = computed(() =>
  mergeClasses(
    "fui-Dropdown__listbox",
    rootStyles.value.listbox,
    props.inlinePopup && rootStyles.value.inlineListbox,
    !open.value && rootStyles.value.listboxCollapsed,
  ),
);
</script>

<template>
  <div
    ref="rootRef"
    :class="rootClass"
    :aria-owns="!inlinePopup && open ? listboxId : undefined"
    v-bind="$attrs"
  >
    <button
      :ref="
        (el) => {
          triggerRef = el as HTMLElement;
        }
      "
      :class="buttonClass"
      type="button"
      role="combobox"
      :aria-expanded="open"
      :aria-controls="open ? listboxId : undefined"
      :aria-activedescendant="activeDescendant || undefined"
      :disabled="disabled"
      :tabindex="disabled ? undefined : 0"
      @click="handleTriggerClick"
      @focus="handleTriggerFocus"
      @blur="handleTriggerBlur"
      @keydown="handleKeydown"
    >
      {{ displayValue || placeholder }}
      <span :class="expandIconClass" aria-hidden="true">
        <ChevronDown16Regular />
      </span>
    </button>
    <button
      v-if="clearable && !multiselect"
      :class="clearButtonClass"
      :tabindex="showClearButton ? 0 : undefined"
      type="button"
      aria-label="Clear selection"
      @click="handleClearButtonClick"
      @mousedown="handleClearButtonMouseDown"
    >
      <Dismiss16Regular />
    </button>
    <Teleport v-if="!inlinePopup" to="body">
      <div
        v-if="open || hasFocus"
        :ref="
          (el) => {
            listboxRef = el as HTMLElement;
          }
        "
        :id="listboxId"
        role="listbox"
        :aria-multiselectable="multiselect || undefined"
        :class="listboxClass"
        :style="floatingStyles"
        @mousedown="handleListboxMouseDown"
        @click="handleListboxClick"
      >
        <slot />
      </div>
    </Teleport>
    <div
      v-if="inlinePopup && (open || hasFocus)"
      :ref="
        (el) => {
          listboxRef = el as HTMLElement;
        }
      "
      :id="listboxId"
      role="listbox"
      :aria-multiselectable="multiselect || undefined"
      :class="listboxClass"
      @mousedown="handleListboxMouseDown"
      @click="handleListboxClick"
    >
      <slot />
    </div>
  </div>
</template>
