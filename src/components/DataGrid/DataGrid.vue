<script setup lang="ts">
import { provide, ref, computed } from "vue";
import {
  useResetStyles,
  mergeClasses,
  makeResetStyles,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";
import { DataGridContextKey } from "./context";
import type { DataGridColumn } from "./context";

export interface DataGridProps {
  items?: unknown[];
  columns?: DataGridColumn[];
  selectionMode?: "none" | "single" | "multiselect";
  sortable?: boolean;
  getRowId?: (item: unknown, index: number) => string | number;
}

const props = withDefaults(defineProps<DataGridProps>(), {
  selectionMode: "none",
  sortable: false,
});

defineOptions({ inheritAttrs: false });
const emit = defineEmits<{ "update:selectedRows": [Set<string | number>] }>();

const sortState = ref<{
  columnId: string;
  direction: "ascending" | "descending";
} | null>(null);
const selectedRows = ref(new Set<string | number>());

function setSortState(columnId: string) {
  if (sortState.value?.columnId === columnId) {
    sortState.value = {
      columnId,
      direction:
        sortState.value.direction === "ascending" ? "descending" : "ascending",
    };
  } else {
    sortState.value = { columnId, direction: "ascending" };
  }
}

function toggleRowSelection(rowId: string | number) {
  const next = new Set(selectedRows.value);
  if (props.selectionMode === "single") {
    next.clear();
    next.add(rowId);
  } else {
    if (next.has(rowId)) next.delete(rowId);
    else next.add(rowId);
  }
  selectedRows.value = next;
  emit("update:selectedRows", next);
}

const useBaseClass = makeResetStyles({
  width: "100%",
  borderCollapse: "collapse",
  fontFamily: tokens.fontFamilyBase,
  tableLayout: "auto",
});

const baseClassName = useResetStyles(useBaseClass);

provide(DataGridContextKey, {
  sortState,
  setSortState,
  selectedRows,
  toggleRowSelection,
  selectionMode: props.selectionMode,
});
</script>

<template>
  <table
    :class="mergeClasses('fui-DataGrid', baseClassName)"
    role="grid"
    v-bind="$attrs"
  >
    <slot />
  </table>
</template>
