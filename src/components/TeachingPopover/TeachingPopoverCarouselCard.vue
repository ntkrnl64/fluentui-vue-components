<script setup lang="ts">
import { inject, computed } from "vue";
import { TeachingPopoverContextKey } from "./context";

export interface TeachingPopoverCarouselCardProps {
  value: number;
}

const props = defineProps<TeachingPopoverCarouselCardProps>();
defineOptions({ inheritAttrs: false });
const ctx = inject(TeachingPopoverContextKey)!;

const isActive = computed(() => ctx.currentPage.value === props.value);
</script>

<template>
  <div
    v-show="isActive"
    role="tabpanel"
    :aria-hidden="!isActive"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>
