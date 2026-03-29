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

const useCardFooterStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    gap: "12px",
  },
  action: {
    marginLeft: "auto",

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

const styles = useStyles(useCardFooterStyles);

const rootClass = computed(() =>
  mergeClasses("fui-CardFooter", styles.value.root),
);

const actionClass = computed(() =>
  mergeClasses("fui-CardFooter__action", styles.value.action),
);
</script>

<template>
  <div :class="rootClass" v-bind="$attrs">
    <slot />
    <div v-if="slots.action" :class="actionClass">
      <slot name="action" />
    </div>
  </div>
</template>
