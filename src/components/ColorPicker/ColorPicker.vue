<script setup lang="ts">
import { provide, ref, computed } from "vue";
import {
  useResetStyles,
  mergeClasses,
  makeResetStyles,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";
import { ColorPickerContextKey } from "./context";

export interface ColorPickerProps {
  shape?: "square" | "rounded";
}

const props = withDefaults(defineProps<ColorPickerProps>(), {
  shape: "rounded",
});
defineOptions({ inheritAttrs: false });

const color = ref({ h: 0, s: 100, v: 100, a: 1 });
const emit = defineEmits<{
  change: [{ h: number; s: number; v: number; a: number }];
}>();

function setColor(update: { h?: number; s?: number; v?: number; a?: number }) {
  color.value = { ...color.value, ...update };
  emit("change", color.value);
}

const useBaseClass = makeResetStyles({
  display: "flex",
  flexDirection: "column",
  gap: tokens.spacingVerticalM,
});

const baseClassName = useResetStyles(useBaseClass);

provide(ColorPickerContextKey, { color, setColor });
</script>

<template>
  <div :class="mergeClasses('fui-ColorPicker', baseClassName)" v-bind="$attrs">
    <slot />
  </div>
</template>
