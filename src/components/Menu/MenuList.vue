<script setup lang="ts">
import { computed } from "vue";
import {
  makeResetStyles,
  useResetStyles,
  mergeClasses,
} from "@ntkrnl64/griffel-vue";

defineOptions({ inheritAttrs: false });

const useBaseClass = makeResetStyles({
  display: "flex",
  flexDirection: "column",
});

const baseClassName = useResetStyles(useBaseClass);
</script>

<template>
  <div
    :class="mergeClasses('fui-MenuList', baseClassName)"
    role="menu"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>
