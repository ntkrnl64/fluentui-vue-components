<script setup lang="ts">
import { computed } from "vue";
import {
  useResetStyles,
  mergeClasses,
  makeResetStyles,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";

defineOptions({ inheritAttrs: false });

const useBaseClass = makeResetStyles({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: tokens.spacingHorizontalS,
});

const baseClassName = useResetStyles(useBaseClass);

const rootClass = computed(() =>
  mergeClasses("fui-CardFooter", baseClassName.value),
);
</script>

<template>
  <div :class="rootClass" v-bind="$attrs">
    <slot />
  </div>
</template>
