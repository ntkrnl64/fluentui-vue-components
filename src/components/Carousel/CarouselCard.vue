<script setup lang="ts">
import { inject, ref, computed, onMounted } from "vue";
import { CarouselContextKey } from "./context";

defineOptions({ inheritAttrs: false });
const ctx = inject(CarouselContextKey)!;

const myIndex = ref(-1);
onMounted(() => {
  myIndex.value = ctx.registerItem();
});

const isActive = computed(() => myIndex.value === ctx.activeIndex.value);
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
