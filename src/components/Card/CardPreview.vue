<script setup lang="ts">
import { computed, useSlots } from "vue";
import { useStyles, mergeClasses, makeStyles } from "@ntkrnl64/griffel-vue";

defineOptions({ inheritAttrs: false });

const slots = useSlots();

const useCardPreviewStyles = makeStyles({
  root: {
    position: "relative",

    [`> :not(.fui-CardPreview__logo)`]: {
      display: "block",
      height: "100%",
      width: "100%",
    },
  },
  logo: {
    position: "absolute",
    bottom: "12px",
    left: "12px",
    width: "32px",
    height: "32px",
  },
});

const styles = useStyles(useCardPreviewStyles);

const rootClass = computed(() =>
  mergeClasses("fui-CardPreview", styles.value.root),
);

const logoClass = computed(() =>
  mergeClasses("fui-CardPreview__logo", styles.value.logo),
);
</script>

<template>
  <div :class="rootClass" v-bind="$attrs">
    <slot />
    <div v-if="slots.logo" :class="logoClass">
      <slot name="logo" />
    </div>
  </div>
</template>
