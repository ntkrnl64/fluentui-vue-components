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

export interface MenuItemLinkProps {
  href: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<MenuItemLinkProps>(), {
  disabled: false,
});
defineOptions({ inheritAttrs: false });

const useBaseClass = makeResetStyles({
  ...shorthands.borderRadius(tokens.borderRadiusMedium),
  position: "relative",
  color: tokens.colorNeutralForeground2,
  backgroundColor: tokens.colorNeutralBackground1,
  ...shorthands.padding(
    tokens.spacingVerticalSNudge,
    tokens.spacingHorizontalM,
  ),
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: tokens.spacingHorizontalS,
  fontFamily: tokens.fontFamilyBase,
  fontSize: tokens.fontSizeBase300,
  lineHeight: tokens.lineHeightBase300,
  border: "none",
  outlineStyle: "none",
  textDecorationLine: "none",
  textAlign: "left",
  width: "100%",
  boxSizing: "border-box",
  ":hover": {
    backgroundColor: tokens.colorNeutralBackground1Hover,
    color: tokens.colorNeutralForeground2Hover,
  },
  ":active": {
    backgroundColor: tokens.colorNeutralBackground1Pressed,
    color: tokens.colorNeutralForeground2Pressed,
  },
  ":focus-visible": {
    outlineColor: tokens.colorStrokeFocus2,
    outlineWidth: tokens.strokeWidthThick,
    outlineStyle: "solid",
  },
});

const useLinkStyles = makeStyles({
  disabled: {
    color: tokens.colorNeutralForegroundDisabled,
    cursor: "not-allowed",
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground1,
      color: tokens.colorNeutralForegroundDisabled,
    },
  },
  icon: {
    display: "inline-flex",
    alignItems: "center",
    width: "20px",
    height: "20px",
  },
});

const baseClassName = useResetStyles(useBaseClass);
const styles = useStyles(useLinkStyles);

const rootClass = computed(() =>
  mergeClasses(
    "fui-MenuItemLink",
    baseClassName.value,
    props.disabled && styles.value.disabled,
  ),
);

function handleClick(event: MouseEvent) {
  if (props.disabled) {
    event.preventDefault();
  }
}
</script>

<template>
  <a
    :class="rootClass"
    :href="disabled ? undefined : href"
    role="menuitem"
    :aria-disabled="disabled || undefined"
    tabindex="0"
    v-bind="$attrs"
    @click="handleClick"
  >
    <span v-if="$slots.icon" :class="styles.icon"><slot name="icon" /></span>
    <slot />
  </a>
</template>
