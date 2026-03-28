<script setup lang="ts">
import { inject, ref } from "vue";
import {
  makeResetStyles,
  useResetStyles,
  mergeClasses,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";
import { TagPickerContextKey } from "./context";

defineOptions({ inheritAttrs: false });
const ctx = inject(TagPickerContextKey)!;
const inputValue = ref("");

const useBaseClass = makeResetStyles({
  border: "none",
  outline: "none",
  flexGrow: 1,
  minWidth: "80px",
  fontFamily: tokens.fontFamilyBase,
  fontSize: tokens.fontSizeBase300,
  color: tokens.colorNeutralForeground1,
  backgroundColor: "transparent",
  padding: "0",
});

const baseClassName = useResetStyles(useBaseClass);

function onFocus() {
  ctx.setOpen(true);
}
function onInput(event: Event) {
  inputValue.value = (event.target as HTMLInputElement).value;
}
</script>

<template>
  <input
    :class="mergeClasses('fui-TagPickerInput', baseClassName)"
    :value="inputValue"
    placeholder="Select..."
    v-bind="$attrs"
    @focus="onFocus"
    @input="onInput"
  />
</template>
