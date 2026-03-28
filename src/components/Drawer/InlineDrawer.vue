<script setup lang="ts">
import { computed } from "vue";
import {
  useStyles,
  useResetStyles,
  mergeClasses,
  makeStyles,
  makeResetStyles,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";

export interface InlineDrawerProps {
  open?: boolean;
  position?: "start" | "end";
  size?: "small" | "medium" | "large" | "full";
}

const props = withDefaults(defineProps<InlineDrawerProps>(), {
  open: false,
  position: "start",
  size: "small",
});

defineOptions({ inheritAttrs: false });

const useBaseClass = makeResetStyles({
  display: "flex",
  flexDirection: "column",
  backgroundColor: tokens.colorNeutralBackground1,
  color: tokens.colorNeutralForeground1,
  boxShadow: tokens.shadow16,
  overflow: "hidden",
  height: "100%",
  transitionProperty: "width, min-width, max-width",
  transitionDuration: tokens.durationNormal,
  transitionTimingFunction: tokens.curveDecelerateMax,
});

const useDrawerStyles = makeStyles({
  start: {
    borderRight: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
  },
  end: {
    borderLeft: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
  },
  small: { width: "320px" },
  medium: { width: "592px" },
  large: { width: "940px" },
  full: { width: "100vw" },
  closed: {
    width: "0px",
    minWidth: "0px",
    overflow: "hidden",
  },
});

const baseClassName = useResetStyles(useBaseClass);
const styles = useStyles(useDrawerStyles);

const rootClass = computed(() =>
  mergeClasses(
    "fui-InlineDrawer",
    baseClassName.value,
    styles.value[props.position],
    props.open ? styles.value[props.size] : styles.value.closed,
  ),
);
</script>

<template>
  <div :class="rootClass" v-bind="$attrs">
    <template v-if="open">
      <slot />
    </template>
  </div>
</template>
