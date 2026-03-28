<script setup lang="ts">
import { inject } from "vue";
import {
  useResetStyles,
  mergeClasses,
  makeResetStyles,
  makeStyles,
  useStyles,
  shorthands,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";
import { CarouselContextKey } from "./context";

defineOptions({ inheritAttrs: false });
const ctx = inject(CarouselContextKey)!;

const useBaseClass = makeResetStyles({
  display: "flex",
  justifyContent: "center",
  gap: tokens.spacingHorizontalXS,
  ...shorthands.padding(tokens.spacingVerticalS, "0"),
});

const useDotStyles = makeStyles({
  dot: {
    width: "8px",
    height: "8px",
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
    :class="mergeClasses('fui-CarouselNav', baseClassName)"
    role="tablist"
    v-bind="$attrs"
  >
    <button
      v-for="i in ctx.totalItems.value"
      :key="i - 1"
      :class="
        mergeClasses(
          styles.dot,
          i - 1 === ctx.activeIndex.value && styles.active,
        )
      "
      role="tab"
      :aria-selected="i - 1 === ctx.activeIndex.value"
      @click="ctx.goTo(i - 1)"
    />
  </div>
</template>
