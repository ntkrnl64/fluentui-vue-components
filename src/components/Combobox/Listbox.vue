<script setup lang="ts">
import { provide, computed } from "vue";
import {
  useResetStyles,
  mergeClasses,
  makeResetStyles,
  shorthands,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";
import { useId } from "../../composables/useId";
import { ComboboxContextKey } from "./context";
import { ref } from "vue";

export interface ListboxProps {
  multiselect?: boolean;
}

const props = withDefaults(defineProps<ListboxProps>(), {
  multiselect: false,
});

defineOptions({ inheritAttrs: false });

const modelValue = defineModel<string | string[]>({ default: "" });

const listboxId = useId("fui-listbox-");
const activeDescendant = ref("");

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
  }
}

function isSelected(value: string): boolean {
  return selectedValues.value.includes(value);
}

function setActiveDescendant(id: string) {
  activeDescendant.value = id;
}

const optionTextMap = new Map<string, string>();
function registerOption(value: string, text: string) {
  optionTextMap.set(value, text);
}
function getOptionText(value: string): string {
  return optionTextMap.get(value) ?? value;
}

const useBaseClass = makeResetStyles({
  display: "flex",
  flexDirection: "column",
  boxSizing: "border-box",
  fontFamily: tokens.fontFamilyBase,
  backgroundColor: tokens.colorNeutralBackground1,
  ...shorthands.padding(tokens.spacingVerticalXS, "0"),
  outlineStyle: "none",
});

const baseClassName = useResetStyles(useBaseClass);

const rootClass = computed(() =>
  mergeClasses("fui-Listbox", baseClassName.value),
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
  <div
    :id="listboxId"
    :class="rootClass"
    role="listbox"
    :aria-multiselectable="multiselect || undefined"
    tabindex="0"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>
