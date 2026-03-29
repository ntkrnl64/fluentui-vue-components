<script setup lang="ts">
import { inject, ref, onMounted, onUpdated } from "vue";
import { PopoverContextKey } from "./context";

const ctx = inject(PopoverContextKey)!;
const wrapperRef = ref<HTMLElement | null>(null);

function syncTriggerRef() {
  if (wrapperRef.value) {
    const firstChild = wrapperRef.value.firstElementChild as HTMLElement | null;
    ctx.triggerRef.value = firstChild ?? wrapperRef.value;
  }
}

function handleClick() {
  if (!ctx.openOnContext) {
    ctx.toggleOpen();
  }
}

function handleContextMenu(event: MouseEvent) {
  if (ctx.openOnContext) {
    event.preventDefault();
    if (ctx.contextMousePosition) {
      ctx.contextMousePosition.value = { x: event.clientX, y: event.clientY };
    }
    ctx.setOpen(true);
  }
}

onMounted(syncTriggerRef);
onUpdated(syncTriggerRef);
</script>

<template>
  <span
    ref="wrapperRef"
    style="display: contents"
    @click="handleClick"
    @contextmenu="handleContextMenu"
  >
    <slot />
  </span>
</template>
