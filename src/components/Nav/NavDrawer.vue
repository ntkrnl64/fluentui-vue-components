<script setup lang="ts">
import { provide, computed } from "vue";
import {
  useStyles,
  useResetStyles,
  mergeClasses,
  makeStyles,
  makeResetStyles,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";
import { NavContextKey } from "./context";
import type { NavSize } from "./context";

export interface NavDrawerProps {
  open?: boolean;
  type?: "overlay" | "inline";
  position?: "start" | "end";
  size?: "small" | "medium";
}

const props = withDefaults(defineProps<NavDrawerProps>(), {
  open: false,
  type: "inline",
  position: "start",
  size: "medium",
});

const emit = defineEmits<{ "update:open": [value: boolean] }>();
defineOptions({ inheritAttrs: false });

const selectedValue = defineModel<string>("selectedValue", { default: "" });

function selectItem(value: string) {
  selectedValue.value = value;
}

const navSize: NavSize = props.size === "small" ? "small" : "medium";

const useBaseClass = makeResetStyles({
  display: "flex",
  flexDirection: "column",
  fontFamily: tokens.fontFamilyBase,
  boxSizing: "border-box",
  backgroundColor: tokens.colorNeutralBackground1,
  color: tokens.colorNeutralForeground1,
  height: "100%",
  overflow: "hidden",
  transitionProperty: "width, min-width",
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
  small: { width: "240px" },
  medium: { width: "320px" },
  closed: { width: "0px", minWidth: "0px", overflow: "hidden" },
  overlay: {
    position: "fixed",
    top: "0",
    bottom: "0",
    zIndex: 1000000,
    boxShadow: tokens.shadow64,
  },
  overlayStart: { left: "0" },
  overlayEnd: { right: "0" },
});

const baseClassName = useResetStyles(useBaseClass);
const styles = useStyles(useDrawerStyles);

const rootClass = computed(() =>
  mergeClasses(
    "fui-NavDrawer",
    baseClassName.value,
    styles.value[props.position],
    props.open ? styles.value[props.size] : styles.value.closed,
    props.type === "overlay" && styles.value.overlay,
    props.type === "overlay" &&
      props.position === "start" &&
      styles.value.overlayStart,
    props.type === "overlay" &&
      props.position === "end" &&
      styles.value.overlayEnd,
  ),
);

provide(NavContextKey, {
  size: navSize,
  selectedValue,
  selectItem,
});
</script>

<template>
  <nav :class="rootClass" v-bind="$attrs">
    <template v-if="open">
      <slot />
    </template>
  </nav>
</template>
