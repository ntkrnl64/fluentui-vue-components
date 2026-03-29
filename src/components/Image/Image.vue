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
  ...shorthands.borderColor(tokens.colorNeutralStroke1),
  borderRadius: tokens.borderRadiusNone,
  boxSizing: "border-box",
  display: "inline-block",
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
  none: { objectFit: "none", objectPosition: "left top" },
  fitFill: { height: "100%", width: "100%" },
  block: { width: "100%" },
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
    props.block && styles.value.block,
    props.bordered && styles.value.bordered,
    props.shadow && styles.value.shadow,
    props.fit !== "default" && styles.value[props.fit],
    props.fit !== "default" && styles.value.fitFill,
    props.shape === "circular" && styles.value.circular,
    props.shape === "rounded" && styles.value.rounded,
  ),
);
</script>

<template>
  <img :class="rootClass" v-bind="$attrs" />
</template>
