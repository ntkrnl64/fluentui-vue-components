<script setup lang="ts">
import { inject } from "vue";
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

export interface CarouselNavImageButtonProps {
  image?: string;
}

const props = defineProps<CarouselNavImageButtonProps>();
defineOptions({ inheritAttrs: false });
const ctx = inject(CarouselContextKey)!;

const useBaseClass = makeResetStyles({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "40px",
  height: "28px",
  ...shorthands.borderRadius(tokens.borderRadiusSmall),
  border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
  backgroundColor: tokens.colorNeutralBackground1,
  cursor: "pointer",
  outlineStyle: "none",
  overflow: "hidden",
  ...shorthands.padding("0"),
  ":hover": { ...shorthands.borderColor(tokens.colorNeutralStroke1Hover) },
  ":focus-visible": {
    outlineColor: tokens.colorStrokeFocus2,
    outlineWidth: tokens.strokeWidthThick,
    outlineStyle: "solid",
    outlineOffset: "2px",
  },
});

const useNavImageStyles = makeStyles({
  active: {
    ...shorthands.borderColor(tokens.colorBrandStroke1),
    ...shorthands.borderWidth("2px"),
  },
  image: { width: "100%", height: "100%", objectFit: "cover" },
});

const baseClassName = useResetStyles(useBaseClass);
const styles = useStyles(useNavImageStyles);
</script>

<template>
  <button
    v-for="i in ctx.totalItems.value"
    :key="i - 1"
    :class="
      mergeClasses(
        'fui-CarouselNavImageButton',
        baseClassName,
        i - 1 === ctx.activeIndex.value && styles.active,
      )
    "
    role="tab"
    :aria-selected="i - 1 === ctx.activeIndex.value"
    v-bind="$attrs"
    @click="ctx.goTo(i - 1)"
  >
    <img v-if="image" :class="styles.image" :src="image" alt="" />
  </button>
</template>
