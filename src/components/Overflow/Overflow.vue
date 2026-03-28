<script setup lang="ts">
import { provide, ref, onMounted, onUnmounted, computed, nextTick } from "vue";
import {
  useResetStyles,
  mergeClasses,
  makeResetStyles,
} from "@ntkrnl64/griffel-vue";
import { OverflowContextKey } from "./context";

export interface OverflowProps {
  padding?: number;
  minimumVisible?: number;
}

const props = withDefaults(defineProps<OverflowProps>(), {
  padding: 8,
  minimumVisible: 0,
});
defineOptions({ inheritAttrs: false });

const containerRef = ref<HTMLElement | null>(null);
const items = ref(new Map<string, { el: HTMLElement; priority: number }>());
const overflowItems = ref<string[]>([]);
const hasOverflow = computed(() => overflowItems.value.length > 0);

let observer: ResizeObserver | null = null;

function recalculate() {
  if (!containerRef.value) return;
  const containerWidth = containerRef.value.offsetWidth - props.padding * 2;
  let usedWidth = 0;
  const newOverflow: string[] = [];

  const sorted = [...items.value.entries()].sort(
    (a, b) => a[1].priority - b[1].priority,
  );

  for (const [id, { el }] of sorted) {
    el.style.display = "";
    usedWidth += el.offsetWidth;
    if (
      usedWidth > containerWidth &&
      sorted.length - newOverflow.length > props.minimumVisible
    ) {
      newOverflow.push(id);
      el.style.display = "none";
    }
  }

  overflowItems.value = newOverflow;
}

onMounted(() => {
  observer = new ResizeObserver(() => recalculate());
  if (containerRef.value) observer.observe(containerRef.value);
});

onUnmounted(() => {
  observer?.disconnect();
});

function registerItem(id: string, el: HTMLElement, priority = 0) {
  items.value.set(id, { el, priority });
  nextTick(recalculate);
}

function unregisterItem(id: string) {
  items.value.delete(id);
  nextTick(recalculate);
}

const useBaseClass = makeResetStyles({
  display: "flex",
  flexWrap: "nowrap",
  overflow: "hidden",
  width: "100%",
});
const baseClassName = useResetStyles(useBaseClass);

provide(OverflowContextKey, {
  overflowItems,
  registerItem,
  unregisterItem,
  hasOverflow,
});
</script>

<template>
  <div
    ref="containerRef"
    :class="mergeClasses('fui-Overflow', baseClassName)"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>
