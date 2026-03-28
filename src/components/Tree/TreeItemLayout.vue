<script setup lang="ts">
import { computed, inject, useSlots } from "vue";
import { ChevronRight16Regular } from "@ntkrnl64/fluentui-vue-icons";
import {
  useStyles,
  useResetStyles,
  mergeClasses,
  makeStyles,
  makeResetStyles,
  shorthands,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";
import { TreeItemContextKey } from "./context";

defineOptions({ inheritAttrs: false });

const slots = useSlots();
const treeItemCtx = inject(TreeItemContextKey, undefined);

const useBaseClass = makeResetStyles({
  display: "flex",
  alignItems: "center",
  minHeight: "32px",
  boxSizing: "border-box",
  ...shorthands.borderRadius(tokens.borderRadiusMedium),
  ...shorthands.padding(tokens.spacingVerticalNone, tokens.spacingHorizontalM),
  cursor: "default",
  color: tokens.colorNeutralForeground2,
  outlineStyle: "none",
  ":hover": {
    backgroundColor: tokens.colorSubtleBackgroundHover,
    color: tokens.colorNeutralForeground2Hover,
  },
  ":focus-visible": {
    outlineColor: tokens.colorStrokeFocus2,
    outlineWidth: tokens.strokeWidthThick,
    outlineStyle: "solid",
    outlineOffset: "-2px",
  },
});

const useTreeItemLayoutStyles = makeStyles({
  expandIcon: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "24px",
    height: "24px",
    fontSize: "12px",
    flexShrink: 0,
    transition: `transform ${tokens.durationNormal} ${tokens.curveEasyEase}`,
  },
  expandIconOpen: {
    transform: "rotate(90deg)",
  },
  iconBefore: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: tokens.spacingHorizontalXS,
    fontSize: "20px",
    flexShrink: 0,
  },
  content: {
    flexGrow: 1,
  },
  actions: {
    display: "inline-flex",
    alignItems: "center",
    marginLeft: "auto",
    paddingLeft: tokens.spacingHorizontalXS,
    opacity: "0",
  },
  actionsVisible: {
    opacity: "1",
  },
});

const baseClassName = useResetStyles(useBaseClass);
const styles = useStyles(useTreeItemLayoutStyles);

const rootClass = computed(() =>
  mergeClasses("fui-TreeItemLayout", baseClassName.value),
);

const expandIconClass = computed(() =>
  mergeClasses(
    styles.value.expandIcon,
    treeItemCtx?.isOpen.value && styles.value.expandIconOpen,
  ),
);

function handleClick() {
  treeItemCtx?.toggle();
}
</script>

<template>
  <div :class="rootClass" v-bind="$attrs" @click="handleClick">
    <span
      v-if="treeItemCtx?.itemType === 'branch'"
      :class="expandIconClass"
      aria-hidden="true"
      ><ChevronRight16Regular
    /></span>
    <span v-if="slots.iconBefore" :class="styles.iconBefore">
      <slot name="iconBefore" />
    </span>
    <span :class="styles.content">
      <slot />
    </span>
    <span v-if="slots.actions" :class="styles.actions">
      <slot name="actions" />
    </span>
  </div>
</template>
