<script setup lang="ts">
import { ref } from "vue";
import {
  useResetStyles,
  mergeClasses,
  makeResetStyles,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";

defineOptions({ inheritAttrs: false });
const emit = defineEmits<{ resize: [deltaX: number] }>();

const useBaseClass = makeResetStyles({
  position: "absolute",
  right: "0",
  top: "0",
  bottom: "0",
  width: "4px",
  cursor: "col-resize",
  backgroundColor: "transparent",
  touchAction: "none",
  zIndex: 1,
  ":hover": { backgroundColor: tokens.colorBrandStroke1 },
  ":active": { backgroundColor: tokens.colorBrandStroke1 },
});

const baseClassName = useResetStyles(useBaseClass);
const startX = ref(0);

function onPointerDown(event: PointerEvent) {
  startX.value = event.clientX;
  const target = event.currentTarget as HTMLElement;
  target.setPointerCapture(event.pointerId);
}

function onPointerMove(event: PointerEvent) {
  const target = event.currentTarget as HTMLElement;
  if (!target.hasPointerCapture(event.pointerId)) return;
  const deltaX = event.clientX - startX.value;
  emit("resize", deltaX);
  startX.value = event.clientX;
}

function onPointerUp(event: PointerEvent) {
  const target = event.currentTarget as HTMLElement;
  target.releasePointerCapture(event.pointerId);
}
</script>

<template>
  <div
    :class="mergeClasses('fui-TableResizeHandle', baseClassName)"
    role="separator"
    aria-orientation="vertical"
    v-bind="$attrs"
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
    @pointerup="onPointerUp"
  />
</template>
