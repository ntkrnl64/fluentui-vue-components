<script setup lang="ts">
import { useSlots, computed } from "vue";
import {
  useStyles,
  useResetStyles,
  mergeClasses,
  makeStyles,
  makeResetStyles,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";

export type TableCellLayoutAppearance = "primary";

export interface TableCellLayoutProps {
  appearance?: TableCellLayoutAppearance;
  truncate?: boolean;
}

const props = withDefaults(defineProps<TableCellLayoutProps>(), {
  truncate: false,
});
defineOptions({ inheritAttrs: false });
const slots = useSlots();

const useBaseClass = makeResetStyles({
  display: "flex",
  alignItems: "center",
  gap: tokens.spacingHorizontalS,
});

const useCellLayoutStyles = makeStyles({
  primary: { fontWeight: tokens.fontWeightSemibold },
  description: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
  },
  media: { display: "flex", alignItems: "center" },
  content: { display: "flex", flexDirection: "column" },
  truncate: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
});

const baseClassName = useResetStyles(useBaseClass);
const styles = useStyles(useCellLayoutStyles);
</script>

<template>
  <div
    :class="
      mergeClasses(
        'fui-TableCellLayout',
        baseClassName,
        appearance === 'primary' && styles.primary,
      )
    "
    v-bind="$attrs"
  >
    <span v-if="slots.media" :class="styles.media"><slot name="media" /></span>
    <span :class="mergeClasses(styles.content, truncate && styles.truncate)">
      <slot />
      <span v-if="slots.description" :class="styles.description"
        ><slot name="description"
      /></span>
    </span>
  </div>
</template>
