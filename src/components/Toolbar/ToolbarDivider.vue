<script setup lang="ts">
import { computed, inject } from "vue";
import {
  useStyles,
  useResetStyles,
  mergeClasses,
  makeStyles,
  makeResetStyles,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";
import { ToolbarContextKey } from "./context";

defineOptions({ inheritAttrs: false });

const toolbarCtx = inject(ToolbarContextKey, undefined);
const isVertical = computed(() => toolbarCtx?.vertical ?? false);

const useBaseClass = makeResetStyles({
  alignSelf: "center",
  boxSizing: "border-box",
  display: "inline-flex",
  flexShrink: 0,
});

const useToolbarDividerStyles = makeStyles({
  horizontal: {
    width: tokens.strokeWidthThin,
    minHeight: "20px",
    backgroundColor: tokens.colorNeutralStroke2,
    marginLeft: tokens.spacingHorizontalXS,
    marginRight: tokens.spacingHorizontalXS,
  },
  vertical: {
    height: tokens.strokeWidthThin,
    minWidth: "20px",
    backgroundColor: tokens.colorNeutralStroke2,
    marginTop: tokens.spacingVerticalXS,
    marginBottom: tokens.spacingVerticalXS,
  },
});

const baseClassName = useResetStyles(useBaseClass);
const styles = useStyles(useToolbarDividerStyles);

const rootClass = computed(() =>
  mergeClasses(
    "fui-ToolbarDivider",
    baseClassName.value,
    isVertical.value ? styles.value.vertical : styles.value.horizontal,
  ),
);
</script>

<template>
  <div
    :class="rootClass"
    role="separator"
    :aria-orientation="isVertical ? 'horizontal' : 'vertical'"
    v-bind="$attrs"
  />
</template>
