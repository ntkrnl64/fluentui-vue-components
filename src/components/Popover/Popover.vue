<script setup lang="ts">
import { provide, ref, computed, watch, type Ref } from "vue";
import { useOnClickOutside } from "../../composables/useOnClickOutside";
import type { PositioningShorthand } from "../../composables/usePositioning";
import { PopoverContextKey } from "./context";

export type PopoverSize = "small" | "medium" | "large";

export interface PopoverProps {
  position?: PositioningShorthand;
  offset?: number | { mainAxis?: number; crossAxis?: number };
  trapFocus?: boolean;
  withArrow?: boolean;
  inline?: boolean;
  closeOnScroll?: boolean;
  openOnHover?: boolean;
  openOnContext?: boolean;
  mouseLeaveDelay?: number;
  /** Use null default to distinguish "not passed" from "false" (Vue coerces boolean props to false) */
  open?: boolean | null;
}

const props = withDefaults(defineProps<PopoverProps>(), {
  position: "below",
  trapFocus: false,
  withArrow: false,
  inline: false,
  closeOnScroll: false,
  openOnHover: false,
  openOnContext: false,
  mouseLeaveDelay: 500,
  open: null,
});

defineOptions({ inheritAttrs: false });

const emit = defineEmits<{
  "update:open": [value: boolean];
}>();

// Use null to detect "prop not passed" vs "prop is false"
const internalOpen = ref(false);

// Sync from controlled prop
watch(
  () => props.open,
  (val) => {
    if (val !== null) internalOpen.value = val;
  },
  { immediate: true },
);

function toggleOpen() {
  const next = !internalOpen.value;
  internalOpen.value = next;
  emit("update:open", next);
}

function setOpen(value: boolean) {
  internalOpen.value = value;
  emit("update:open", value);
}

const triggerRef = ref<HTMLElement | null>(null);
const contentRef = ref<HTMLElement | null>(null);
const arrowRef = ref<HTMLElement | null>(null);
const contextMousePosition: Ref<{ x: number; y: number } | null> = ref(null);

useOnClickOutside(
  contentRef,
  (event) => {
    if (triggerRef.value?.contains(event.target as Node)) return;
    if (internalOpen.value) setOpen(false);
  },
  computed(() => !internalOpen.value),
);

provide(PopoverContextKey, {
  open: internalOpen,
  toggleOpen,
  setOpen,
  triggerRef,
  contentRef,
  arrowRef,
  position: computed(() => props.position),
  offset: computed(() =>
    props.withArrow ? (props.offset ?? 8) : (props.offset ?? 4),
  ),
  trapFocus: props.trapFocus,
  withArrow: props.withArrow,
  inline: props.inline,
  openOnContext: props.openOnContext,
  contextMousePosition,
});
</script>

<template>
  <slot />
</template>
