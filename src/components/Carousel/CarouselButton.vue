<script setup lang="ts">
import { inject, computed } from "vue";
import {
  ArrowLeft20Regular,
  ArrowRight20Regular,
} from "@ntkrnl64/fluentui-vue-icons";
import {
  useStyles,
  useResetStyles,
  mergeClasses,
  makeStyles,
  makeResetStyles,
  shorthands,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";
import { CarouselContextKey } from "./context";

export interface CarouselButtonProps {
  navType: "prev" | "next";
}

const props = defineProps<CarouselButtonProps>();
defineOptions({ inheritAttrs: false });
const ctx = inject(CarouselContextKey)!;

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

const useButtonStyles = makeStyles({
  disabled: { opacity: 0.4, cursor: "not-allowed" },
});

const baseClassName = useResetStyles(useBaseClass);
const styles = useStyles(useButtonStyles);

const isDisabled = computed(() => {
  if (props.navType === "prev") return ctx.activeIndex.value === 0;
  return ctx.activeIndex.value >= ctx.totalItems.value - 1;
});

const rootClass = computed(() =>
  mergeClasses(
    "fui-CarouselButton",
    baseClassName.value,
    isDisabled.value && styles.value.disabled,
  ),
);

function handleClick() {
  if (isDisabled.value) return;
  if (props.navType === "prev") ctx.prev();
  else ctx.next();
}
</script>

<template>
  <button
    :class="rootClass"
    type="button"
    :aria-label="navType === 'prev' ? 'Previous' : 'Next'"
    :disabled="isDisabled"
    v-bind="$attrs"
    @click="handleClick"
  >
    <ArrowLeft20Regular v-if="navType === 'prev'" />
    <ArrowRight20Regular v-else />
  </button>
</template>
