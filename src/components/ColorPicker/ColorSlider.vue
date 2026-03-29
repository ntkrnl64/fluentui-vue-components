<script setup lang="ts">
import { inject, computed } from "vue";
import {
  useResetStyles,
  mergeClasses,
  makeResetStyles,
  shorthands,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";
import { ColorPickerContextKey } from "./context";

export interface ColorSliderProps {
  channel?: "hue" | "alpha";
  vertical?: boolean;
}

const props = withDefaults(defineProps<ColorSliderProps>(), {
  channel: "hue",
  vertical: false,
});
defineOptions({ inheritAttrs: false });
const ctx = inject(ColorPickerContextKey)!;

const useBaseClass = makeResetStyles({
  position: "relative",
  ...shorthands.borderRadius(tokens.borderRadiusMedium),
  overflow: "hidden",
});

const baseClassName = useResetStyles(useBaseClass);

const sliderStyle = computed(() => {
  if (props.channel === "hue") {
    return {
      width: props.vertical ? "24px" : "100%",
      height: props.vertical ? "200px" : "24px",
      background:
        "linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)",
    };
  }
  return {
    width: "100%",
    height: "24px",
    background: `linear-gradient(to right, transparent, hsl(${ctx.color.value.h}, 100%, 50%))`,
  };
});

const value = computed(() =>
  props.channel === "hue" ? ctx.color.value.h : ctx.color.value.a * 100,
);
const max = computed(() => (props.channel === "hue" ? 360 : 100));

function onInput(event: Event) {
  const v = Number((event.target as HTMLInputElement).value);
  if (props.channel === "hue") ctx.setColor({ h: v });
  else ctx.setColor({ a: v / 100 });
}
</script>

<template>
  <div
    :class="mergeClasses('fui-ColorSlider', baseClassName)"
    :style="sliderStyle"
    v-bind="$attrs"
  >
    <input
      type="range"
      :min="0"
      :max="max"
      :value="value"
      style="
        width: 100%;
        height: 100%;
        opacity: 0;
        cursor: pointer;
        position: absolute;
        inset: 0;
        margin: 0;
      "
      @input="onInput"
    />
  </div>
</template>
