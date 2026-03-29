<script setup lang="ts">
import { inject } from "vue";
import {
  useResetStyles,
  mergeClasses,
  makeResetStyles,
  shorthands,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";
import { TableContextKey } from "./context";

defineOptions({ inheritAttrs: false });
const ctx = inject(TableContextKey)!;

const useBaseClass = makeResetStyles({
  ...shorthands.padding(
    tokens.spacingVerticalSNudge,
    tokens.spacingHorizontalS,
  ),
  display: "table-cell",
  verticalAlign: "middle",
  fontFamily: tokens.fontFamilyBase,
  fontSize: tokens.fontSizeBase300,
  lineHeight: tokens.lineHeightBase300,
});

const baseClassName = useResetStyles(useBaseClass);
</script>

<template>
  <td
    v-if="!ctx.noNativeElements"
    :class="mergeClasses('fui-TableCell', baseClassName)"
    role="gridcell"
    v-bind="$attrs"
  >
    <slot />
  </td>
  <div
    v-else
    :class="mergeClasses('fui-TableCell', baseClassName)"
    role="gridcell"
    style="flex: 1"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>
