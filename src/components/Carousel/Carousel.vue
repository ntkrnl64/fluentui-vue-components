<script setup lang="ts">
import { provide, ref } from "vue";
import {
  useResetStyles,
  mergeClasses,
  makeResetStyles,
} from "@ntkrnl64/griffel-vue";
import { CarouselContextKey } from "./context";

export interface CarouselProps {
  circular?: boolean;
}

const props = withDefaults(defineProps<CarouselProps>(), { circular: false });
defineOptions({ inheritAttrs: false });

const activeIndex = ref(0);
const totalItems = ref(0);

function goTo(index: number) {
  if (index >= 0 && index < totalItems.value) activeIndex.value = index;
  else if (props.circular)
    activeIndex.value =
      ((index % totalItems.value) + totalItems.value) % totalItems.value;
}
function next() {
  goTo(activeIndex.value + 1);
}
function prev() {
  goTo(activeIndex.value - 1);
}
function registerItem() {
  return totalItems.value++;
}

const useBaseClass = makeResetStyles({
  position: "relative",
  overflow: "hidden",
  width: "100%",
});
const baseClassName = useResetStyles(useBaseClass);

provide(CarouselContextKey, {
  activeIndex,
  totalItems,
  goTo,
  next,
  prev,
  registerItem,
});
</script>

<template>
  <div
    :class="mergeClasses('fui-Carousel', baseClassName)"
    role="region"
    aria-roledescription="carousel"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>
