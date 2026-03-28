<script setup lang="ts">
import { computed, inject, useSlots } from "vue";
import {
  useStyles,
  useResetStyles,
  mergeClasses,
  makeStyles,
  makeResetStyles,
  shorthands,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";
import { MenuContextKey } from "./context";

export interface MenuItemProps {
  disabled?: boolean;
}

const props = withDefaults(defineProps<MenuItemProps>(), { disabled: false });
defineOptions({ inheritAttrs: false });
const emit = defineEmits<{ click: [event: MouseEvent] }>();
const ctx = inject(MenuContextKey, undefined);
const slots = useSlots();

const useBaseClass = makeResetStyles({
  ...shorthands.borderRadius(tokens.borderRadiusMedium),
  position: "relative",
  color: tokens.colorNeutralForeground2,
  backgroundColor: tokens.colorNeutralBackground1,
  ...shorthands.padding(
    tokens.spacingVerticalSNudge,
    tokens.spacingVerticalSNudge,
  ),
  boxSizing: "border-box",
  maxWidth: "290px",
  minHeight: "32px",
  flexShrink: 0,
  display: "flex",
  alignItems: "start",
  fontSize: tokens.fontSizeBase300,
  cursor: "pointer",
  gap: "4px",
  fontFamily: tokens.fontFamilyBase,
  lineHeight: tokens.lineHeightBase300,
  border: "none",
  outlineStyle: "none",
  textAlign: "left",
  width: "100%",
  userSelect: "none",
  ":hover": {
    backgroundColor: tokens.colorNeutralBackground1Hover,
    color: tokens.colorNeutralForeground2Hover,
  },
  ":hover:active": {
    backgroundColor: tokens.colorNeutralBackground1Pressed,
    color: tokens.colorNeutralForeground2Pressed,
  },
  ":focus-visible": {
    outlineColor: tokens.colorStrokeFocus2,
    outlineWidth: tokens.strokeWidthThick,
    outlineStyle: "solid",
  },
});

const useMenuItemStyles = makeStyles({
  // Reserve checkmark space only when menu has checkmarks
  checkmark: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "16px",
    height: "16px",
    flexShrink: 0,
    visibility: "hidden",
    marginTop: "2px",
  },
  content: {
    paddingLeft: "2px",
    paddingRight: "2px",
    backgroundColor: "transparent",
    flexGrow: 1,
  },
  icon: {
    width: "20px",
    height: "20px",
    fontSize: "20px",
    lineHeight: "0",
    alignItems: "center",
    display: "inline-flex",
    justifyContent: "center",
    flexShrink: 0,
  },
  secondaryContent: {
    paddingLeft: "2px",
    paddingRight: "2px",
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase300,
    color: tokens.colorNeutralForeground3,
  },
  disabled: {
    color: tokens.colorNeutralForegroundDisabled,
    cursor: "not-allowed",
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground1,
      color: tokens.colorNeutralForegroundDisabled,
    },
  },
});

const baseClassName = useResetStyles(useBaseClass);
const styles = useStyles(useMenuItemStyles);

const hasCheckmarks = computed(() => ctx?.hasCheckmarks.value ?? false);

const rootClass = computed(() =>
  mergeClasses(
    "fui-MenuItem",
    baseClassName.value,
    props.disabled && styles.value.disabled,
  ),
);

function handleClick(event: MouseEvent) {
  if (props.disabled) return;
  emit("click", event);
  ctx?.setOpen(false);
}
</script>

<template>
  <div
    :class="rootClass"
    role="menuitem"
    :aria-disabled="disabled || undefined"
    tabindex="0"
    v-bind="$attrs"
    @click="handleClick"
  >
    <span v-if="hasCheckmarks" :class="styles.checkmark" />
    <span v-if="slots.icon" :class="styles.icon"><slot name="icon" /></span>
    <span :class="styles.content"><slot /></span>
    <span v-if="slots.secondaryContent" :class="styles.secondaryContent"
      ><slot name="secondaryContent"
    /></span>
  </div>
</template>
