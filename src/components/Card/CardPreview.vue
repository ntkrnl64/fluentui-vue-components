<script setup lang="ts">
import { computed } from "vue";
import {
  useResetStyles,
  mergeClasses,
  makeResetStyles,
} from "@ntkrnl64/griffel-vue";

defineOptions({ inheritAttrs: false });

const useBaseClass = makeResetStyles({
  display: "flex",
  position: "relative",
  overflow: "hidden",
  marginLeft: "calc(-1 * var(--fui-card-padding, 12px))",
  marginRight: "calc(-1 * var(--fui-card-padding, 12px))",
  ":first-child": {
    marginTop: "calc(-1 * var(--fui-card-padding, 12px))",
    "> img": {
      borderTopLeftRadius: "inherit",
      borderTopRightRadius: "inherit",
    },
  },
  ":last-child": {
    marginBottom: "calc(-1 * var(--fui-card-padding, 12px))",
    "> img": {
      borderBottomLeftRadius: "inherit",
      borderBottomRightRadius: "inherit",
    },
  },
  "> img": {
    width: "100%",
    height: "auto",
    display: "block",
  },
});

const baseClassName = useResetStyles(useBaseClass);

const rootClass = computed(() =>
  mergeClasses("fui-CardPreview", baseClassName.value),
);
</script>

<template>
  <div :class="rootClass" v-bind="$attrs">
    <slot />
  </div>
</template>
