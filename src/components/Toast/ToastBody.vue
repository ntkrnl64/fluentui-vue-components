<script setup lang="ts">
import {
  useStyles,
  useResetStyles,
  mergeClasses,
  makeStyles,
  makeResetStyles,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";

export interface ToastBodyProps {
  subtitle?: string;
}

const props = defineProps<ToastBodyProps>();

defineOptions({ inheritAttrs: false });

const useBaseClass = makeResetStyles({
  display: "flex",
  flexDirection: "column",
  fontFamily: tokens.fontFamilyBase,
  fontSize: tokens.fontSizeBase300,
  fontWeight: tokens.fontWeightRegular,
  lineHeight: tokens.lineHeightBase300,
  color: "inherit",
});

const useBodyStyles = makeStyles({
  subtitle: {
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
    color: tokens.colorNeutralForeground2,
    marginTop: tokens.spacingVerticalXS,
  },
});

const baseClassName = useResetStyles(useBaseClass);
const styles = useStyles(useBodyStyles);
</script>

<template>
  <div :class="mergeClasses('fui-ToastBody', baseClassName)" v-bind="$attrs">
    <slot />
    <div v-if="subtitle" :class="styles.subtitle">{{ subtitle }}</div>
  </div>
</template>
