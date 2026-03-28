<script setup lang="ts">
import { computed } from "vue";
import { useStyles, useResetStyles, mergeClasses } from "@ntkrnl64/griffel-vue";
import { useTextStyles, useTextBaseClassName } from "./Text.styles";
import type { TextProps } from "./Text.types";

const props = withDefaults(defineProps<TextProps>(), {
  as: "span",
  size: 300,
  weight: "regular",
  align: "start",
  font: "base",
  italic: false,
  underline: false,
  strikethrough: false,
  truncate: false,
  block: false,
  wrap: true,
});

defineOptions({ inheritAttrs: false });

const styles = useStyles(useTextStyles);
const baseClassName = useResetStyles(useTextBaseClassName);

const rootClass = computed(() =>
  mergeClasses(
    "fui-Text",
    baseClassName.value,
    styles.value[props.size],
    styles.value[props.weight],
    props.align !== "start" && styles.value[props.align],
    props.font === "monospace" && styles.value.monospace,
    props.font === "numeric" && styles.value.numeric,
    props.italic && styles.value.italic,
    props.underline &&
      props.strikethrough &&
      styles.value.underlineStrikethrough,
    props.underline && !props.strikethrough && styles.value.underline,
    !props.underline && props.strikethrough && styles.value.strikethrough,
    props.truncate && styles.value.truncate,
    props.block && styles.value.block,
    !props.wrap && styles.value.nowrap,
  ),
);
</script>

<template>
  <component :is="as" :class="rootClass" v-bind="$attrs">
    <slot />
  </component>
</template>
