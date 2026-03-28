<script setup lang="ts">
import { computed, inject } from "vue";
import { ChevronDown16Regular } from "@ntkrnl64/fluentui-vue-icons";
import {
  useStyles,
  useResetStyles,
  mergeClasses,
  makeStyles,
  makeResetStyles,
  shorthands,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";
import { NavCategoryContextKey } from "./context";

defineOptions({ inheritAttrs: false });

const categoryCtx = inject(NavCategoryContextKey)!;

const useBaseClass = makeResetStyles({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  boxSizing: "border-box",
  backgroundColor: "transparent",
  border: "none",
  cursor: "pointer",
  fontFamily: tokens.fontFamilyBase,
  fontSize: tokens.fontSizeBase300,
  lineHeight: tokens.lineHeightBase300,
  color: tokens.colorNeutralForeground2,
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

const useNavCategoryItemStyles = makeStyles({
  chevron: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    transition: `transform ${tokens.durationNormal} ${tokens.curveEasyEase}`,
  },
  chevronOpen: {
    transform: "rotate(90deg)",
  },
});

const baseClassName = useResetStyles(useBaseClass);
const styles = useStyles(useNavCategoryItemStyles);

const rootClass = computed(() =>
  mergeClasses("fui-NavCategoryItem", baseClassName.value),
);
const chevronClass = computed(() =>
  mergeClasses(
    styles.value.chevron,
    categoryCtx.open.value && styles.value.chevronOpen,
  ),
);
</script>

<template>
  <button
    :class="rootClass"
    :aria-expanded="categoryCtx.open.value"
    v-bind="$attrs"
    @click="categoryCtx.toggle()"
  >
    <span>
      <slot />
    </span>
    <span :class="chevronClass" aria-hidden="true"
      ><ChevronDown16Regular
    /></span>
  </button>
</template>
