<script setup lang="ts">
import { computed, useSlots } from "vue";
import {
  useStyles,
  useResetStyles,
  mergeClasses,
  makeStyles,
  makeResetStyles,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";

defineOptions({ inheritAttrs: false });

const slots = useSlots();

const useBaseClass = makeResetStyles({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: tokens.spacingHorizontalS,
});

const useHeaderStyles = makeStyles({
  content: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    overflow: "hidden",
  },
  header: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    fontFamily: tokens.fontFamilyBase,
    lineHeight: tokens.lineHeightBase300,
    color: tokens.colorNeutralForeground1,
  },
  description: {
    fontSize: tokens.fontSizeBase200,
    fontFamily: tokens.fontFamilyBase,
    lineHeight: tokens.lineHeightBase200,
    color: tokens.colorNeutralForeground3,
  },
  action: {
    marginLeft: "auto",
    flexShrink: 0,
  },
});

const baseClassName = useResetStyles(useBaseClass);
const styles = useStyles(useHeaderStyles);

const rootClass = computed(() =>
  mergeClasses("fui-CardHeader", baseClassName.value),
);
</script>

<template>
  <div :class="rootClass" v-bind="$attrs">
    <slot name="image" />
    <div :class="styles.content">
      <div :class="styles.header">
        <slot name="header" />
      </div>
      <div v-if="slots.description" :class="styles.description">
        <slot name="description" />
      </div>
    </div>
    <div v-if="slots.action" :class="styles.action">
      <slot name="action" />
    </div>
  </div>
</template>
