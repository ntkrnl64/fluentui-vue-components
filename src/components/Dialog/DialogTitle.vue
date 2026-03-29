<script setup lang="ts">
import { inject } from "vue";
import {
  useResetStyles,
  mergeClasses,
  makeResetStyles,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";
import { DialogContextKey } from "./context";

const ctx = inject(DialogContextKey)!;
defineOptions({ inheritAttrs: false });

const useBaseClass = makeResetStyles({
  fontFamily: tokens.fontFamilyBase,
  fontSize: tokens.fontSizeBase500,
  fontWeight: tokens.fontWeightSemibold,
  lineHeight: tokens.lineHeightBase500,
  color: tokens.colorNeutralForeground1,
  margin: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

const baseClassName = useResetStyles(useBaseClass);
</script>

<template>
  <h2
    :id="ctx.titleId"
    :class="mergeClasses('fui-DialogTitle', baseClassName)"
    v-bind="$attrs"
  >
    <slot />
    <slot name="action" />
  </h2>
</template>
