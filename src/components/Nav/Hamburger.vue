<script setup lang="ts">
import { Navigation20Regular } from "@ntkrnl64/fluentui-vue-icons";
import {
  useResetStyles,
  mergeClasses,
  makeResetStyles,
  shorthands,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";

defineOptions({ inheritAttrs: false });
const emit = defineEmits<{ click: [event: MouseEvent] }>();

const useBaseClass = makeResetStyles({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "32px",
  height: "32px",
  ...shorthands.borderRadius(tokens.borderRadiusMedium),
  border: "none",
  backgroundColor: "transparent",
  color: tokens.colorNeutralForeground1,
  cursor: "pointer",
  outlineStyle: "none",
  ...shorthands.padding("0"),
  ":hover": { backgroundColor: tokens.colorSubtleBackgroundHover },
  ":hover:active": { backgroundColor: tokens.colorSubtleBackgroundPressed },
  ":focus-visible": {
    outlineColor: tokens.colorStrokeFocus2,
    outlineWidth: tokens.strokeWidthThick,
    outlineStyle: "solid",
    outlineOffset: "2px",
  },
});

const baseClassName = useResetStyles(useBaseClass);
</script>

<template>
  <button
    :class="mergeClasses('fui-Hamburger', baseClassName)"
    type="button"
    aria-label="Navigation"
    v-bind="$attrs"
    @click="emit('click', $event)"
  >
    <Navigation20Regular />
  </button>
</template>
