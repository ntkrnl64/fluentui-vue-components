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
import { TableContextKey } from "./context";

export interface TableHeaderCellProps {
  sortDirection?: "ascending" | "descending";
}

const props = defineProps<TableHeaderCellProps>();
defineOptions({ inheritAttrs: false });
const emit = defineEmits<{ click: [event: MouseEvent] }>();
const ctx = inject(TableContextKey)!;

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
  display: "table-cell",
  verticalAlign: "middle",
});

const useHeaderCellStyles = makeStyles({
  sortable: {
    cursor: "pointer",
    ":hover": { backgroundColor: tokens.colorNeutralBackground1Hover },
  },
  sortIcon: {
    marginLeft: tokens.spacingHorizontalXS,
    fontSize: "12px",
  },
});

const baseClassName = useResetStyles(useBaseClass);
const styles = useStyles(useHeaderCellStyles);

const rootClass = computed(() =>
  mergeClasses(
    "fui-TableHeaderCell",
    baseClassName.value,
    ctx.sortable && styles.value.sortable,
  ),
);
</script>

<template>
  <th
    v-if="!ctx.noNativeElements"
    :class="rootClass"
    role="columnheader"
    :aria-sort="sortDirection"
    v-bind="$attrs"
    @click="emit('click', $event)"
  >
    <slot />
    <span v-if="sortDirection" :class="styles.sortIcon"
      ><ArrowSortUp16Filled
        v-if="sortDirection === 'ascending'" /><ArrowSortDown16Filled v-else
    /></span>
  </th>
  <div
    v-else
    :class="rootClass"
    role="columnheader"
    :aria-sort="sortDirection"
    style="flex: 1"
    v-bind="$attrs"
    @click="emit('click', $event)"
  >
    <slot />
    <span v-if="sortDirection" :class="styles.sortIcon"
      ><ArrowSortUp16Filled
        v-if="sortDirection === 'ascending'" /><ArrowSortDown16Filled v-else
    /></span>
  </div>
</template>
