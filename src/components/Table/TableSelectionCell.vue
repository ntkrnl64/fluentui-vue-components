<script setup lang="ts">
import { inject, computed, ref } from "vue";
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

export interface TableSelectionCellProps {
  type?: "checkbox" | "radio";
  checked?: boolean | "mixed";
}

const props = withDefaults(defineProps<TableSelectionCellProps>(), {
  type: "checkbox",
});
defineOptions({ inheritAttrs: false });
const emit = defineEmits<{ change: [checked: boolean] }>();
const ctx = inject(TableContextKey)!;

const useBaseClass = makeResetStyles({
  ...shorthands.padding(tokens.spacingVerticalXS, tokens.spacingHorizontalS),
  width: "44px",
  display: "table-cell",
  verticalAlign: "middle",
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
  indicatorMixed: {
    backgroundColor: tokens.colorCompoundBrandBackground,
    ...shorthands.borderColor(tokens.colorCompoundBrandBackground),
  },
  radio: {
    ...shorthands.borderRadius(tokens.borderRadiusCircular),
  },
  radioChecked: {
    ...shorthands.borderColor(tokens.colorCompoundBrandStroke),
    backgroundColor: "transparent",
    color: tokens.colorCompoundBrandBackground,
  },
  hidden: {
    position: "absolute" as const,
    opacity: 0,
    width: 0,
    height: 0,
    margin: 0,
    padding: 0,
    overflow: "hidden" as const,
  },
});

const baseClassName = useResetStyles(useBaseClass);
const styles = useStyles(useSelectionStyles);

const isChecked = computed(() => props.checked === true);
const isMixed = computed(() => props.checked === "mixed");

const indicatorClass = computed(() =>
  mergeClasses(
    styles.value.indicator,
    props.type === "radio" && styles.value.radio,
    props.type === "checkbox" &&
      isChecked.value &&
      styles.value.indicatorChecked,
    props.type === "checkbox" && isMixed.value && styles.value.indicatorMixed,
    props.type === "radio" && isChecked.value && styles.value.radioChecked,
  ),
);

function handleClick() {
  emit("change", !isChecked.value);
}
</script>

<template>
  <td
    v-if="!ctx.noNativeElements"
    :class="mergeClasses('fui-TableSelectionCell', baseClassName)"
    role="gridcell"
    v-bind="$attrs"
  >
    <input
      :class="styles.hidden"
      :type="type"
      :checked="isChecked"
      :indeterminate="isMixed"
      @change="handleClick"
    />
    <div :class="indicatorClass" @click="handleClick" role="presentation">
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
      <svg
        v-else-if="type === 'checkbox' && isMixed"
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
      >
        <rect
          x="2"
          y="5.25"
          width="8"
          height="1.5"
          rx="0.75"
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
  <div
    v-else
    :class="mergeClasses('fui-TableSelectionCell', baseClassName)"
    role="gridcell"
    v-bind="$attrs"
  >
    <input
      :class="styles.hidden"
      :type="type"
      :checked="isChecked"
      :indeterminate="isMixed"
      @change="handleClick"
    />
    <div :class="indicatorClass" @click="handleClick" role="presentation">
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
      <svg
        v-else-if="type === 'checkbox' && isMixed"
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
      >
        <rect
          x="2"
          y="5.25"
          width="8"
          height="1.5"
          rx="0.75"
          fill="currentColor"
        />
      </svg>
      <template v-else-if="type === 'radio' && isChecked">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <circle cx="6" cy="6" r="4" fill="currentColor" />
        </svg>
      </template>
    </div>
  </div>
</template>
