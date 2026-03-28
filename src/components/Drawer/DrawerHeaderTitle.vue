<script setup lang="ts">
import {
  useResetStyles,
  useStyles,
  mergeClasses,
  makeResetStyles,
  makeStyles,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";

defineOptions({ inheritAttrs: false });

const useBaseClass = makeResetStyles({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexGrow: 1,
  fontFamily: tokens.fontFamilyBase,
  fontSize: tokens.fontSizeBase500,
  fontWeight: tokens.fontWeightSemibold,
  lineHeight: tokens.lineHeightBase500,
  color: tokens.colorNeutralForeground1,
});

const useActionStyles = makeStyles({
  action: {
    display: "flex",
    alignItems: "center",
  },
});

const baseClassName = useResetStyles(useBaseClass);
const styles = useStyles(useActionStyles);
</script>

<template>
  <div
    :class="mergeClasses('fui-DrawerHeaderTitle', baseClassName)"
    v-bind="$attrs"
  >
    <h2 style="margin: 0; font: inherit; color: inherit">
      <slot />
    </h2>
    <span v-if="$slots.action" :class="styles.action">
      <slot name="action" />
    </span>
  </div>
</template>
