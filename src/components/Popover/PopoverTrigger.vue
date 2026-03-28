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

onMounted(syncTriggerRef);
onUpdated(syncTriggerRef);
</script>

<template>
  <span ref="wrapperRef" style="display: contents" @click="ctx.toggleOpen">
    <slot />
  </span>
</template>
