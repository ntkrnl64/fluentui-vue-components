<script setup lang="ts">
import { computed, useSlots } from "vue";
import {
  useStyles,
  mergeClasses,
  makeStyles,
  shorthands,
} from "@ntkrnl64/griffel-vue";

defineOptions({ inheritAttrs: false });

const slots = useSlots();

/**
 * CSS variable names used internally for uniform styling in CardHeader.
 */
const cardHeaderCSSVars = {
  cardHeaderGapVar: "--fui-CardHeader--gap",
};

const useBaseStyles = makeStyles({
  root: {
    [cardHeaderCSSVars.cardHeaderGapVar]: "12px",
    alignItems: "center",
  },
  image: {
    display: "inline-flex",
    marginRight: `var(${cardHeaderCSSVars.cardHeaderGapVar})`,
  },
  header: {
    display: "flex",
  },
  description: {
    display: "flex",
  },
  action: {
    marginLeft: `var(${cardHeaderCSSVars.cardHeaderGapVar})`,

    // when the card is selected or hovered, it has custom high contrast color and background styles
    // setting this ensures action buttons adopt those colors and are still visible in forced-colors mode
    "@media (forced-colors: active)": {
      "& .fui-Button, & .fui-Link": {
        ...shorthands.borderColor("currentColor"),
        color: "currentColor",
        outlineColor: "currentColor",
      },
    },
  },
});

// Grid layout: used when description slot is present
const useGridStyles = makeStyles({
  root: {
    display: "grid",
    gridAutoColumns: "min-content 1fr min-content",
  },
  image: {
    gridColumnStart: "1",
    gridRowStart: "span 2",
  },
  header: {
    gridColumnStart: "2",
    gridRowStart: "1",
  },
  description: {
    gridColumnStart: "2",
    gridRowStart: "2",
  },
  action: {
    gridColumnStart: "3",
    gridRowStart: "span 2",
  },
});

// Flex layout: used when no description slot
const useFlexStyles = makeStyles({
  root: {
    display: "flex",
  },
  header: {
    flexGrow: 1,
  },
});

const baseStyles = useStyles(useBaseStyles);
const gridStyles = useStyles(useGridStyles);
const flexStyles = useStyles(useFlexStyles);

const hasDescription = computed(() => !!slots.description);

const rootClass = computed(() =>
  mergeClasses(
    "fui-CardHeader",
    baseStyles.value.root,
    hasDescription.value ? gridStyles.value.root : flexStyles.value.root,
  ),
);

const imageClass = computed(() =>
  mergeClasses(
    "fui-CardHeader__image",
    baseStyles.value.image,
    hasDescription.value ? gridStyles.value.image : undefined,
  ),
);

const headerClass = computed(() =>
  mergeClasses(
    "fui-CardHeader__header",
    baseStyles.value.header,
    hasDescription.value ? gridStyles.value.header : flexStyles.value.header,
  ),
);

const descriptionClass = computed(() =>
  mergeClasses(
    "fui-CardHeader__description",
    baseStyles.value.description,
    gridStyles.value.description,
  ),
);

const actionClass = computed(() =>
  mergeClasses(
    "fui-CardHeader__action",
    baseStyles.value.action,
    hasDescription.value ? gridStyles.value.action : undefined,
  ),
);
</script>

<template>
  <div :class="rootClass" v-bind="$attrs">
    <div v-if="slots.image" :class="imageClass">
      <slot name="image" />
    </div>
    <div :class="headerClass">
      <slot name="header" />
    </div>
    <div v-if="slots.description" :class="descriptionClass">
      <slot name="description" />
    </div>
    <div v-if="slots.action" :class="actionClass">
      <slot name="action" />
    </div>
  </div>
</template>
