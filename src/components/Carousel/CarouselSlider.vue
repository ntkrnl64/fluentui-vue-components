<script setup lang="ts">
import {
  useResetStyles,
  mergeClasses,
  makeResetStyles,
} from "@ntkrnl64/griffel-vue";

defineOptions({ inheritAttrs: false });

const useBaseClass = makeResetStyles({
  display: "flex",
  flexDirection: "row",
  position: "relative",
  width: "100%",
});

const baseClassName = useResetStyles(useBaseClass);
</script>

<template>
  <div
    :class="mergeClasses('fui-CarouselSlider', baseClassName)"
    role="group"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>
