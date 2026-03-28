<script setup lang="ts">
import {
  useResetStyles,
  mergeClasses,
  makeResetStyles,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";

defineOptions({ inheritAttrs: false });

const useBaseClass = makeResetStyles({
  display: "flex",
  alignItems: "center",
  gap: tokens.spacingHorizontalS,
  padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalM}`,
  borderTop: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
});

const baseClassName = useResetStyles(useBaseClass);
</script>

<template>
  <footer
    :class="mergeClasses('fui-NavDrawerFooter', baseClassName)"
    v-bind="$attrs"
  >
    <slot />
  </footer>
</template>
