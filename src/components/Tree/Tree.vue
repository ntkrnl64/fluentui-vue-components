<script setup lang="ts">
import { provide, computed } from "vue";
import {
  useResetStyles,
  mergeClasses,
  makeResetStyles,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";
import { TreeContextKey } from "./context";

export interface TreeProps {
  ariaLabel?: string;
}

defineProps<TreeProps>();

defineOptions({ inheritAttrs: false });

const useBaseClass = makeResetStyles({
  display: "flex",
  flexDirection: "column",
  rowGap: tokens.spacingVerticalNone,
  fontFamily: tokens.fontFamilyBase,
  fontSize: tokens.fontSizeBase300,
  lineHeight: tokens.lineHeightBase300,
  listStyleType: "none",
  margin: "0",
  padding: "0",
});

const baseClassName = useResetStyles(useBaseClass);

const rootClass = computed(() => mergeClasses("fui-Tree", baseClassName.value));

provide(TreeContextKey, {
  level: 1,
});
</script>

<template>
  <ul :class="rootClass" role="tree" :aria-label="ariaLabel" v-bind="$attrs">
    <slot />
  </ul>
</template>
