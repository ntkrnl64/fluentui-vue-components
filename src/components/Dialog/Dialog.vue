<script setup lang="ts">
import { provide, ref, watch } from "vue";
import { DialogContextKey } from "./context";
import { useId } from "../../composables/useId";

export interface DialogProps {
  open?: boolean | null;
  modalType?: "modal" | "non-modal" | "alert";
}

const props = withDefaults(defineProps<DialogProps>(), {
  open: null,
  modalType: "modal",
});

const emit = defineEmits<{ "update:open": [value: boolean] }>();

const internalOpen = ref(false);

watch(
  () => props.open,
  (val) => {
    if (val !== null) internalOpen.value = val;
  },
  { immediate: true },
);

function setOpen(val: boolean) {
  internalOpen.value = val;
  emit("update:open", val);
}

const dialogId = useId("fui-dialog-");
const titleId = `${dialogId}-title`;

provide(DialogContextKey, {
  open: internalOpen,
  setOpen,
  modalType: props.modalType,
  dialogId,
  titleId,
});
</script>

<template>
  <slot />
</template>
