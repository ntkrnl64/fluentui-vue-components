<script setup lang="ts">
import {
  useStyles,
  useResetStyles,
  mergeClasses,
  makeStyles,
  makeResetStyles,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";

export interface DialogActionsProps {
  position?: "start" | "end";
}

const props = withDefaults(defineProps<DialogActionsProps>(), {
  position: "end",
});
defineOptions({ inheritAttrs: false });

const useBaseClass = makeResetStyles({
  display: "flex",
  gap: tokens.spacingHorizontalS,
  marginTop: tokens.spacingVerticalL,
});

const useStyles_ = makeStyles({
  start: { justifyContent: "flex-start" },
  end: { justifyContent: "flex-end" },
});

const baseClassName = useResetStyles(useBaseClass);
const styles = useStyles(useStyles_);
</script>

<template>
  <div
    :class="mergeClasses('fui-DialogActions', baseClassName, styles[position])"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>
