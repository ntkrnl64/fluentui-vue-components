<script setup lang="ts">
import { computed, provide, toRef } from "vue";
import {
  useStyles,
  useResetStyles,
  mergeClasses,
  makeStyles,
  makeResetStyles,
  shorthands,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";
import { CardContextKey } from "./context";

export interface CardProps {
  orientation?: "horizontal" | "vertical";
  size?: "small" | "medium" | "large";
  appearance?: "filled" | "filled-alternative" | "outline" | "subtle";
  selected?: boolean;
  interactive?: boolean;
}

const props = withDefaults(defineProps<CardProps>(), {
  orientation: "vertical",
  size: "medium",
  appearance: "filled",
  selected: false,
  interactive: false,
});

defineOptions({ inheritAttrs: false });

const useBaseClass = makeResetStyles({
  display: "flex",
  position: "relative",
  boxSizing: "border-box",
  ...shorthands.borderRadius(tokens.borderRadiusMedium),
  color: tokens.colorNeutralForeground1,
  textDecorationLine: "none",
  ":focus-visible": {
    outlineColor: tokens.colorStrokeFocus2,
    outlineWidth: tokens.strokeWidthThick,
    outlineStyle: "solid",
    outlineOffset: "2px",
  },
});

const useCardStyles = makeStyles({
  // Orientation
  vertical: {
    flexDirection: "column",
  },
  horizontal: {
    flexDirection: "row",
  },

  // Sizes
  small: {
    ...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalS),
    ...shorthands.gap(tokens.spacingVerticalS),
  },
  medium: {
    ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalM),
    ...shorthands.gap(tokens.spacingVerticalM),
  },
  large: {
    ...shorthands.padding(tokens.spacingVerticalL, tokens.spacingHorizontalL),
    ...shorthands.gap(tokens.spacingVerticalL),
  },

  // Appearances
  filled: {
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow4,
  },
  "filled-alternative": {
    backgroundColor: tokens.colorNeutralBackground2,
    boxShadow: tokens.shadow4,
  },
  outline: {
    backgroundColor: tokens.colorTransparentBackground,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
  },
  subtle: {
    backgroundColor: tokens.colorSubtleBackground,
  },

  // Interactive
  interactive: {
    cursor: "pointer",
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
      boxShadow: tokens.shadow8,
    },
    ":active": {
      backgroundColor: tokens.colorNeutralBackground1Pressed,
    },
  },
  interactiveOutline: {
    ":hover": {
      backgroundColor: tokens.colorTransparentBackgroundHover,
      ...shorthands.borderColor(tokens.colorNeutralStroke1Hover),
    },
    ":active": {
      backgroundColor: tokens.colorTransparentBackgroundPressed,
      ...shorthands.borderColor(tokens.colorNeutralStroke1Pressed),
    },
  },
  interactiveSubtle: {
    ":hover": {
      backgroundColor: tokens.colorSubtleBackgroundHover,
    },
    ":active": {
      backgroundColor: tokens.colorSubtleBackgroundPressed,
    },
  },

  // Selected
  selected: {
    border: `${tokens.strokeWidthThick} solid ${tokens.colorCompoundBrandStroke}`,
  },
});

const baseClassName = useResetStyles(useBaseClass);
const styles = useStyles(useCardStyles);

const rootClass = computed(() =>
  mergeClasses(
    "fui-Card",
    baseClassName.value,
    styles.value[props.orientation],
    styles.value[props.size],
    styles.value[props.appearance],
    props.interactive && styles.value.interactive,
    props.interactive &&
      props.appearance === "outline" &&
      styles.value.interactiveOutline,
    props.interactive &&
      props.appearance === "subtle" &&
      styles.value.interactiveSubtle,
    props.selected && styles.value.selected,
  ),
);

provide(CardContextKey, {
  selected: toRef(props, "selected"),
  interactive: toRef(props, "interactive"),
});
</script>

<template>
  <div
    :class="rootClass"
    :tabindex="interactive ? 0 : undefined"
    :role="interactive ? 'button' : undefined"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>
