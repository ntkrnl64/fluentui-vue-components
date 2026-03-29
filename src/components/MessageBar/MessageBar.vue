<script setup lang="ts">
import { computed } from "vue";
import {
  useResetStyles,
  mergeClasses,
  makeResetStyles,
  makeStyles,
  useStyles,
  shorthands,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";
import {
  Info20Filled,
  CheckmarkCircle20Filled,
  Warning20Filled,
  ErrorCircle20Filled,
} from "@ntkrnl64/fluentui-vue-icons";

export type MessageBarIntent = "info" | "success" | "warning" | "error";
export type MessageBarShape = "rounded" | "square";
export type MessageBarLayout = "singleline" | "multiline";

export interface MessageBarProps {
  intent?: MessageBarIntent;
  shape?: MessageBarShape;
  layout?: MessageBarLayout;
}

const props = withDefaults(defineProps<MessageBarProps>(), {
  intent: "info",
  shape: "rounded",
  layout: "singleline",
});
defineOptions({ inheritAttrs: false });

const useBaseClass = makeResetStyles({
  display: "flex",
  alignItems: "center",
  gap: tokens.spacingHorizontalS,
  ...shorthands.padding(
    tokens.spacingVerticalMNudge,
    tokens.spacingHorizontalM,
  ),
  fontFamily: tokens.fontFamilyBase,
  fontSize: tokens.fontSizeBase300,
  lineHeight: tokens.lineHeightBase300,
  ...shorthands.borderRadius(tokens.borderRadiusMedium),
  minHeight: "36px",
});

const useMessageBarStyles = makeStyles({
  info: {
    backgroundColor: tokens.colorNeutralBackground4,
    color: tokens.colorNeutralForeground1,
  },
  success: {
    backgroundColor: tokens.colorPaletteGreenBackground1,
    color: tokens.colorNeutralForeground1,
  },
  warning: {
    backgroundColor: tokens.colorPaletteYellowBackground1,
    color: tokens.colorNeutralForeground1,
  },
  error: {
    backgroundColor: tokens.colorPaletteRedBackground1,
    color: tokens.colorNeutralForeground1,
  },
  square: { ...shorthands.borderRadius(tokens.borderRadiusNone) },
  multiline: { flexWrap: "wrap" },
  icon: {
    display: "flex",
    alignItems: "center",
    fontSize: "20px",
    flexShrink: 0,
  },
  iconInfo: { color: tokens.colorNeutralForeground2 },
  iconSuccess: { color: tokens.colorPaletteGreenForeground3 },
  iconWarning: { color: tokens.colorPaletteDarkOrangeForeground3 },
  iconError: { color: tokens.colorPaletteRedForeground3 },
});

const baseClassName = useResetStyles(useBaseClass);
const styles = useStyles(useMessageBarStyles);

const rootClass = computed(() =>
  mergeClasses(
    "fui-MessageBar",
    baseClassName.value,
    styles.value[props.intent],
    props.shape === "square" && styles.value.square,
    props.layout === "multiline" && styles.value.multiline,
  ),
);

const iconColorClass = computed(() => {
  const map: Record<MessageBarIntent, string> = {
    info: styles.value.iconInfo,
    success: styles.value.iconSuccess,
    warning: styles.value.iconWarning,
    error: styles.value.iconError,
  };
  return map[props.intent];
});

const iconComponents = {
  info: Info20Filled,
  success: CheckmarkCircle20Filled,
  warning: Warning20Filled,
  error: ErrorCircle20Filled,
};
const iconComponent = computed(() => iconComponents[props.intent]);
</script>

<template>
  <div :class="rootClass" role="group" v-bind="$attrs">
    <span :class="mergeClasses(styles.icon, iconColorClass)">
      <component :is="iconComponent" />
    </span>
    <slot />
  </div>
</template>
