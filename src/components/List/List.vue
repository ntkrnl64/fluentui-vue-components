<script setup lang="ts">
import { provide, computed } from "vue";
import {
  useResetStyles,
  mergeClasses,
  makeResetStyles,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";
import { ListContextKey } from "./context";
import type { ListNavigationMode } from "./context";

export interface ListProps {
  navigationMode?: ListNavigationMode;
}

const props = defineProps<ListProps>();

defineOptions({ inheritAttrs: false });

const useBaseClass = makeResetStyles({
  display: "flex",
  flexDirection: "column",
  listStyleType: "none",
  margin: "0",
  padding: "0",
  fontFamily: tokens.fontFamilyBase,
  fontSize: tokens.fontSizeBase300,
  lineHeight: tokens.lineHeightBase300,
});

const baseClassName = useResetStyles(useBaseClass);

const rootClass = computed(() => mergeClasses("fui-List", baseClassName.value));

provide(ListContextKey, {
  navigationMode: props.navigationMode,
});
</script>

<template>
  <ul :class="rootClass" role="list" v-bind="$attrs">
    <slot />
  </ul>
</template>
