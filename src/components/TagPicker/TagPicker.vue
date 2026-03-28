<script setup lang="ts">
import { provide, ref, computed } from "vue";
import type { Ref } from "vue";
import { usePositioning } from "../../composables/usePositioning";
import { useOnClickOutside } from "../../composables/useOnClickOutside";
import { TagPickerContextKey } from "./context";

export interface TagPickerProps {
  disabled?: boolean;
}

const props = withDefaults(defineProps<TagPickerProps>(), { disabled: false });
defineOptions({ inheritAttrs: false });

const selectedValues = defineModel<string[]>("selectedValues", {
  default: () => [],
});
const open = ref(false);

const { triggerRef, contentRef, contentStyles } = usePositioning(
  computed(() => ({ position: "below" as const, offset: 4 })),
);

useOnClickOutside(
  contentRef,
  () => {
    open.value = false;
  },
  computed(() => !open.value),
);

function addValue(value: string) {
  if (!selectedValues.value.includes(value)) {
    selectedValues.value = [...selectedValues.value, value];
  }
}

function removeValue(value: string) {
  selectedValues.value = selectedValues.value.filter((v) => v !== value);
}

provide(TagPickerContextKey, {
  selectedValues,
  addValue,
  removeValue,
  open,
  setOpen: (val) => {
    open.value = val;
  },
  inputRef: triggerRef,
  listRef: contentRef,
  listStyles: contentStyles as unknown as Ref<Record<string, string>>,
});
</script>

<template>
  <slot />
</template>
