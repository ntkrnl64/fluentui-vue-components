<script setup lang="ts">
import {
  useStyles,
  useResetStyles,
  mergeClasses,
  makeStyles,
  makeResetStyles,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";

export interface TagPickerOptionGroupProps {
  label: string;
}

defineProps<TagPickerOptionGroupProps>();
defineOptions({ inheritAttrs: false });

const useBaseClass = makeResetStyles({
  display: "flex",
  flexDirection: "column",
});

const useGroupStyles = makeStyles({
  label: {
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground3,
    padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalM}`,
  },
});

const baseClassName = useResetStyles(useBaseClass);
const styles = useStyles(useGroupStyles);
</script>

<template>
  <div
    :class="mergeClasses('fui-TagPickerOptionGroup', baseClassName)"
    role="group"
    :aria-label="label"
    v-bind="$attrs"
  >
    <div :class="styles.label">{{ label }}</div>
    <slot />
  </div>
</template>
