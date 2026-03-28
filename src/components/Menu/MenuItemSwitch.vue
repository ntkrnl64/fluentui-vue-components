<script setup lang="ts">
import { computed, inject } from "vue";
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

export interface MenuItemSwitchProps {
  name: string;
  value: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<MenuItemSwitchProps>(), {
  disabled: false,
});
defineOptions({ inheritAttrs: false });

const ctx = inject(MenuContextKey)!;
const isChecked = computed(() =>
  (ctx.checkedValues.value[props.name] ?? []).includes(props.value),
);

const useBaseClass = makeResetStyles({
  ...shorthands.borderRadius(tokens.borderRadiusMedium),
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
  width: "100%",
  boxSizing: "border-box",
  ":hover": { backgroundColor: tokens.colorNeutralBackground1Hover },
  ":focus-visible": {
    outlineColor: tokens.colorStrokeFocus2,
    outlineWidth: tokens.strokeWidthThick,
    outlineStyle: "solid",
  },
});

const useSwitchStyles = makeStyles({
  indicator: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "auto",
    width: "40px",
    height: "20px",
    ...shorthands.borderRadius("10px"),
    backgroundColor: tokens.colorNeutralBackground5,
    position: "relative",
    transitionProperty: "background-color",
    transitionDuration: tokens.durationNormal,
    transitionTimingFunction: tokens.curveEasyEase,
  },
  indicatorChecked: {
    backgroundColor: tokens.colorCompoundBrandBackground,
  },
  thumb: {
    position: "absolute",
    width: "14px",
    height: "14px",
    ...shorthands.borderRadius("50%"),
    backgroundColor: tokens.colorNeutralBackground1,
    top: "3px",
    left: "3px",
    transitionProperty: "left",
    transitionDuration: tokens.durationNormal,
    transitionTimingFunction: tokens.curveEasyEase,
  },
  thumbChecked: {
    left: "23px",
  },
  disabled: {
    color: tokens.colorNeutralForegroundDisabled,
    cursor: "not-allowed",
  },
});

const baseClassName = useResetStyles(useBaseClass);
const styles = useStyles(useSwitchStyles);

function toggle() {
  if (props.disabled) return;
  ctx.onCheckedValueChange(props.name, props.value);
}
</script>

<template>
  <div
    :class="
      mergeClasses(
        'fui-MenuItemSwitch',
        baseClassName,
        disabled && styles.disabled,
      )
    "
    role="menuitemcheckbox"
    :aria-checked="isChecked"
    :aria-disabled="disabled || undefined"
    tabindex="0"
    v-bind="$attrs"
    @click="toggle"
  >
    <slot />
    <span
      :class="
        mergeClasses(styles.indicator, isChecked && styles.indicatorChecked)
      "
    >
      <span
        :class="mergeClasses(styles.thumb, isChecked && styles.thumbChecked)"
      />
    </span>
  </div>
</template>
