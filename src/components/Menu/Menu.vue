<script setup lang="ts">
import { provide, ref, computed, watch } from "vue";
import { useOnClickOutside } from "../../composables/useOnClickOutside";
import type { PositioningShorthand } from "../../composables/usePositioning";
import { MenuContextKey } from "./context";

export interface MenuProps {
  open?: boolean | null;
  position?: PositioningShorthand;
  hasIcons?: boolean;
  hasCheckmarks?: boolean;
  checkedValues?: Record<string, string[]>;
}

const props = withDefaults(defineProps<MenuProps>(), {
  open: null,
  position: "below-end",
  hasIcons: false,
  hasCheckmarks: false,
});

const emit = defineEmits<{
  "update:open": [boolean];
  "update:checkedValues": [Record<string, string[]>];
}>();

const internalOpen = ref(false);

watch(
  () => props.open,
  (val) => {
    if (val !== null) internalOpen.value = val;
  },
  { immediate: true },
);

const internalCheckedValues = ref<Record<string, string[]>>(
  props.checkedValues ?? {},
);

const triggerRef = ref<HTMLElement | null>(null);
const contentRef = ref<HTMLElement | null>(null);

useOnClickOutside(
  contentRef,
  (event) => {
    if (triggerRef.value?.contains(event.target as Node)) return;
    if (internalOpen.value) {
      internalOpen.value = false;
      emit("update:open", false);
    }
  },
  computed(() => !internalOpen.value),
);

function setOpen(val: boolean) {
  internalOpen.value = val;
  emit("update:open", val);
}

function onCheckedValueChange(name: string, value: string) {
  const current = internalCheckedValues.value[name] ?? [];
  const idx = current.indexOf(value);
  const next =
    idx >= 0 ? current.filter((_, i) => i !== idx) : [...current, value];
  internalCheckedValues.value = {
    ...internalCheckedValues.value,
    [name]: next,
  };
  emit("update:checkedValues", internalCheckedValues.value);
}

provide(MenuContextKey, {
  open: internalOpen,
  setOpen,
  triggerRef,
  contentRef,
  position: computed(() => props.position),
  hasIcons: ref(props.hasIcons),
  hasCheckmarks: ref(props.hasCheckmarks),
  checkedValues: internalCheckedValues,
  onCheckedValueChange,
});
</script>

<template>
  <slot />
</template>
