<script setup lang="ts">
import { computed, provide } from "vue";
import {
  useStyles,
  useResetStyles,
  mergeClasses,
  makeStyles,
  makeResetStyles,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";
import type { AvatarSize } from "./Avatar.vue";
import type { AvatarGroupLayout } from "./context";
import { AvatarGroupContextKey } from "./context";

export interface AvatarGroupProps {
  layout?: AvatarGroupLayout;
  size?: AvatarSize;
}

const props = withDefaults(defineProps<AvatarGroupProps>(), {
  layout: "stack",
  size: 32,
});

defineOptions({ inheritAttrs: false });

const useBaseClass = makeResetStyles({
  display: "inline-flex",
  alignItems: "center",
  flexDirection: "row",
  flexWrap: "nowrap",
});

const useGroupStyles = makeStyles({
  stack: {
    "> :not(:first-child)": {
      marginLeft: "-8px",
    },
  },
  spread: {
    gap: tokens.spacingHorizontalS,
  },
  pie: {
    flexWrap: "wrap",
    gap: tokens.spacingHorizontalXXS,
  },
});

const baseClassName = useResetStyles(useBaseClass);
const styles = useStyles(useGroupStyles);

const rootClass = computed(() =>
  mergeClasses(
    "fui-AvatarGroup",
    baseClassName.value,
    styles.value[props.layout],
  ),
);

provide(AvatarGroupContextKey, {
  size: props.size,
  layout: props.layout,
});
</script>

<template>
  <div :class="rootClass" role="group" v-bind="$attrs">
    <slot />
  </div>
</template>
