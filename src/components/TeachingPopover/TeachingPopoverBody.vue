<script setup lang="ts">
import {
  useResetStyles,
  mergeClasses,
  makeResetStyles,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";

defineOptions({ inheritAttrs: false });

const useBaseClass = makeResetStyles({
  fontSize: tokens.fontSizeBase300,
  lineHeight: tokens.lineHeightBase300,
});

const baseClassName = useResetStyles(useBaseClass);
</script>

<template>
  <div
    :class="mergeClasses('fui-TeachingPopoverBody', baseClassName)"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>
