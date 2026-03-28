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

export interface MenuItemCheckboxProps {
  name: string;
  value: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<MenuItemCheckboxProps>(), {
  disabled: false,
});
defineOptions({ inheritAttrs: false });
const slots = useSlots();

const ctx = inject(MenuContextKey)!;
const isChecked = computed(() =>
  (ctx.checkedValues.value[props.name] ?? []).includes(props.value),
);

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

const useCheckStyles = makeStyles({
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
  checkmarkChecked: {
    visibility: "visible",
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
      color: tokens.colorNeutralForegroundDisabled,
      backgroundColor: tokens.colorNeutralBackground1,
    },
  },
});

const baseClassName = useResetStyles(useBaseClass);
const styles = useStyles(useCheckStyles);

const rootClass = computed(() =>
  mergeClasses(
    "fui-MenuItemCheckbox",
    baseClassName.value,
    props.disabled && styles.value.disabled,
  ),
);

const checkmarkClass = computed(() =>
  mergeClasses(
    styles.value.checkmark,
    isChecked.value && styles.value.checkmarkChecked,
  ),
);

function toggle() {
  if (props.disabled) return;
  ctx.onCheckedValueChange(props.name, props.value);
}
</script>

<template>
  <div
    :class="rootClass"
    role="menuitemcheckbox"
    :aria-checked="isChecked"
    :aria-disabled="disabled || undefined"
    tabindex="0"
    v-bind="$attrs"
    @click="toggle"
  >
    <span :class="checkmarkClass">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path
          d="M14.05 3.49a.75.75 0 0 1 .04 1.06l-8 8.5a.75.75 0 0 1-1.08.02l-3.5-3.5a.75.75 0 0 1 1.06-1.06l2.94 2.94 7.48-7.93a.75.75 0 0 1 1.06-.04Z"
        />
      </svg>
    </span>
    <span v-if="slots.icon" :class="styles.icon"><slot name="icon" /></span>
    <span :class="styles.content"><slot /></span>
    <span v-if="slots.secondaryContent" :class="styles.secondaryContent"
      ><slot name="secondaryContent"
    /></span>
  </div>
</template>
