<script setup lang="ts">
import { inject } from "vue";
import {
  ChevronLeft20Regular,
  ChevronRight20Regular,
} from "@ntkrnl64/fluentui-vue-icons";
import {
  useResetStyles,
  mergeClasses,
  makeResetStyles,
  shorthands,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";
import { TeachingPopoverContextKey } from "./context";

export interface TeachingPopoverCarouselNavButtonProps {
  navType: "prev" | "next";
}

const props = defineProps<TeachingPopoverCarouselNavButtonProps>();
defineOptions({ inheritAttrs: false });
const ctx = inject(TeachingPopoverContextKey)!;

const useBaseClass = makeResetStyles({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "28px",
  height: "28px",
  ...shorthands.borderRadius(tokens.borderRadiusCircular),
  border: "none",
  backgroundColor: "transparent",
  color: tokens.colorNeutralForeground1,
  cursor: "pointer",
  outlineStyle: "none",
  ...shorthands.padding("0"),
  ":hover": { backgroundColor: tokens.colorNeutralBackground1Hover },
  ":focus-visible": {
    outlineColor: tokens.colorStrokeFocus2,
    outlineWidth: tokens.strokeWidthThick,
    outlineStyle: "solid",
    outlineOffset: "2px",
  },
});

const baseClassName = useResetStyles(useBaseClass);

function handleClick() {
  if (props.navType === "prev") ctx.prevPage();
  else ctx.nextPage();
}
</script>

<template>
  <button
    :class="mergeClasses('fui-TeachingPopoverCarouselNavButton', baseClassName)"
    type="button"
    :aria-label="navType === 'prev' ? 'Previous' : 'Next'"
    v-bind="$attrs"
    @click="handleClick"
  >
    <ChevronLeft20Regular v-if="navType === 'prev'" />
    <ChevronRight20Regular v-else />
  </button>
</template>
