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
  alignItems: "center",
  columnGap: tokens.spacingHorizontalXS,
});

const baseClassName = useResetStyles(useBaseClass);

const rootClass = computed(() =>
  mergeClasses("fui-ToolbarGroup", baseClassName.value),
);
</script>

<template>
  <div :class="rootClass" role="group" v-bind="$attrs">
    <slot />
  </div>
</template>
