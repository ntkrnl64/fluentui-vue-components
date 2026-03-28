<script setup lang="ts">
import { ref, computed, watch, onUnmounted, inject } from "vue";
import { Play20Filled, Pause20Filled } from "@ntkrnl64/fluentui-vue-icons";
import {
  useResetStyles,
  mergeClasses,
  makeResetStyles,
  shorthands,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";
import { CarouselContextKey } from "./context";

export interface CarouselAutoplayButtonProps {
  autoplay?: boolean;
}

const props = withDefaults(defineProps<CarouselAutoplayButtonProps>(), {
  autoplay: false,
});
defineOptions({ inheritAttrs: false });
const ctx = inject(CarouselContextKey)!;

const playing = ref(props.autoplay);
let intervalId: ReturnType<typeof setInterval> | null = null;

const useBaseClass = makeResetStyles({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "32px",
  height: "32px",
  ...shorthands.borderRadius(tokens.borderRadiusCircular),
  border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
  backgroundColor: tokens.colorNeutralBackground1,
  color: tokens.colorNeutralForeground1,
  cursor: "pointer",
  outlineStyle: "none",
  ...shorthands.padding("0"),
  ":hover": { backgroundColor: tokens.colorNeutralBackground1Hover },
  ":hover:active": { backgroundColor: tokens.colorNeutralBackground1Pressed },
  ":focus-visible": {
    outlineColor: tokens.colorStrokeFocus2,
    outlineWidth: tokens.strokeWidthThick,
    outlineStyle: "solid",
    outlineOffset: "2px",
  },
});

const baseClassName = useResetStyles(useBaseClass);

function startAutoplay() {
  stopAutoplay();
  intervalId = setInterval(() => ctx.next(), 3000);
}

function stopAutoplay() {
  if (intervalId !== null) {
    clearInterval(intervalId);
    intervalId = null;
  }
}

function toggle() {
  playing.value = !playing.value;
}

watch(
  playing,
  (val) => {
    if (val) startAutoplay();
    else stopAutoplay();
  },
  { immediate: true },
);

onUnmounted(() => stopAutoplay());
</script>

<template>
  <button
    :class="mergeClasses('fui-CarouselAutoplayButton', baseClassName)"
    type="button"
    :aria-label="playing ? 'Pause' : 'Play'"
    v-bind="$attrs"
    @click="toggle"
  >
    <Pause20Filled v-if="playing" />
    <Play20Filled v-else />
  </button>
</template>
