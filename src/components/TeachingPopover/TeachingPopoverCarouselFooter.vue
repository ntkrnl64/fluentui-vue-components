<script setup lang="ts">
import {
  useResetStyles,
  mergeClasses,
  makeResetStyles,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";

defineOptions({ inheritAttrs: false });

const useBaseClass = makeResetStyles({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: tokens.spacingVerticalM,
  gap: tokens.spacingHorizontalS,
});

const baseClassName = useResetStyles(useBaseClass);
</script>

<template>
  <div
    :class="mergeClasses('fui-TeachingPopoverCarouselFooter', baseClassName)"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>
