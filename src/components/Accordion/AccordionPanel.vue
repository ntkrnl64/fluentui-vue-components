<script setup lang="ts">
import { inject, computed } from "vue";
import {
  useStyles,
  useResetStyles,
  mergeClasses,
  makeStyles,
  makeResetStyles,
  shorthands,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";
import { AccordionItemContextKey } from "./context";

defineOptions({ inheritAttrs: false });

const itemCtx = inject(AccordionItemContextKey)!;

const useBaseClass = makeResetStyles({
  boxSizing: "border-box",
  ...shorthands.padding(
    "0",
    tokens.spacingHorizontalM,
    tokens.spacingVerticalM,
    tokens.spacingHorizontalM,
  ),
  overflow: "hidden",
});

const usePanelStyles = makeStyles({
  open: {
    display: "block",
    animationName: {
      from: {
        opacity: 0,
        maxHeight: "0",
      },
      to: {
        opacity: 1,
        maxHeight: "500px",
      },
    },
    animationDuration: "0.2s",
    animationTimingFunction: "ease-in-out",
    animationFillMode: "forwards",
  },
  closed: {
    display: "none",
  },
});

const baseClassName = useResetStyles(useBaseClass);
const styles = useStyles(usePanelStyles);

const rootClass = computed(() =>
  mergeClasses(
    "fui-AccordionPanel",
    baseClassName.value,
    itemCtx.isOpen.value ? styles.value.open : styles.value.closed,
  ),
);
</script>

<template>
  <div :class="rootClass" role="region" v-bind="$attrs">
    <slot />
  </div>
</template>
