<script setup lang="ts">
import { computed, inject } from "vue";
import {
  useStyles,
  useResetStyles,
  mergeClasses,
  makeStyles,
  makeResetStyles,
  shorthands,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";
import { ListContextKey } from "./context";

defineOptions({ inheritAttrs: false });

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

const listCtx = inject(ListContextKey, undefined);
const isInteractive = computed(() => !!listCtx?.navigationMode);

const useBaseClass = makeResetStyles({
  display: "flex",
  alignItems: "center",
  boxSizing: "border-box",
  ...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalM),
  ...shorthands.borderRadius(tokens.borderRadiusMedium),
  color: tokens.colorNeutralForeground1,
  outlineStyle: "none",
});

const useListItemStyles = makeStyles({
  interactive: {
    cursor: "pointer",
    ":hover": {
      backgroundColor: tokens.colorSubtleBackgroundHover,
    },
    ":hover:active": {
      backgroundColor: tokens.colorSubtleBackgroundPressed,
    },
    ":focus-visible": {
      outlineColor: tokens.colorStrokeFocus2,
      outlineWidth: tokens.strokeWidthThick,
      outlineStyle: "solid",
      outlineOffset: "-2px",
    },
  },
});

const baseClassName = useResetStyles(useBaseClass);
const styles = useStyles(useListItemStyles);

const rootClass = computed(() =>
  mergeClasses(
    "fui-ListItem",
    baseClassName.value,
    isInteractive.value && styles.value.interactive,
  ),
);

function handleClick(event: MouseEvent) {
  emit("click", event);
}
</script>

<template>
  <li
    :class="rootClass"
    role="listitem"
    :tabindex="isInteractive ? 0 : undefined"
    v-bind="$attrs"
    @click="handleClick"
  >
    <slot />
  </li>
</template>
