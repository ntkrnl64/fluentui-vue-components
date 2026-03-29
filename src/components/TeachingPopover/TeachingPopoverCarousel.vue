<script setup lang="ts">
import { inject } from "vue";
import {
  useResetStyles,
  mergeClasses,
  makeResetStyles,
} from "@ntkrnl64/griffel-vue";
import { TeachingPopoverContextKey } from "./context";

defineOptions({ inheritAttrs: false });
inject(TeachingPopoverContextKey)!;

const useBaseClass = makeResetStyles({
  display: "flex",
  flexDirection: "column",
  position: "relative",
  overflow: "hidden",
});

const baseClassName = useResetStyles(useBaseClass);
</script>

<template>
  <div
    :class="mergeClasses('fui-TeachingPopoverCarousel', baseClassName)"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>
