<script setup lang="ts">
import { provide, ref, computed } from "vue";
import type { Ref } from "vue";
import {
  useStyles,
  useResetStyles,
  mergeClasses,
  makeStyles,
  makeResetStyles,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";
import { TableContextKey } from "./context";

export interface TableProps {
  size?: "extra-small" | "small" | "medium";
  noNativeElements?: boolean;
  sortable?: boolean;
}

const props = withDefaults(defineProps<TableProps>(), {
  size: "medium",
  noNativeElements: false,
  sortable: false,
});

defineOptions({ inheritAttrs: false });

const useBaseClass = makeResetStyles({
  width: "100%",
  borderCollapse: "collapse",
  fontFamily: tokens.fontFamilyBase,
  tableLayout: "auto",
});

const baseClassName = useResetStyles(useBaseClass);

provide(TableContextKey, {
  size: ref(props.size) as Ref<"extra-small" | "small" | "medium">,
  noNativeElements: props.noNativeElements,
  sortable: props.sortable,
});
</script>

<template>
  <table
    v-if="!noNativeElements"
    :class="mergeClasses('fui-Table', baseClassName)"
    role="grid"
    v-bind="$attrs"
  >
    <slot />
  </table>
  <div
    v-else
    :class="mergeClasses('fui-Table', baseClassName)"
    role="grid"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>
