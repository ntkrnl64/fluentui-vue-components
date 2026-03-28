<script setup lang="ts">
import { provide, ref, computed } from "vue";
import type { Ref } from "vue";
import { usePositioning } from "../../composables/usePositioning";
import { useOnClickOutside } from "../../composables/useOnClickOutside";
import type { PositioningShorthand } from "../../composables/usePositioning";
import { TeachingPopoverContextKey } from "./context";

export interface TeachingPopoverProps {
  position?: PositioningShorthand;
  open?: boolean;
}

const props = withDefaults(defineProps<TeachingPopoverProps>(), {
  position: "below",
});
const emit = defineEmits<{ "update:open": [boolean] }>();

const internalOpen = ref(props.open ?? false);
const isOpen = computed({
  get: () => (props.open !== undefined ? props.open : internalOpen.value),
  set: (val) => {
    internalOpen.value = val;
    emit("update:open", val);
  },
});

const currentPage = ref(0);
const totalPages = ref(1);

const { triggerRef, contentRef, contentStyles } = usePositioning(
  computed(() => ({ position: props.position, offset: 8 })),
);

useOnClickOutside(
  contentRef,
  () => {
    if (isOpen.value) isOpen.value = false;
  },
  computed(() => !isOpen.value),
);

provide(TeachingPopoverContextKey, {
  open: isOpen,
  setOpen: (val) => {
    isOpen.value = val;
  },
  triggerRef,
  contentRef,
  contentStyles: contentStyles as unknown as Ref<Record<string, string>>,
  currentPage,
  totalPages,
  nextPage: () => {
    if (currentPage.value < totalPages.value - 1) currentPage.value++;
  },
  prevPage: () => {
    if (currentPage.value > 0) currentPage.value--;
  },
});
</script>

<template>
  <slot />
</template>
