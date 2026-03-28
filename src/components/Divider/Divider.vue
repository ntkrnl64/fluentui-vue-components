<script setup lang="ts">
import { computed, useSlots } from "vue";
import {
  useStyles,
  useResetStyles,
  mergeClasses,
  makeStyles,
  makeResetStyles,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";

export type DividerAppearance = "default" | "subtle" | "brand" | "strong";
export type DividerAlign = "start" | "center" | "end";

export interface DividerProps {
  vertical?: boolean;
  inset?: boolean;
  appearance?: DividerAppearance;
  alignContent?: DividerAlign;
}

const props = withDefaults(defineProps<DividerProps>(), {
  vertical: false,
  inset: false,
  appearance: "default",
  alignContent: "center",
});

defineOptions({ inheritAttrs: false });

const slots = useSlots();

const useBaseClass = makeResetStyles({
  alignItems: "center",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "row",
  flexGrow: 1,
  position: "relative",
  fontFamily: tokens.fontFamilyBase,
  fontSize: tokens.fontSizeBase200,
  lineHeight: tokens.lineHeightBase200,
  fontWeight: tokens.fontWeightRegular,
  color: tokens.colorNeutralForeground2,
  "::before": {
    boxSizing: "border-box",
    display: "flex",
    flexGrow: 1,
    borderTopColor: tokens.colorNeutralStroke2,
    borderTopStyle: "solid",
    borderTopWidth: tokens.strokeWidthThin,
    content: '""',
  },
  "::after": {
    boxSizing: "border-box",
    display: "flex",
    flexGrow: 1,
    borderTopColor: tokens.colorNeutralStroke2,
    borderTopStyle: "solid",
    borderTopWidth: tokens.strokeWidthThin,
    content: '""',
  },
});

const useDividerStyles = makeStyles({
  vertical: {
    flexDirection: "column",
    minHeight: "20px",
    "::before": {
      borderTopStyle: "none",
      borderRightColor: tokens.colorNeutralStroke2,
      borderRightStyle: "solid",
      borderRightWidth: tokens.strokeWidthThin,
      minHeight: "8px",
    },
    "::after": {
      borderTopStyle: "none",
      borderRightColor: tokens.colorNeutralStroke2,
      borderRightStyle: "solid",
      borderRightWidth: tokens.strokeWidthThin,
      minHeight: "8px",
    },
  },
  inset: { paddingLeft: "12px", paddingRight: "12px" },
  insetVertical: { paddingTop: "12px", paddingBottom: "12px" },
  brand: {
    color: tokens.colorBrandForeground1,
    "::before": { borderTopColor: tokens.colorBrandStroke1 },
    "::after": { borderTopColor: tokens.colorBrandStroke1 },
  },
  subtle: {
    "::before": { borderTopColor: tokens.colorNeutralStroke3 },
    "::after": { borderTopColor: tokens.colorNeutralStroke3 },
  },
  strong: {
    "::before": { borderTopColor: tokens.colorNeutralStroke1 },
    "::after": { borderTopColor: tokens.colorNeutralStroke1 },
  },
  start: {
    "::before": { flexGrow: 0, flexBasis: "8px" },
  },
  end: {
    "::after": { flexGrow: 0, flexBasis: "8px" },
  },
  hasContent: {
    "::before": { marginRight: "12px" },
    "::after": { marginLeft: "12px" },
  },
});

const baseClassName = useResetStyles(useBaseClass);
const styles = useStyles(useDividerStyles);

const hasContent = computed(() => !!slots.default);

const rootClass = computed(() =>
  mergeClasses(
    "fui-Divider",
    baseClassName.value,
    props.vertical && styles.value.vertical,
    props.inset && !props.vertical && styles.value.inset,
    props.inset && props.vertical && styles.value.insetVertical,
    props.appearance !== "default" && styles.value[props.appearance],
    props.alignContent === "start" && styles.value.start,
    props.alignContent === "end" && styles.value.end,
    hasContent.value && styles.value.hasContent,
  ),
);
</script>

<template>
  <div
    :class="rootClass"
    role="separator"
    :aria-orientation="vertical ? 'vertical' : 'horizontal'"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>
