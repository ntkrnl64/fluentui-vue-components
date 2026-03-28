<script setup lang="ts">
import { computed } from "vue";
import {
  useStyles,
  useResetStyles,
  mergeClasses,
  makeStyles,
  makeResetStyles,
  shorthands,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";

export interface OptionGroupProps {
  label: string;
}

const props = defineProps<OptionGroupProps>();

defineOptions({ inheritAttrs: false });

const useBaseClass = makeResetStyles({
  display: "flex",
  flexDirection: "column",
});

const useGroupStyles = makeStyles({
  label: {
    ...shorthands.padding(
      tokens.spacingVerticalSNudge,
      tokens.spacingHorizontalS,
    ),
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold as string,
    lineHeight: tokens.lineHeightBase200,
    color: tokens.colorNeutralForeground3,
  },
});

const baseClassName = useResetStyles(useBaseClass);
const styles = useStyles(useGroupStyles);

const rootClass = computed(() =>
  mergeClasses("fui-OptionGroup", baseClassName.value),
);
</script>

<template>
  <div :class="rootClass" role="group" :aria-label="label" v-bind="$attrs">
    <span :class="styles.label">{{ label }}</span>
    <slot />
  </div>
</template>
