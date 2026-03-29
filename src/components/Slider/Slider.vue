<script setup lang="ts">
import { computed, ref } from "vue";
import {
  useStyles,
  useResetStyles,
  mergeClasses,
  makeStyles,
  makeResetStyles,
  shorthands,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";

export type SliderSize = "small" | "medium";

export interface SliderProps {
  min?: number;
  max?: number;
  step?: number;
  size?: SliderSize;
  vertical?: boolean;
  disabled?: boolean;
}

const props = withDefaults(defineProps<SliderProps>(), {
  min: 0,
  max: 100,
  step: 1,
  size: "medium",
  vertical: false,
  disabled: false,
});

defineOptions({ inheritAttrs: false });
const modelValue = defineModel<number>({ default: 0 });

const percentage = computed(
  () => ((modelValue.value - props.min) / (props.max - props.min)) * 100,
);

// CSS variable values injected as inline style
const cssVars = computed(
  () =>
    ({
      "--fui-Slider--progress": `${percentage.value}%`,
      "--fui-Slider--direction": props.vertical ? "0deg" : "90deg",
    }) as Record<string, string>,
);

const useRootBaseClass = makeResetStyles({
  position: "relative",
  display: "inline-grid",
  touchAction: "none",
  alignItems: "center",
  justifyItems: "center",
});

const useSliderStyles = makeStyles({
  // Sizes
  small: {
    "--fui-Slider__thumb--size": "16px",
    "--fui-Slider__inner-thumb--radius": "5px",
    "--fui-Slider__rail--size": "2px",
    minHeight: "24px",
  } as Record<string, string>,
  medium: {
    "--fui-Slider__thumb--size": "20px",
    "--fui-Slider__inner-thumb--radius": "6px",
    "--fui-Slider__rail--size": "4px",
    minHeight: "32px",
  } as Record<string, string>,

  // Orientation
  horizontal: {
    minWidth: "120px",
    gridTemplateRows: "1fr var(--fui-Slider__thumb--size) 1fr",
    gridTemplateColumns: "1fr calc(100% - var(--fui-Slider__thumb--size)) 1fr",
  } as Record<string, string>,
  vertical: {
    minHeight: "120px",
    gridTemplateRows: "1fr calc(100% - var(--fui-Slider__thumb--size)) 1fr",
    gridTemplateColumns: "1fr var(--fui-Slider__thumb--size) 1fr",
  } as Record<string, string>,

  // States
  enabled: {
    "--fui-Slider__rail--color": tokens.colorNeutralStrokeAccessible,
    "--fui-Slider__progress--color": tokens.colorCompoundBrandBackground,
    "--fui-Slider__thumb--color": tokens.colorCompoundBrandBackground,
    cursor: "pointer",
    ":hover": {
      "--fui-Slider__thumb--color": tokens.colorCompoundBrandBackgroundHover,
      "--fui-Slider__progress--color": tokens.colorCompoundBrandBackgroundHover,
    },
    ":active": {
      "--fui-Slider__thumb--color": tokens.colorCompoundBrandBackgroundPressed,
      "--fui-Slider__progress--color":
        tokens.colorCompoundBrandBackgroundPressed,
    },
  } as Record<string, string>,
  disabled: {
    "--fui-Slider__thumb--color": tokens.colorNeutralForegroundDisabled,
    "--fui-Slider__rail--color": tokens.colorNeutralBackgroundDisabled,
    "--fui-Slider__progress--color": tokens.colorNeutralForegroundDisabled,
    cursor: "not-allowed",
  } as Record<string, string>,

  // Rail - uses gradient for progress fill
  rail: {
    ...shorthands.borderRadius(tokens.borderRadiusXLarge),
    pointerEvents: "none",
    gridRowStart: "2",
    gridRowEnd: "2",
    gridColumnStart: "2",
    gridColumnEnd: "2",
    position: "relative",
    outlineWidth: "1px",
    outlineStyle: "solid",
    outlineColor: tokens.colorTransparentStroke,
    backgroundImage: `linear-gradient(
      var(--fui-Slider--direction),
      var(--fui-Slider__progress--color) 0%,
      var(--fui-Slider__progress--color) var(--fui-Slider--progress),
      var(--fui-Slider__rail--color) var(--fui-Slider--progress)
    )`,
  } as Record<string, string>,
  railHorizontal: {
    width: "100%",
    height: "var(--fui-Slider__rail--size)",
  } as Record<string, string>,
  railVertical: {
    width: "var(--fui-Slider__rail--size)",
    height: "100%",
  } as Record<string, string>,

  // Thumb - clamp keeps it within rail bounds
  thumb: {
    "--fui-Slider__thumb--position":
      "clamp(var(--fui-Slider__inner-thumb--radius), var(--fui-Slider--progress), calc(100% - var(--fui-Slider__inner-thumb--radius)))",
    gridRowStart: "2",
    gridRowEnd: "2",
    gridColumnStart: "2",
    gridColumnEnd: "2",
    position: "absolute",
    width: "var(--fui-Slider__thumb--size)",
    height: "var(--fui-Slider__thumb--size)",
    pointerEvents: "none",
    outlineStyle: "none",
    ...shorthands.borderRadius(tokens.borderRadiusCircular),
    boxShadow: `0 0 0 calc(var(--fui-Slider__thumb--size) * .2) ${tokens.colorNeutralBackground1} inset`,
    backgroundColor: "var(--fui-Slider__thumb--color)",
    "::before": {
      position: "absolute",
      top: "0px",
      left: "0px",
      bottom: "0px",
      right: "0px",
      ...shorthands.borderRadius(tokens.borderRadiusCircular),
      boxSizing: "border-box",
      content: "''",
      border: `calc(var(--fui-Slider__thumb--size) * .05) solid ${tokens.colorNeutralStroke1}`,
    },
  } as Record<string, string>,
  thumbHorizontal: {
    transform: "translateX(-50%)",
    left: "var(--fui-Slider__thumb--position)",
  } as Record<string, string>,
  thumbVertical: {
    transform: "translateY(50%)",
    bottom: "var(--fui-Slider__thumb--position)",
  } as Record<string, string>,

  // Hidden input - stretches across entire grid
  input: {
    cursor: "inherit",
    opacity: 0,
    gridRowStart: "1",
    gridRowEnd: "-1",
    gridColumnStart: "1",
    gridColumnEnd: "-1",
    ...shorthands.padding("0"),
    margin: "0",
  },
  inputHorizontal: {
    height: "var(--fui-Slider__thumb--size)",
    width: "100%",
  } as Record<string, string>,
  inputVertical: {
    height: "100%",
    width: "var(--fui-Slider__thumb--size)",
  } as Record<string, string>,

  // Focus indicator
  focusVisible: {
    ":focus-within": {
      outlineColor: tokens.colorStrokeFocus2,
      outlineWidth: tokens.strokeWidthThick,
      outlineStyle: "solid",
      outlineOffset: "2px",
      ...shorthands.borderRadius(tokens.borderRadiusMedium),
    },
  },
});

const baseClassName = useResetStyles(useRootBaseClass);
const styles = useStyles(useSliderStyles);

const rootClass = computed(() =>
  mergeClasses(
    "fui-Slider",
    baseClassName.value,
    styles.value[props.size],
    props.vertical ? styles.value.vertical : styles.value.horizontal,
    props.disabled ? styles.value.disabled : styles.value.enabled,
    styles.value.focusVisible,
  ),
);

const railClass = computed(() =>
  mergeClasses(
    styles.value.rail,
    props.vertical ? styles.value.railVertical : styles.value.railHorizontal,
  ),
);

const thumbClass = computed(() =>
  mergeClasses(
    styles.value.thumb,
    props.vertical ? styles.value.thumbVertical : styles.value.thumbHorizontal,
  ),
);

const inputClass = computed(() =>
  mergeClasses(
    styles.value.input,
    props.vertical ? styles.value.inputVertical : styles.value.inputHorizontal,
  ),
);

function onInput(event: Event) {
  modelValue.value = Number((event.target as HTMLInputElement).value);
}
</script>

<template>
  <div :class="rootClass" :style="cssVars" v-bind="$attrs">
    <div :class="railClass" />
    <div :class="thumbClass" />
    <input
      :class="inputClass"
      type="range"
      :min="min"
      :max="max"
      :step="step"
      :value="modelValue"
      :disabled="disabled"
      :aria-orientation="vertical ? 'vertical' : 'horizontal'"
      @input="onInput"
    />
  </div>
</template>
