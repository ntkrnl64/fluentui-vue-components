<script setup lang="ts">
import { computed, inject } from "vue";
import {
  useStyles,
  useResetStyles,
  mergeClasses,
  makeStyles,
  makeResetStyles,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";
import { AvatarGroupContextKey } from "./context";

defineOptions({ inheritAttrs: false });

const ctx = inject(AvatarGroupContextKey);

const useBaseClass = makeResetStyles({
  display: "inline-flex",
  position: "relative",
  flexShrink: 0,
  borderRadius: tokens.borderRadiusCircular,
  boxShadow: `0 0 0 2px ${tokens.colorNeutralBackground1}`,
});

const useItemStyles = makeStyles({
  stack: {
    zIndex: 0,
    ":hover": {
      zIndex: 1,
    },
  },
});

const baseClassName = useResetStyles(useBaseClass);
const styles = useStyles(useItemStyles);

const rootClass = computed(() =>
  mergeClasses(
    "fui-AvatarGroupItem",
    baseClassName.value,
    ctx?.layout === "stack" && styles.value.stack,
  ),
);
</script>

<template>
  <div :class="rootClass" v-bind="$attrs">
    <slot />
  </div>
</template>
