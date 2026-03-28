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
  fontSize: tokens.fontSizeBase400,
  fontWeight: tokens.fontWeightSemibold,
  lineHeight: tokens.lineHeightBase400,
  color: tokens.colorNeutralForeground1,
  margin: "0",
});

const baseClassName = useResetStyles(useBaseClass);
</script>

<template>
  <h2
    :class="mergeClasses('fui-TeachingPopoverTitle', baseClassName)"
    v-bind="$attrs"
  >
    <slot />
  </h2>
</template>
