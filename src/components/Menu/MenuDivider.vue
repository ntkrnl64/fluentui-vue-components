<script setup lang="ts">
import {
  makeResetStyles,
  useResetStyles,
  mergeClasses,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";

defineOptions({ inheritAttrs: false });

const useBaseClass = makeResetStyles({
  height: tokens.strokeWidthThin,
  backgroundColor: tokens.colorNeutralStroke2,
  margin: `${tokens.spacingVerticalXXS} 0`,
});

const baseClassName = useResetStyles(useBaseClass);
</script>

<template>
  <div
    :class="mergeClasses('fui-MenuDivider', baseClassName)"
    role="separator"
    v-bind="$attrs"
  />
</template>
