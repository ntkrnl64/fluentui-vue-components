<script setup lang="ts">
import { inject, computed } from "vue";
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

export interface DataGridSelectionCellProps {
  rowId?: string | number;
  type?: "checkbox" | "radio";
}

const props = withDefaults(defineProps<DataGridSelectionCellProps>(), {
  type: "checkbox",
});
defineOptions({ inheritAttrs: false });
const ctx = inject(DataGridContextKey)!;

const useBaseClass = makeResetStyles({
  ...shorthands.padding(tokens.spacingVerticalXS, tokens.spacingHorizontalS),
  width: "44px",
  textAlign: "center",
});

const useSelectionStyles = makeStyles({
  indicator: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
    width: "16px",
    height: "16px",
    ...shorthands.borderRadius(tokens.borderRadiusSmall),
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStrokeAccessible}`,
    backgroundColor: tokens.colorNeutralBackground1,
    color: tokens.colorNeutralForegroundInverted,
    cursor: "pointer",
    transitionProperty: "background-color, border-color",
    transitionDuration: tokens.durationFaster,
    transitionTimingFunction: tokens.curveEasyEase,
    ":hover": {
      ...shorthands.borderColor(tokens.colorNeutralStrokeAccessibleHover),
    },
  },
  indicatorChecked: {
    backgroundColor: tokens.colorCompoundBrandBackground,
    ...shorthands.borderColor(tokens.colorCompoundBrandBackground),
    ":hover": {
      backgroundColor: tokens.colorCompoundBrandBackgroundHover,
      ...shorthands.borderColor(tokens.colorCompoundBrandBackgroundHover),
    },
  },
  radio: {
    ...shorthands.borderRadius(tokens.borderRadiusCircular),
  },
  radioChecked: {
    ...shorthands.borderColor(tokens.colorCompoundBrandStroke),
  },
  hidden: {
    position: "absolute" as const,
    opacity: 0,
    width: 0,
    height: 0,
    overflow: "hidden" as const,
  },
});

const baseClassName = useResetStyles(useBaseClass);
const styles = useStyles(useSelectionStyles);

const isChecked = computed(
  () => props.rowId !== undefined && ctx.selectedRows.value.has(props.rowId),
);

const indicatorClass = computed(() =>
  mergeClasses(
    styles.value.indicator,
    props.type === "radio" && styles.value.radio,
    isChecked.value &&
      (props.type === "radio"
        ? styles.value.radioChecked
        : styles.value.indicatorChecked),
  ),
);

function toggle(event: Event) {
  event.stopPropagation();
  if (props.rowId !== undefined) ctx.toggleRowSelection(props.rowId);
}
</script>

<template>
  <td
    :class="mergeClasses('fui-DataGridSelectionCell', baseClassName)"
    role="gridcell"
    v-bind="$attrs"
  >
    <input
      :class="styles.hidden"
      :type="type"
      :checked="isChecked"
      @change="toggle"
    />
    <div :class="indicatorClass" @click.stop="toggle" role="presentation">
      <svg
        v-if="type === 'checkbox' && isChecked"
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
      >
        <path
          d="M9.76 3.2a.75.75 0 0 1 .04 1.06l-4.25 4.5a.75.75 0 0 1-1.08.02L2.22 6.53a.75.75 0 0 1 1.06-1.06l1.7 1.7 3.72-3.93a.75.75 0 0 1 1.06-.04Z"
          fill="currentColor"
        />
      </svg>
      <template v-else-if="type === 'radio' && isChecked">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <circle cx="6" cy="6" r="4" fill="currentColor" />
        </svg>
      </template>
    </div>
  </td>
</template>
