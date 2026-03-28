<script setup lang="ts">
import {
  useResetStyles,
  mergeClasses,
  makeResetStyles,
  shorthands,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";

defineOptions({ inheritAttrs: false });

const useBaseClass = makeResetStyles({
  ...shorthands.padding(
    tokens.spacingVerticalSNudge,
    tokens.spacingHorizontalS,
  ),
  fontFamily: tokens.fontFamilyBase,
  fontSize: tokens.fontSizeBase300,
  lineHeight: tokens.lineHeightBase300,
});

const baseClassName = useResetStyles(useBaseClass);
</script>

<template>
  <td
    :class="mergeClasses('fui-DataGridCell', baseClassName)"
    role="gridcell"
    v-bind="$attrs"
  >
    <slot />
  </td>
</template>
