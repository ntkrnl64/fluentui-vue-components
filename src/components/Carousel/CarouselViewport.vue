<script setup lang="ts">
import {
  useResetStyles,
  mergeClasses,
  makeResetStyles,
} from "@ntkrnl64/griffel-vue";

defineOptions({ inheritAttrs: false });

const useBaseClass = makeResetStyles({
  position: "relative",
  overflow: "hidden",
  width: "100%",
});

const baseClassName = useResetStyles(useBaseClass);
</script>

<template>
  <div
    :class="mergeClasses('fui-CarouselViewport', baseClassName)"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>
