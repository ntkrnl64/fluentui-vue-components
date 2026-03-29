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
import type { GriffelStyle } from "@ntkrnl64/griffel-vue";

/**
 * CSS variable names used internally for uniform styling in Card.
 */
const cardCSSVars = {
  cardSizeVar: "--fui-Card--size",
  cardBorderRadiusVar: "--fui-Card--border-radius",
};

export interface CardProps {
  orientation?: "horizontal" | "vertical";
  size?: "small" | "medium" | "large";
  appearance?: "filled" | "filled-alternative" | "outline" | "subtle";
  selected?: boolean;
  interactive?: boolean;
  disabled?: boolean;
}

const props = withDefaults(defineProps<CardProps>(), {
  orientation: "vertical",
  size: "medium",
  appearance: "filled",
  selected: false,
  interactive: false,
  disabled: false,
});

defineOptions({ inheritAttrs: false });

const useCardResetStyles = makeResetStyles({
  overflow: "hidden",
  borderRadius: `var(${cardCSSVars.cardBorderRadiusVar})`,
  padding: `var(${cardCSSVars.cardSizeVar})`,
  gap: `var(${cardCSSVars.cardSizeVar})`,

  display: "flex",
  position: "relative",
  boxSizing: "border-box",
  color: tokens.colorNeutralForeground1,

  // Border setting using after pseudo element to allow CardPreview to render behind it.
  "::after": {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    content: '""',
    pointerEvents: "none",

    ...shorthands.borderStyle("solid"),
    ...shorthands.borderWidth(tokens.strokeWidthThin),
    borderRadius: `var(${cardCSSVars.cardBorderRadiusVar})`,
  },

  // Prevents CardHeader and CardFooter from shrinking.
  [`> .fui-CardHeader, > .fui-CardFooter`]: {
    flexShrink: 0,
  },
});

const disabledStyles: GriffelStyle = {
  cursor: "not-allowed",
  userSelect: "none",
  color: tokens.colorNeutralForegroundDisabled,
  backgroundColor: tokens.colorNeutralBackgroundDisabled,
  boxShadow: tokens.shadow2,
  ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),

  "::before": {
    content: '""',
    position: "absolute",
    inset: "0",
    zIndex: `calc(${tokens.zIndexContent} + 1)`,
  },

  "::after": {
    ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
  },
};

const useCardStyles = makeStyles({
  focused: {
    ":focus-visible": {
      outlineColor: tokens.colorStrokeFocus2,
      outlineWidth: tokens.strokeWidthThick,
      outlineStyle: "solid",
      outlineOffset: "-2px",
      outlineRadius: `var(${cardCSSVars.cardBorderRadiusVar})`,
      borderRadius: `var(${cardCSSVars.cardBorderRadiusVar})`,
    },
  },

  orientationHorizontal: {
    flexDirection: "row",
    alignItems: "center",

    // Remove vertical padding to keep CardPreview content flush with Card's borders.
    [`> .fui-CardPreview`]: {
      marginTop: `calc(var(${cardCSSVars.cardSizeVar}) * -1)`,
      marginBottom: `calc(var(${cardCSSVars.cardSizeVar}) * -1)`,
    },
    [`> :not([aria-hidden="true"]).fui-CardPreview:first-of-type`]: {
      marginLeft: `calc(var(${cardCSSVars.cardSizeVar}) * -1)`,
    },
    [`> :not([aria-hidden="true"]).fui-CardPreview:last-of-type`]: {
      marginRight: `calc(var(${cardCSSVars.cardSizeVar}) * -1)`,
    },
    // If the last child is a CardHeader or CardFooter, allow it to grow to fill the available space.
    [`> .fui-CardHeader:last-of-type, > .fui-CardFooter:last-of-type`]: {
      flexGrow: 1,
    },
  },
  orientationVertical: {
    flexDirection: "column",

    // Remove lateral padding to keep CardPreview content flush with Card's borders.
    [`> .fui-CardPreview`]: {
      marginLeft: `calc(var(${cardCSSVars.cardSizeVar}) * -1)`,
      marginRight: `calc(var(${cardCSSVars.cardSizeVar}) * -1)`,
    },
    [`> :not([aria-hidden="true"]).fui-CardPreview:first-of-type`]: {
      marginTop: `calc(var(${cardCSSVars.cardSizeVar}) * -1)`,
    },
    [`> :not([aria-hidden="true"]).fui-CardPreview:last-of-type`]: {
      marginBottom: `calc(var(${cardCSSVars.cardSizeVar}) * -1)`,
    },
  },

  sizeSmall: {
    [cardCSSVars.cardSizeVar]: "8px",
    [cardCSSVars.cardBorderRadiusVar]: tokens.borderRadiusSmall,
  },
  sizeMedium: {
    [cardCSSVars.cardSizeVar]: "12px",
    [cardCSSVars.cardBorderRadiusVar]: tokens.borderRadiusMedium,
  },
  sizeLarge: {
    [cardCSSVars.cardSizeVar]: "16px",
    [cardCSSVars.cardBorderRadiusVar]: tokens.borderRadiusLarge,
  },

  interactive: {
    // Ensure text components inherit color in interactive cards
    [`& .fui-Text`]: {
      color: "currentColor",
    },
  },

  filled: {
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow4,

    "::after": {
      ...shorthands.borderColor(tokens.colorTransparentStroke),
    },
  },
  filledInteractive: {
    cursor: "pointer",
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow4,

    "::after": {
      ...shorthands.borderColor(tokens.colorTransparentStroke),
    },

    ":hover": {
      color: tokens.colorNeutralForeground1Hover,
      backgroundColor: tokens.colorNeutralBackground1Hover,
      boxShadow: tokens.shadow8,
    },
    ":active": {
      backgroundColor: tokens.colorNeutralBackground1Pressed,
    },
  },
  filledInteractiveSelected: {
    backgroundColor: tokens.colorNeutralBackground1Selected,

    "::after": {
      ...shorthands.borderColor(tokens.colorNeutralStroke1Selected),
    },

    ":hover": {
      color: tokens.colorNeutralForeground1Selected,
      backgroundColor: tokens.colorNeutralBackground1Selected,
    },
  },

  filledAlternative: {
    backgroundColor: tokens.colorNeutralBackground2,
    boxShadow: tokens.shadow4,

    "::after": {
      ...shorthands.borderColor(tokens.colorTransparentStroke),
    },
  },
  filledAlternativeInteractive: {
    cursor: "pointer",
    backgroundColor: tokens.colorNeutralBackground2,
    boxShadow: tokens.shadow4,

    "::after": {
      ...shorthands.borderColor(tokens.colorTransparentStroke),
    },

    ":hover": {
      color: tokens.colorNeutralForeground2Hover,
      backgroundColor: tokens.colorNeutralBackground2Hover,
      boxShadow: tokens.shadow8,
    },
    ":active": {
      backgroundColor: tokens.colorNeutralBackground2Pressed,
    },
  },
  filledAlternativeInteractiveSelected: {
    backgroundColor: tokens.colorNeutralBackground2Selected,

    "::after": {
      ...shorthands.borderColor(tokens.colorNeutralStroke1Selected),
    },

    ":hover": {
      color: tokens.colorNeutralForeground2Selected,
      backgroundColor: tokens.colorNeutralBackground2Selected,
    },
  },

  outline: {
    backgroundColor: tokens.colorTransparentBackground,
    boxShadow: "none",

    "::after": {
      ...shorthands.borderColor(tokens.colorNeutralStroke1),
    },
  },
  outlineInteractive: {
    cursor: "pointer",
    backgroundColor: tokens.colorTransparentBackground,
    boxShadow: "none",

    "::after": {
      ...shorthands.borderColor(tokens.colorNeutralStroke1),
    },

    ":hover": {
      color: tokens.colorNeutralForeground1Hover,
      backgroundColor: tokens.colorTransparentBackgroundHover,

      "::after": {
        ...shorthands.borderColor(tokens.colorNeutralStroke1Hover),
      },
    },
    ":active": {
      backgroundColor: tokens.colorTransparentBackgroundPressed,

      "::after": {
        ...shorthands.borderColor(tokens.colorNeutralStroke1Pressed),
      },
    },
  },
  outlineInteractiveSelected: {
    backgroundColor: tokens.colorTransparentBackgroundSelected,

    "::after": {
      ...shorthands.borderColor(tokens.colorNeutralStroke1Selected),
    },

    ":hover": {
      color: tokens.colorNeutralForeground1Selected,
      backgroundColor: tokens.colorTransparentBackgroundSelected,
    },
  },
  outlineDisabled: {
    backgroundColor: tokens.colorTransparentBackground,
    boxShadow: "none",
    ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),

    "&:hover, &:active": {
      backgroundColor: tokens.colorTransparentBackground,
      boxShadow: "none",
    },

    "::after": {
      ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
    },
  },

  subtle: {
    backgroundColor: tokens.colorSubtleBackground,
    boxShadow: "none",

    "::after": {
      ...shorthands.borderColor(tokens.colorTransparentStroke),
    },
  },
  subtleInteractive: {
    cursor: "pointer",
    backgroundColor: tokens.colorSubtleBackground,
    boxShadow: "none",

    "::after": {
      ...shorthands.borderColor(tokens.colorTransparentStroke),
    },

    ":hover": {
      color: tokens.colorNeutralForeground1Hover,
      backgroundColor: tokens.colorSubtleBackgroundHover,
    },
    ":active": {
      backgroundColor: tokens.colorSubtleBackgroundPressed,
    },
  },
  subtleInteractiveSelected: {
    backgroundColor: tokens.colorSubtleBackgroundSelected,

    "::after": {
      ...shorthands.borderColor(tokens.colorNeutralStroke1Selected),
    },

    ":hover": {
      color: tokens.colorNeutralForeground1Selected,
      backgroundColor: tokens.colorSubtleBackgroundSelected,
    },
  },

  highContrastSelected: {
    "@media (forced-colors: active)": {
      forcedColorAdjust: "none",
      backgroundColor: "Highlight",
      color: "HighlightText",

      [`& .fui-CardPreview, & .fui-CardFooter`]: {
        forcedColorAdjust: "auto",
      },

      "::after": {
        ...shorthands.borderColor("Highlight"),
      },
    },
  },

  highContrastInteractive: {
    "@media (forced-colors: active)": {
      ":hover, :active": {
        forcedColorAdjust: "none",
        backgroundColor: "Highlight",
        color: "HighlightText",

        [`& .fui-CardPreview, & .fui-CardFooter`]: {
          forcedColorAdjust: "auto",
        },
      },

      "::after": {
        ...shorthands.borderColor("Highlight"),
      },
    },
  },

  disabled: {
    ...disabledStyles,
    "&:hover, &:active": disabledStyles,
  },
});

const resetStyles = useResetStyles(useCardResetStyles);
const styles = useStyles(useCardStyles);

const orientationMap = computed(
  () =>
    ({
      horizontal: styles.value.orientationHorizontal,
      vertical: styles.value.orientationVertical,
    }) as Record<string, string>,
);

const sizeMap = computed(
  () =>
    ({
      small: styles.value.sizeSmall,
      medium: styles.value.sizeMedium,
      large: styles.value.sizeLarge,
    }) as Record<string, string>,
);

const appearanceMap = computed(
  () =>
    ({
      filled: styles.value.filled,
      "filled-alternative": styles.value.filledAlternative,
      outline: styles.value.outline,
      subtle: styles.value.subtle,
    }) as Record<string, string>,
);

const interactiveMap = computed(
  () =>
    ({
      filled: styles.value.filledInteractive,
      "filled-alternative": styles.value.filledAlternativeInteractive,
      outline: styles.value.outlineInteractive,
      subtle: styles.value.subtleInteractive,
    }) as Record<string, string>,
);

const selectedMap = computed(
  () =>
    ({
      filled: styles.value.filledInteractiveSelected,
      "filled-alternative": styles.value.filledAlternativeInteractiveSelected,
      outline: styles.value.outlineInteractiveSelected,
      subtle: styles.value.subtleInteractiveSelected,
    }) as Record<string, string>,
);

const isInteractive = computed(() => !props.disabled && props.interactive);

const rootClass = computed(() =>
  mergeClasses(
    "fui-Card",
    resetStyles.value,
    orientationMap.value[props.orientation],
    sizeMap.value[props.size],
    appearanceMap.value[props.appearance],
    isInteractive.value && styles.value.interactive,
    isInteractive.value && interactiveMap.value[props.appearance],
    props.selected && selectedMap.value[props.appearance],
    !props.disabled && styles.value.focused,
    isInteractive.value && styles.value.highContrastInteractive,
    props.selected && styles.value.highContrastSelected,
    props.disabled && styles.value.disabled,
    props.disabled &&
      props.appearance === "outline" &&
      styles.value.outlineDisabled,
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
    role="group"
    :tabindex="interactive && !disabled ? 0 : undefined"
    :aria-disabled="disabled || undefined"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>
