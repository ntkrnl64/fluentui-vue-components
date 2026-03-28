<script setup lang="ts">
import { inject } from "vue";
import { DialogContextKey } from "./context";

export interface DialogTriggerProps {
  action?: "open" | "close";
}

const props = withDefaults(defineProps<DialogTriggerProps>(), {
  action: "open",
});

const ctx = inject(DialogContextKey)!;

function handleClick() {
  ctx.setOpen(props.action === "open");
}
</script>

<template>
  <span @click="handleClick" style="display: contents">
    <slot />
  </span>
</template>
