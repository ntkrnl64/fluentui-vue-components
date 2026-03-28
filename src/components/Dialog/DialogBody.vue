<script setup lang="ts">
import { computed } from "vue";
import {
  useStyles,
  useResetStyles,
  mergeClasses,
  makeResetStyles,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";

defineOptions({ inheritAttrs: false });

const useBaseClass = makeResetStyles({
  display: "flex",
  flexDirection: "column",
  gap: tokens.spacingVerticalS,
  flexGrow: 1,
});

const baseClassName = useResetStyles(useBaseClass);
</script>

<template>
  <div :class="mergeClasses('fui-DialogBody', baseClassName)" v-bind="$attrs">
    <slot />
  </div>
</template>
