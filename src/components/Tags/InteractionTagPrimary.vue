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

export interface InteractionTagPrimaryProps {
  hasSecondaryAction?: boolean;
}

const props = withDefaults(defineProps<InteractionTagPrimaryProps>(), {
  hasSecondaryAction: false,
});

defineOptions({ inheritAttrs: false });

const useBaseClass = makeResetStyles({
  display: "inline-flex",
  alignItems: "center",
  boxSizing: "border-box",
  border: "none",
  backgroundColor: "transparent",
  color: "inherit",
  fontFamily: tokens.fontFamilyBase,
  fontSize: "inherit",
  lineHeight: "inherit",
  cursor: "pointer",
  gap: tokens.spacingHorizontalXS,
  ...shorthands.padding("0", tokens.spacingHorizontalS),
  ...shorthands.borderRadius(tokens.borderRadiusMedium),
  height: "100%",
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

const usePrimaryStyles = makeStyles({
  hasSecondaryAction: {
    borderTopRightRadius: "0",
    borderBottomRightRadius: "0",
  },
});

const baseClassName = useResetStyles(useBaseClass);
const styles = useStyles(usePrimaryStyles);

const rootClass = computed(() =>
  mergeClasses(
    "fui-InteractionTagPrimary",
    baseClassName.value,
    props.hasSecondaryAction && styles.value.hasSecondaryAction,
  ),
);
</script>

<template>
  <button :class="rootClass" v-bind="$attrs">
    <slot />
  </button>
</template>
