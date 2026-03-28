<script setup lang="ts">
import { inject, ref, onMounted, onUnmounted } from "vue";
import { OverflowContextKey } from "./context";

export interface OverflowItemProps {
  id: string;
  priority?: number;
}

const props = withDefaults(defineProps<OverflowItemProps>(), { priority: 0 });
const ctx = inject(OverflowContextKey)!;
const itemRef = ref<HTMLElement | null>(null);

onMounted(() => {
  if (itemRef.value) ctx.registerItem(props.id, itemRef.value, props.priority);
});
onUnmounted(() => {
  ctx.unregisterItem(props.id);
});
</script>

<template>
  <div ref="itemRef">
    <slot />
  </div>
</template>
