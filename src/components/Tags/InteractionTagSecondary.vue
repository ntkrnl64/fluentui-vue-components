<script setup lang="ts">
import { computed } from "vue";
import { Dismiss16Regular } from "@ntkrnl64/fluentui-vue-icons";
import {
  useResetStyles,
  mergeClasses,
  makeResetStyles,
  shorthands,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";

defineOptions({ inheritAttrs: false });

const useBaseClass = makeResetStyles({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  boxSizing: "border-box",
  border: "none",
  borderLeft: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
  backgroundColor: "transparent",
  color: "inherit",
  cursor: "pointer",
  ...shorthands.padding("0", tokens.spacingHorizontalXS),
  borderTopRightRadius: tokens.borderRadiusMedium,
  borderBottomRightRadius: tokens.borderRadiusMedium,
  height: "100%",
  fontSize: "12px",
  lineHeight: "1",
  ":hover": {
    backgroundColor: tokens.colorNeutralBackground1Hover,
  },
  ":active": {
    backgroundColor: tokens.colorNeutralBackground1Pressed,
  },
  ":focus-visible": {
    outlineWidth: "2px",
    outlineStyle: "solid",
    outlineColor: tokens.colorStrokeFocus2,
  },
});

const baseClassName = useResetStyles(useBaseClass);

const rootClass = computed(() =>
  mergeClasses("fui-InteractionTagSecondary", baseClassName.value),
);
</script>

<template>
  <button :class="rootClass" aria-label="dismiss" v-bind="$attrs">
    <slot><Dismiss16Regular /></slot>
  </button>
</template>
