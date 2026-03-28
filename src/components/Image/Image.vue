<script setup lang="ts">
import { computed } from "vue";
import {
  useStyles,
  useResetStyles,
  mergeClasses,
  makeStyles,
  makeResetStyles,
  shorthands,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";

export interface ImageProps {
  bordered?: boolean;
  fit?: "none" | "center" | "contain" | "cover" | "default";
  block?: boolean;
  shape?: "square" | "circular" | "rounded";
  shadow?: boolean;
}

const props = withDefaults(defineProps<ImageProps>(), {
  bordered: false,
  fit: "default",
  block: false,
  shape: "square",
  shadow: false,
});

defineOptions({ inheritAttrs: false });

const useBaseClass = makeResetStyles({
  ...shorthands.borderColor(tokens.colorNeutralStroke2),
  ...shorthands.borderRadius(tokens.borderRadiusNone),
  boxSizing: "content-box",
  display: "inline-block",
  verticalAlign: "middle",
});

const useImageStyles = makeStyles({
  bordered: {
    ...shorthands.borderStyle("solid"),
    ...shorthands.borderWidth(tokens.strokeWidthThin),
  },
  center: { objectFit: "none", objectPosition: "center" },
  contain: {
    objectFit: "contain",
    objectPosition: "center",
    height: "100%",
    width: "100%",
  },
  cover: {
    objectFit: "cover",
    objectPosition: "center",
    height: "100%",
    width: "100%",
  },
  none: { objectFit: "none" },
  block: { display: "block", width: "100%" },
  circular: { ...shorthands.borderRadius(tokens.borderRadiusCircular) },
  rounded: { ...shorthands.borderRadius(tokens.borderRadiusMedium) },
  shadow: { boxShadow: tokens.shadow4 },
});

const baseClassName = useResetStyles(useBaseClass);
const styles = useStyles(useImageStyles);

const rootClass = computed(() =>
  mergeClasses(
    "fui-Image",
    baseClassName.value,
    props.bordered && styles.value.bordered,
    props.fit !== "default" && styles.value[props.fit],
    props.block && styles.value.block,
    props.shape === "circular" && styles.value.circular,
    props.shape === "rounded" && styles.value.rounded,
    props.shadow && styles.value.shadow,
  ),
);
</script>

<template>
  <img :class="rootClass" v-bind="$attrs" />
</template>
