<script setup lang="ts">
import {
  useResetStyles,
  mergeClasses,
  makeResetStyles,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";

defineOptions({ inheritAttrs: false });

const useBaseClass = makeResetStyles({
  fontFamily: tokens.fontFamilyBase,
  fontSize: tokens.fontSizeBase300,
  lineHeight: tokens.lineHeightBase300,
  fontWeight: tokens.fontWeightRegular,
  color: tokens.colorNeutralForeground1,
  flexGrow: 1,
  overflowY: "auto",
});

const baseClassName = useResetStyles(useBaseClass);
</script>

<template>
  <div
    :class="mergeClasses('fui-DialogContent', baseClassName)"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>
