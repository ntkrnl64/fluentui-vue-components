<script setup lang="ts">
import { computed, provide } from "vue";
import { mergeClasses } from "@ntkrnl64/griffel-vue";
import { SkeletonContextKey } from "./context";
import type { SkeletonAnimation, SkeletonAppearance } from "./context";

export interface SkeletonProps {
  animation?: SkeletonAnimation;
  appearance?: SkeletonAppearance;
}

const props = withDefaults(defineProps<SkeletonProps>(), {
  animation: "wave",
  appearance: "opaque",
});

defineOptions({ inheritAttrs: false });

const rootClass = computed(() => mergeClasses("fui-Skeleton"));

provide(SkeletonContextKey, {
  animation: props.animation,
  appearance: props.appearance,
});
</script>

<template>
  <div :class="rootClass" role="progressbar" aria-busy="true" v-bind="$attrs">
    <slot />
  </div>
</template>
