<script setup lang="ts">
import { computed } from "vue";
import {
  useStyles,
  useResetStyles,
  mergeClasses,
  makeStyles,
  makeResetStyles,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";

export interface LinkProps {
  as?: "a" | "button" | "span";
  inline?: boolean;
  appearance?: "default" | "subtle";
  disabled?: boolean;
}

const props = withDefaults(defineProps<LinkProps>(), {
  as: "a",
  inline: false,
  appearance: "default",
  disabled: false,
});

defineOptions({ inheritAttrs: false });

const useBaseClass = makeResetStyles({
  backgroundColor: "transparent",
  border: "none",
  boxSizing: "border-box",
  color: tokens.colorBrandForegroundLink,
  cursor: "pointer",
  display: "inline",
  fontFamily: tokens.fontFamilyBase,
  fontSize: "inherit",
  fontWeight: tokens.fontWeightRegular,
  margin: "0",
  overflow: "inherit",
  padding: "0",
  textAlign: "left",
  textDecorationLine: "none",
  textOverflow: "inherit",
  userSelect: "text",
  ":hover": {
    color: tokens.colorBrandForegroundLinkHover,
    textDecorationLine: "underline",
  },
  ":active": {
    color: tokens.colorBrandForegroundLinkPressed,
    textDecorationLine: "underline",
  },
  ":focus-visible": {
    outlineColor: tokens.colorStrokeFocus2,
    outlineWidth: tokens.strokeWidthThick,
    outlineStyle: "solid",
    outlineOffset: "2px",
  },
});

const useLinkStyles = makeStyles({
  subtle: {
    color: tokens.colorNeutralForeground2,
    ":hover": { color: tokens.colorNeutralForeground2Hover },
    ":active": { color: tokens.colorNeutralForeground2Pressed },
  },
  inline: {
    textDecorationLine: "underline",
  },
  disabled: {
    color: tokens.colorNeutralForegroundDisabled,
    cursor: "not-allowed",
    textDecorationLine: "none",
    ":hover": {
      color: tokens.colorNeutralForegroundDisabled,
      textDecorationLine: "none",
    },
    ":active": {
      color: tokens.colorNeutralForegroundDisabled,
      textDecorationLine: "none",
    },
  },
});

const baseClassName = useResetStyles(useBaseClass);
const styles = useStyles(useLinkStyles);

const rootClass = computed(() =>
  mergeClasses(
    "fui-Link",
    baseClassName.value,
    props.appearance === "subtle" && styles.value.subtle,
    props.inline && styles.value.inline,
    props.disabled && styles.value.disabled,
  ),
);
</script>

<template>
  <component
    :is="as"
    :class="rootClass"
    :aria-disabled="disabled ? 'true' : undefined"
    v-bind="$attrs"
  >
    <slot />
  </component>
</template>
