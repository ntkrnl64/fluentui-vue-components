<script setup lang="ts">
import { inject, computed } from "vue";
import {
  ArrowSortUp16Filled,
  ArrowSortDown16Filled,
} from "@ntkrnl64/fluentui-vue-icons";
import {
  useStyles,
  useResetStyles,
  mergeClasses,
  makeStyles,
  makeResetStyles,
  shorthands,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";
import { DataGridContextKey } from "./context";

export interface DataGridHeaderCellProps {
  columnId?: string;
  sortable?: boolean;
}

const props = withDefaults(defineProps<DataGridHeaderCellProps>(), {
  sortable: true,
});
defineOptions({ inheritAttrs: false });
const ctx = inject(DataGridContextKey)!;

const useBaseClass = makeResetStyles({
  ...shorthands.padding(
    tokens.spacingVerticalSNudge,
    tokens.spacingHorizontalS,
  ),
  fontWeight: tokens.fontWeightSemibold,
  fontSize: tokens.fontSizeBase300,
  lineHeight: tokens.lineHeightBase300,
  fontFamily: tokens.fontFamilyBase,
  color: tokens.colorNeutralForeground1,
});

const useHeaderStyles = makeStyles({
  sortable: {
    cursor: "pointer",
    userSelect: "none",
    ":hover": { backgroundColor: tokens.colorNeutralBackground1Hover },
  },
  sortIcon: { marginLeft: tokens.spacingHorizontalXS, fontSize: "10px" },
});

const baseClassName = useResetStyles(useBaseClass);
const styles = useStyles(useHeaderStyles);

const sortDir = computed(() => {
  if (ctx.sortState.value?.columnId === props.columnId)
    return ctx.sortState.value.direction;
  return undefined;
});

function handleClick() {
  if (props.sortable && props.columnId) ctx.setSortState(props.columnId);
}
</script>

<template>
  <th
    :class="
      mergeClasses(
        'fui-DataGridHeaderCell',
        baseClassName,
        sortable && styles.sortable,
      )
    "
    role="columnheader"
    :aria-sort="sortDir"
    v-bind="$attrs"
    @click="handleClick"
  >
    <slot />
    <span v-if="sortDir" :class="styles.sortIcon"
      ><ArrowSortUp16Filled
        v-if="sortDir === 'ascending'" /><ArrowSortDown16Filled v-else
    /></span>
  </th>
</template>
