<script setup lang="ts">
import { inject, computed, useSlots } from "vue";
import { ChevronRight20Regular } from "@ntkrnl64/fluentui-vue-icons";
import {
  useStyles,
  useResetStyles,
  mergeClasses,
  makeStyles,
  makeResetStyles,
  shorthands,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";
import { AccordionItemContextKey } from "./context";

defineOptions({ inheritAttrs: false });

const slots = useSlots();
const itemCtx = inject(AccordionItemContextKey)!;

const useBaseClass = makeResetStyles({
  display: "flex",
  alignItems: "center",
  width: "100%",
  boxSizing: "border-box",
  backgroundColor: "transparent",
  border: "none",
  cursor: "pointer",
  ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalM),
  fontFamily: tokens.fontFamilyBase,
  fontSize: tokens.fontSizeBase300,
  fontWeight: tokens.fontWeightRegular,
  lineHeight: tokens.lineHeightBase300,
  color: tokens.colorNeutralForeground1,
  textAlign: "start",
  ":hover": {
    backgroundColor: tokens.colorSubtleBackgroundHover,
    color: tokens.colorNeutralForeground1Hover,
  },
  ":active": {
    backgroundColor: tokens.colorSubtleBackgroundPressed,
    color: tokens.colorNeutralForeground1Pressed,
  },
  ":focus-visible": {
    outlineColor: tokens.colorStrokeFocus2,
    outlineWidth: tokens.strokeWidthThick,
    outlineStyle: "solid",
    outlineOffset: "-2px",
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
  },
});

const useHeaderStyles = makeStyles({
  chevron: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "20px",
    height: "20px",
    marginRight: tokens.spacingHorizontalS,
    transition: "transform 0.2s ease",
    fontSize: "12px",
    lineHeight: "1",
  },
  chevronOpen: {
    transform: "rotate(90deg)",
  },
  content: {
    flexGrow: 1,
  },
});

const baseClassName = useResetStyles(useBaseClass);
const styles = useStyles(useHeaderStyles);

const rootClass = computed(() =>
  mergeClasses("fui-AccordionHeader", baseClassName.value),
);
const chevronClass = computed(() =>
  mergeClasses(
    styles.value.chevron,
    itemCtx.isOpen.value && styles.value.chevronOpen,
  ),
);
</script>

<template>
  <button
    :class="rootClass"
    :aria-expanded="itemCtx.isOpen.value"
    v-bind="$attrs"
    @click="itemCtx.toggle"
  >
    <span :class="chevronClass" aria-hidden="true">
      <slot name="icon"><ChevronRight20Regular /></slot>
    </span>
    <span :class="styles.content">
      <slot />
    </span>
  </button>
</template>
