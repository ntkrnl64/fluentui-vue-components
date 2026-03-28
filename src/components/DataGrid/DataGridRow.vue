<script setup lang="ts">
import { inject, computed } from "vue";
import {
  useResetStyles,
  mergeClasses,
  makeResetStyles,
  makeStyles,
  useStyles,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";
import { DataGridContextKey } from "./context";

export interface DataGridRowProps {
  rowId?: string | number;
}

const props = defineProps<DataGridRowProps>();
defineOptions({ inheritAttrs: false });
const ctx = inject(DataGridContextKey)!;

const useBaseClass = makeResetStyles({
  borderBottomWidth: tokens.strokeWidthThin,
  borderBottomStyle: "solid",
  borderBottomColor: tokens.colorNeutralStroke2,
  color: tokens.colorNeutralForeground1,
});

const useRowStyles = makeStyles({
  selected: { backgroundColor: tokens.colorNeutralBackground1Selected },
  selectable: {
    cursor: "pointer",
    ":hover": { backgroundColor: tokens.colorNeutralBackground1Hover },
  },
});

const baseClassName = useResetStyles(useBaseClass);
const styles = useStyles(useRowStyles);

const isSelected = computed(
  () => props.rowId !== undefined && ctx.selectedRows.value.has(props.rowId),
);

const rootClass = computed(() =>
  mergeClasses(
    "fui-DataGridRow",
    baseClassName.value,
    ctx.selectionMode !== "none" && styles.value.selectable,
    isSelected.value && styles.value.selected,
  ),
);

function handleClick() {
  if (ctx.selectionMode !== "none" && props.rowId !== undefined) {
    ctx.toggleRowSelection(props.rowId);
  }
}
</script>

<template>
  <tr
    :class="rootClass"
    role="row"
    :aria-selected="isSelected"
    v-bind="$attrs"
    @click="handleClick"
  >
    <slot />
  </tr>
</template>
