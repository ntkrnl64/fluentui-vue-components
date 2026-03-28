<script setup lang="ts">
import { inject } from "vue";
import {
  useResetStyles,
  mergeClasses,
  makeResetStyles,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";
import { TeachingPopoverContextKey } from "./context";

defineOptions({ inheritAttrs: false });
const ctx = inject(TeachingPopoverContextKey)!;

const useBaseClass = makeResetStyles({
  fontFamily: tokens.fontFamilyBase,
  fontSize: tokens.fontSizeBase200,
  lineHeight: tokens.lineHeightBase200,
  color: tokens.colorNeutralForeground3,
});

const baseClassName = useResetStyles(useBaseClass);
</script>

<template>
  <span
    :class="mergeClasses('fui-TeachingPopoverCarouselPageCount', baseClassName)"
    v-bind="$attrs"
  >
    {{ ctx.currentPage.value + 1 }} of {{ ctx.totalPages.value }}
  </span>
</template>
