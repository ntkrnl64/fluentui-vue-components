<script setup lang="ts">
import {
  makeResetStyles,
  useResetStyles,
  mergeClasses,
  shorthands,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";

defineOptions({ inheritAttrs: false });

const useBaseClass = makeResetStyles({
  ...shorthands.padding(
    tokens.spacingVerticalSNudge,
    tokens.spacingHorizontalM,
  ),
  fontSize: tokens.fontSizeBase200,
  fontWeight: tokens.fontWeightSemibold,
  lineHeight: tokens.lineHeightBase200,
  color: tokens.colorNeutralForeground3,
});

const baseClassName = useResetStyles(useBaseClass);
</script>

<template>
  <div
    :class="mergeClasses('fui-MenuGroupHeader', baseClassName)"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>
