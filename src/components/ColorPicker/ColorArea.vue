<script setup lang="ts">
import { inject, computed, ref, onMounted, onUnmounted } from "vue";
import {
  useResetStyles,
  mergeClasses,
  makeResetStyles,
  shorthands,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";
import { ColorPickerContextKey } from "./context";

defineOptions({ inheritAttrs: false });
const ctx = inject(ColorPickerContextKey)!;

const areaRef = ref<HTMLElement | null>(null);
const isDragging = ref(false);

const useBaseClass = makeResetStyles({
  position: "relative",
  width: "100%",
  height: "200px",
  ...shorthands.borderRadius(tokens.borderRadiusMedium),
  overflow: "hidden",
  cursor: "crosshair",
  userSelect: "none",
  touchAction: "none",
});

const baseClassName = useResetStyles(useBaseClass);

const bgStyle = computed(() => ({
  background: `linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, hsl(${ctx.color.value.h}, 100%, 50%))`,
}));

const thumbStyle = computed(() => ({
  position: "absolute" as const,
  left: `${ctx.color.value.s}%`,
  top: `${100 - ctx.color.value.v}%`,
  width: "16px",
  height: "16px",
  borderRadius: "50%",
  border: "2px solid white",
  boxShadow: "0 0 2px rgba(0,0,0,0.4)",
  transform: "translate(-50%, -50%)",
  pointerEvents: "none" as const,
}));

function updateFromEvent(event: MouseEvent | PointerEvent) {
  if (!areaRef.value) return;
  const rect = areaRef.value.getBoundingClientRect();
  const s = Math.max(
    0,
    Math.min(100, ((event.clientX - rect.left) / rect.width) * 100),
  );
  const v = Math.max(
    0,
    Math.min(100, 100 - ((event.clientY - rect.top) / rect.height) * 100),
  );
  ctx.setColor({ s, v });
}

function onPointerDown(event: PointerEvent) {
  isDragging.value = true;
  updateFromEvent(event);
  (event.target as HTMLElement).setPointerCapture(event.pointerId);
}

function onPointerMove(event: PointerEvent) {
  if (isDragging.value) updateFromEvent(event);
}

function onPointerUp() {
  isDragging.value = false;
}
</script>

<template>
  <div
    ref="areaRef"
    :class="mergeClasses('fui-ColorArea', baseClassName)"
    :style="bgStyle"
    v-bind="$attrs"
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
    @pointerup="onPointerUp"
  >
    <div :style="thumbStyle" />
  </div>
</template>
