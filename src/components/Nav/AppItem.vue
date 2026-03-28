<script setup lang="ts">
import { computed } from "vue";
import {
  useResetStyles,
  mergeClasses,
  makeResetStyles,
  shorthands,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";

export interface AppItemProps {
  href?: string;
}

const props = defineProps<AppItemProps>();
defineOptions({ inheritAttrs: false });

const useBaseClass = makeResetStyles({
  display: "flex",
  alignItems: "center",
  gap: tokens.spacingHorizontalS,
  width: "100%",
  boxSizing: "border-box",
  backgroundColor: "transparent",
  border: "none",
  cursor: "pointer",
  fontFamily: tokens.fontFamilyBase,
  fontSize: tokens.fontSizeBase300,
  fontWeight: tokens.fontWeightSemibold,
  lineHeight: tokens.lineHeightBase300,
  color: tokens.colorNeutralForeground1,
  textDecorationLine: "none",
  outlineStyle: "none",
  ...shorthands.borderRadius(tokens.borderRadiusMedium),
  ...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalM),
  ":hover": { backgroundColor: tokens.colorSubtleBackgroundHover },
  ":hover:active": { backgroundColor: tokens.colorSubtleBackgroundPressed },
  ":focus-visible": {
    outlineColor: tokens.colorStrokeFocus2,
    outlineWidth: tokens.strokeWidthThick,
    outlineStyle: "solid",
    outlineOffset: "2px",
  },
});

const baseClassName = useResetStyles(useBaseClass);
const tag = computed(() => (props.href ? "a" : "button"));
</script>

<template>
  <component
    :is="tag"
    :class="mergeClasses('fui-AppItem', baseClassName)"
    :href="href"
    v-bind="$attrs"
  >
    <slot name="icon" />
    <slot />
  </component>
</template>
