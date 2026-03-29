<script setup lang="ts">
import { inject, computed, useSlots } from "vue";
import {
  useStyles,
  useResetStyles,
  mergeClasses,
  makeStyles,
  makeResetStyles,
  shorthands,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";
import { TabListContextKey } from "./context";

export interface TabProps {
  value: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<TabProps>(), {
  disabled: false,
});

defineOptions({ inheritAttrs: false });

const slots = useSlots();
const tabCtx = inject(TabListContextKey)!;

const isSelected = computed(() => tabCtx.selectedValue.value === props.value);

function handleClick() {
  if (!props.disabled) {
    tabCtx.selectTab(props.value);
  }
}

const useBaseClass = makeResetStyles({
  position: "relative",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  boxSizing: "border-box",
  cursor: "pointer",
  overflow: "hidden",
  textTransform: "none",
  backgroundColor: "transparent",
  border: "none",
  fontFamily: tokens.fontFamilyBase,
  color: tokens.colorNeutralForeground2,
  whiteSpace: "nowrap",
  outlineStyle: "none",
  ":hover": {
    color: tokens.colorNeutralForeground2Hover,
  },
  ":active": {
    color: tokens.colorNeutralForeground2Pressed,
  },
  ":focus-visible": {
    outlineColor: tokens.colorStrokeFocus2,
    outlineWidth: tokens.strokeWidthThick,
    outlineStyle: "solid",
    outlineOffset: "-2px",
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
  },
  "::after": {
    content: '""',
    position: "absolute",
    bottom: "0",
    left: tokens.spacingHorizontalM,
    right: tokens.spacingHorizontalM,
    height: tokens.strokeWidthThick,
    ...shorthands.borderRadius(tokens.borderRadiusCircular),
    backgroundColor: "transparent",
    transition: "background-color 0.2s ease",
  },
});

const useTabStyles = makeStyles({
  // Sizes
  small: {
    ...shorthands.padding(
      tokens.spacingVerticalSNudge,
      tokens.spacingHorizontalSNudge,
    ),
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
    fontWeight: tokens.fontWeightRegular,
  },
  medium: {
    ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalM),
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
    fontWeight: tokens.fontWeightRegular,
  },
  large: {
    ...shorthands.padding(tokens.spacingVerticalL, tokens.spacingHorizontalM),
    fontSize: tokens.fontSizeBase400,
    lineHeight: tokens.lineHeightBase400,
    fontWeight: tokens.fontWeightRegular,
  },

  // Appearance
  subtle: {
    ":hover": {
      backgroundColor: tokens.colorSubtleBackgroundHover,
    },
    ":active": {
      backgroundColor: tokens.colorSubtleBackgroundPressed,
    },
  },
  transparent: {
    // no background
  },

  // Vertical indicator
  vertical: {
    "::after": {
      left: "0",
      right: "unset",
      top: tokens.spacingVerticalS,
      bottom: tokens.spacingVerticalS,
      width: tokens.strokeWidthThick,
      height: "auto",
    },
  },

  // Selected
  selected: {
    color: tokens.colorNeutralForeground1,
    fontWeight: tokens.fontWeightSemibold,
    "::after": {
      backgroundColor: tokens.colorCompoundBrandStroke,
    },
    ":hover": {
      color: tokens.colorNeutralForeground1Hover,
      "::after": {
        backgroundColor: tokens.colorCompoundBrandStrokeHover,
      },
    },
    ":active": {
      color: tokens.colorNeutralForeground1Pressed,
      "::after": {
        backgroundColor: tokens.colorCompoundBrandStrokePressed,
      },
    },
  },

  // Disabled
  disabled: {
    color: tokens.colorNeutralForegroundDisabled,
    cursor: "not-allowed",
    ":hover": {
      color: tokens.colorNeutralForegroundDisabled,
      backgroundColor: "transparent",
    },
    "::after": {
      backgroundColor: "transparent",
    },
  },

  // Icon
  icon: {
    display: "inline-flex",
    alignItems: "center",
    marginRight: tokens.spacingHorizontalXS,
    fontSize: "20px",
  },
});

const baseClassName = useResetStyles(useBaseClass);
const styles = useStyles(useTabStyles);

const hasIcon = computed(() => !!slots.icon);

const rootClass = computed(() =>
  mergeClasses(
    "fui-Tab",
    baseClassName.value,
    styles.value[tabCtx.size],
    styles.value[tabCtx.appearance],
    isSelected.value && styles.value.selected,
    props.disabled && styles.value.disabled,
  ),
);
</script>

<template>
  <button
    :class="rootClass"
    role="tab"
    :aria-selected="isSelected"
    :disabled="disabled || undefined"
    :tabindex="isSelected ? 0 : -1"
    v-bind="$attrs"
    @click="handleClick"
  >
    <span v-if="hasIcon" :class="styles.icon">
      <slot name="icon" />
    </span>
    <slot />
  </button>
</template>
