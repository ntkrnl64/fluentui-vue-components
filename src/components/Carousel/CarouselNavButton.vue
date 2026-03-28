<script setup lang="ts">
import { inject } from "vue";
import { CarouselContextKey } from "./context";

export interface CarouselNavButtonProps {
  navType: "prev" | "next";
}

const props = defineProps<CarouselNavButtonProps>();
const ctx = inject(CarouselContextKey)!;

function handleClick() {
  if (props.navType === "prev") ctx.prev();
  else ctx.next();
}
</script>

<template>
  <slot
    :onClick="handleClick"
    :aria-label="navType === 'prev' ? 'Previous' : 'Next'"
  />
</template>
