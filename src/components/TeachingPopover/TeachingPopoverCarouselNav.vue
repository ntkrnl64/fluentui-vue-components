<script setup lang="ts">
import { inject } from "vue";
import {
  useStyles,
  useResetStyles,
  mergeClasses,
  makeStyles,
  makeResetStyles,
  shorthands,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";
import { TeachingPopoverContextKey } from "./context";

defineOptions({ inheritAttrs: false });
const ctx = inject(TeachingPopoverContextKey)!;

const useBaseClass = makeResetStyles({
  display: "flex",
  justifyContent: "center",
  gap: tokens.spacingHorizontalXS,
  ...shorthands.padding(tokens.spacingVerticalXS, "0"),
});

const useDotStyles = makeStyles({
  dot: {
    width: "6px",
    height: "6px",
    ...shorthands.borderRadius(tokens.borderRadiusCircular),
    backgroundColor: tokens.colorNeutralForeground3,
    border: "none",
    cursor: "pointer",
    ...shorthands.padding("0"),
    transitionProperty: "background-color",
    transitionDuration: tokens.durationFast,
  },
  active: { backgroundColor: tokens.colorBrandBackground },
});

const baseClassName = useResetStyles(useBaseClass);
const styles = useStyles(useDotStyles);
</script>

<template>
  <div
    :class="mergeClasses('fui-TeachingPopoverCarouselNav', baseClassName)"
    role="tablist"
    v-bind="$attrs"
  >
    <button
      v-for="i in ctx.totalPages.value"
      :key="i - 1"
      :class="
        mergeClasses(
          styles.dot,
          i - 1 === ctx.currentPage.value && styles.active,
        )
      "
      role="tab"
      :aria-selected="i - 1 === ctx.currentPage.value"
      :aria-label="`Page ${i}`"
      @click="ctx.currentPage.value = i - 1"
    />
  </div>
</template>
