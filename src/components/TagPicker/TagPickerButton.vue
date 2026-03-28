<script setup lang="ts">
import { inject } from "vue";
import { ChevronDown16Regular } from "@ntkrnl64/fluentui-vue-icons";
import {
  useResetStyles,
  mergeClasses,
  makeResetStyles,
  shorthands,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";
import { TagPickerContextKey } from "./context";

defineOptions({ inheritAttrs: false });
const ctx = inject(TagPickerContextKey)!;

const useBaseClass = makeResetStyles({
  display: "flex",
  alignItems: "center",
  flexGrow: 1,
  minWidth: "80px",
  fontFamily: tokens.fontFamilyBase,
  fontSize: tokens.fontSizeBase300,
  color: tokens.colorNeutralForeground1,
  backgroundColor: "transparent",
  border: "none",
  cursor: "pointer",
  outlineStyle: "none",
  ...shorthands.padding(
    tokens.spacingVerticalSNudge,
    tokens.spacingHorizontalS,
  ),
  ":focus-visible": {
    outlineColor: tokens.colorStrokeFocus2,
    outlineWidth: tokens.strokeWidthThick,
    outlineStyle: "solid",
    outlineOffset: "2px",
  },
});

const baseClassName = useResetStyles(useBaseClass);

function onClick() {
  ctx.setOpen(!ctx.open.value);
}
</script>

<template>
  <button
    :class="mergeClasses('fui-TagPickerButton', baseClassName)"
    type="button"
    :aria-expanded="ctx.open.value"
    v-bind="$attrs"
    @click="onClick"
  >
    <slot>Select...</slot>
    <span style="margin-left: auto"><ChevronDown16Regular /></span>
  </button>
</template>
