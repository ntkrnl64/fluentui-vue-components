<script setup lang="ts">
import { provide, ref, computed } from "vue";
import type { Ref } from "vue";
import {
  useResetStyles,
  mergeClasses,
  makeResetStyles,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";
import { SwatchPickerContextKey } from "./context";

export interface SwatchPickerProps {
  size?: "extra-small" | "small" | "medium" | "large";
  shape?: "rounded" | "square" | "circular";
  spacing?: "small" | "medium";
}

const props = withDefaults(defineProps<SwatchPickerProps>(), {
  size: "medium",
  shape: "rounded",
  spacing: "medium",
});
defineOptions({ inheritAttrs: false });
const selectedValue = defineModel<string>({ default: "" });

const useBaseClass = makeResetStyles({
  display: "flex",
  flexWrap: "wrap",
  gap: tokens.spacingHorizontalS,
});
const baseClassName = useResetStyles(useBaseClass);

provide(SwatchPickerContextKey, {
  selectedValue,
  selectValue: (val: string) => {
    selectedValue.value = val;
  },
  size: ref(props.size) as Ref<"extra-small" | "small" | "medium" | "large">,
  shape: ref(props.shape) as Ref<"rounded" | "square" | "circular">,
});
</script>

<template>
  <div
    :class="mergeClasses('fui-SwatchPicker', baseClassName)"
    role="radiogroup"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>
