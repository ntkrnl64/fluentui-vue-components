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
import { BreadcrumbContextKey } from "./context";

defineOptions({ inheritAttrs: false });

const breadcrumbCtx = inject(BreadcrumbContextKey, undefined);
const resolvedSize = computed(() => breadcrumbCtx?.size ?? "medium");

const useBaseClass = makeResetStyles({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  color: tokens.colorNeutralForeground2,
  fontFamily: tokens.fontFamilyBase,
  userSelect: "none",
});

const useBreadcrumbDividerStyles = makeStyles({
  small: {
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
  },
  medium: {
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
  },
  large: {
    fontSize: tokens.fontSizeBase400,
    lineHeight: tokens.lineHeightBase400,
  },
});

const baseClassName = useResetStyles(useBaseClass);
const styles = useStyles(useBreadcrumbDividerStyles);

const rootClass = computed(() =>
  mergeClasses(
    "fui-BreadcrumbDivider",
    baseClassName.value,
    styles.value[resolvedSize.value],
  ),
);
</script>

<template>
  <li :class="rootClass" aria-hidden="true" v-bind="$attrs">
    <slot>/</slot>
  </li>
</template>
