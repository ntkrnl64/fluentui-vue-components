<script setup lang="ts">
import {
  makeResetStyles,
  useResetStyles,
  mergeClasses,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";

defineOptions({ inheritAttrs: false });
const useBaseClass = makeResetStyles({
  fontWeight: tokens.fontWeightSemibold,
  marginRight: tokens.spacingHorizontalXS,
});
const baseClassName = useResetStyles(useBaseClass);
</script>

<template>
  <span
    :class="mergeClasses('fui-MessageBarTitle', baseClassName)"
    v-bind="$attrs"
    ><slot
  /></span>
</template>
