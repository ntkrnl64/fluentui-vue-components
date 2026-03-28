<script setup lang="ts">
import { provide, computed } from "vue";
import {
  useResetStyles,
  useStyles,
  mergeClasses,
  makeResetStyles,
  makeStyles,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";
import { ToolbarContextKey } from "./context";
import type { ToolbarSize } from "./context";

export interface ToolbarProps {
  size?: ToolbarSize;
  vertical?: boolean;
}

const props = withDefaults(defineProps<ToolbarProps>(), {
  size: "medium",
  vertical: false,
});

defineOptions({ inheritAttrs: false });

const useBaseClass = makeResetStyles({
  display: "flex",
  alignItems: "center",
  boxSizing: "border-box",
  flexShrink: 0,
  position: "relative",
});

const useToolbarStyles = makeStyles({
  horizontal: {
    flexDirection: "row",
    columnGap: tokens.spacingHorizontalSNudge,
    paddingLeft: tokens.spacingHorizontalS,
    paddingRight: tokens.spacingHorizontalS,
  },
  vertical: {
    flexDirection: "column",
    rowGap: tokens.spacingVerticalSNudge,
    paddingTop: tokens.spacingVerticalS,
    paddingBottom: tokens.spacingVerticalS,
  },
  small: {
    minHeight: "32px",
  },
  medium: {
    minHeight: "40px",
  },
  large: {
    minHeight: "48px",
  },
});

const baseClassName = useResetStyles(useBaseClass);
const styles = useStyles(useToolbarStyles);

const rootClass = computed(() =>
  mergeClasses(
    "fui-Toolbar",
    baseClassName.value,
    props.vertical ? styles.value.vertical : styles.value.horizontal,
    styles.value[props.size],
  ),
);

provide(ToolbarContextKey, {
  size: props.size,
  vertical: props.vertical,
});
</script>

<template>
  <div
    :class="rootClass"
    role="toolbar"
    :aria-orientation="vertical ? 'vertical' : 'horizontal'"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>
