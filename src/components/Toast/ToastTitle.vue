<script setup lang="ts">
import {
  useStyles,
  useResetStyles,
  mergeClasses,
  makeStyles,
  makeResetStyles,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";

defineOptions({ inheritAttrs: false });

const useBaseClass = makeResetStyles({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  fontFamily: tokens.fontFamilyBase,
  fontSize: tokens.fontSizeBase300,
  fontWeight: tokens.fontWeightSemibold,
  lineHeight: tokens.lineHeightBase300,
  color: "inherit",
});

const useActionStyles = makeStyles({
  action: {
    display: "flex",
    alignItems: "center",
    marginLeft: "auto",
  },
});

const baseClassName = useResetStyles(useBaseClass);
const styles = useStyles(useActionStyles);
</script>

<template>
  <div :class="mergeClasses('fui-ToastTitle', baseClassName)" v-bind="$attrs">
    <slot />
    <span v-if="$slots.action" :class="styles.action">
      <slot name="action" />
    </span>
  </div>
</template>
