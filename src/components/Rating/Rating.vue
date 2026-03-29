<script setup lang="ts">
import { computed, provide, ref } from "vue";
import {
  useResetStyles,
  mergeClasses,
  makeResetStyles,
} from "@ntkrnl64/griffel-vue";
import { useId } from "../../composables/useId";
import { RatingItemContextKey } from "./context";
import type { RatingColor, RatingSize } from "./context";

export interface RatingProps {
  max?: number;
  step?: 0.5 | 1;
  size?: RatingSize;
  color?: RatingColor;
  name?: string;
}

const props = withDefaults(defineProps<RatingProps>(), {
  max: 5,
  step: 1,
  size: "extra-large",
  color: "neutral",
});

defineOptions({ inheritAttrs: false });
const modelValue = defineModel<number>({ default: 0 });
const hoveredValue = ref<number | undefined>(undefined);
const generatedName = useId("rating-");
const name = computed(() => props.name ?? generatedName);

const useRootClassName = makeResetStyles({
  display: "flex",
  flexWrap: "wrap",
});

const rootClassName = useResetStyles(useRootClassName);
const rootClass = computed(() =>
  mergeClasses("fui-Rating", rootClassName.value),
);

// Handle change from radio inputs bubbling up
function handleChange(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target.type === "radio" && target.name === name.value) {
    const newValue = parseFloat(target.value);
    if (!isNaN(newValue)) {
      modelValue.value = newValue;
    }
  }
}

function handleMouseOver(event: MouseEvent) {
  const target = event.target as HTMLInputElement;
  if (target.type === "radio" && target.name === name.value) {
    const newValue = parseFloat(target.value);
    if (!isNaN(newValue)) {
      hoveredValue.value = newValue;
    }
  }
}

function handleMouseLeave() {
  hoveredValue.value = undefined;
}

provide(RatingItemContextKey, {
  value: modelValue,
  hoveredValue,
  step: props.step,
  name: name.value,
  color: props.color,
  size: props.size,
  interactive: true,
  itemLabel: undefined,
});
</script>

<template>
  <div
    :class="rootClass"
    role="radiogroup"
    v-bind="$attrs"
    @change="handleChange"
    @mouseover="handleMouseOver"
    @mouseleave="handleMouseLeave"
  >
    <slot>
      <RatingItem v-for="i in max" :key="i" :value="i" />
    </slot>
  </div>
</template>

<script lang="ts">
import RatingItem from "./RatingItem.vue";
</script>
