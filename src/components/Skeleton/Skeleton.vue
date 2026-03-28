<script setup lang="ts">
import { computed } from "vue";
import {
  useStyles,
  useResetStyles,
  mergeClasses,
  makeStyles,
  makeResetStyles,
  shorthands,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";

export type SkeletonAppearance = "opaque" | "translucent";

export interface SkeletonProps {
  appearance?: SkeletonAppearance;
}

const props = withDefaults(defineProps<SkeletonProps>(), {
  appearance: "opaque",
});

defineOptions({ inheritAttrs: false });

const useBaseClass = makeResetStyles({
  position: "relative",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  gap: tokens.spacingVerticalS,
});

const baseClassName = useResetStyles(useBaseClass);

const rootClass = computed(() =>
  mergeClasses("fui-Skeleton", baseClassName.value),
);
</script>

<template>
  <div :class="rootClass" v-bind="$attrs">
    <slot />
  </div>
</template>
