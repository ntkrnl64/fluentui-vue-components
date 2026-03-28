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
import { NavContextKey } from "./context";

export interface NavItemProps {
  value: string;
  href?: string;
}

const props = defineProps<NavItemProps>();

defineOptions({ inheritAttrs: false });

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

const navCtx = inject(NavContextKey)!;

const isSelected = computed(() => navCtx.selectedValue.value === props.value);

const useBaseClass = makeResetStyles({
  display: "flex",
  alignItems: "center",
  width: "100%",
  boxSizing: "border-box",
  backgroundColor: "transparent",
  border: "none",
  cursor: "pointer",
  fontFamily: tokens.fontFamilyBase,
  fontSize: tokens.fontSizeBase300,
  lineHeight: tokens.lineHeightBase300,
  color: tokens.colorNeutralForeground2,
  textDecorationLine: "none",
  outlineStyle: "none",
  ...shorthands.borderRadius(tokens.borderRadiusMedium),
  ...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalM),
  ":hover": {
    backgroundColor: tokens.colorSubtleBackgroundHover,
    color: tokens.colorNeutralForeground2Hover,
  },
  ":hover:active": {
    backgroundColor: tokens.colorSubtleBackgroundPressed,
    color: tokens.colorNeutralForeground2Pressed,
  },
  ":focus-visible": {
    outlineColor: tokens.colorStrokeFocus2,
    outlineWidth: tokens.strokeWidthThick,
    outlineStyle: "solid",
    outlineOffset: "2px",
  },
});

const useNavItemStyles = makeStyles({
  selected: {
    backgroundColor: tokens.colorSubtleBackgroundSelected,
    color: tokens.colorNeutralForeground2BrandSelected,
    fontWeight: tokens.fontWeightSemibold,
    ":hover": {
      backgroundColor: tokens.colorSubtleBackgroundSelected,
    },
    "::after": {
      content: '""',
      position: "absolute",
      left: "0",
      top: tokens.spacingVerticalS,
      bottom: tokens.spacingVerticalS,
      width: "3px",
      ...shorthands.borderRadius(tokens.borderRadiusCircular),
      backgroundColor: tokens.colorCompoundBrandBackground,
    },
  },
  hasIndicator: {
    position: "relative",
  },
});

const baseClassName = useResetStyles(useBaseClass);
const styles = useStyles(useNavItemStyles);

const rootClass = computed(() =>
  mergeClasses(
    "fui-NavItem",
    baseClassName.value,
    isSelected.value && styles.value.hasIndicator,
    isSelected.value && styles.value.selected,
  ),
);

const tag = computed(() => (props.href ? "a" : "button"));

function handleClick(event: MouseEvent) {
  navCtx.selectItem(props.value);
  emit("click", event);
}
</script>

<template>
  <component
    :is="tag"
    :class="rootClass"
    :href="href"
    :aria-current="isSelected ? 'page' : undefined"
    v-bind="$attrs"
    @click="handleClick"
  >
    <slot />
  </component>
</template>
