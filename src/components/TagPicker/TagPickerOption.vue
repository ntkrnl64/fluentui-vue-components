<script setup lang="ts">
import { inject, computed } from "vue";
import { Checkmark16Filled } from "@ntkrnl64/fluentui-vue-icons";
import {
  useStyles,
  useResetStyles,
  mergeClasses,
  makeStyles,
  makeResetStyles,
  shorthands,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";
import { TagPickerContextKey } from "./context";

export interface TagPickerOptionProps {
  value: string;
}

const props = defineProps<TagPickerOptionProps>();
defineOptions({ inheritAttrs: false });
const ctx = inject(TagPickerContextKey)!;

const isSelected = computed(() =>
  ctx.selectedValues.value.includes(props.value),
);

const useBaseClass = makeResetStyles({
  ...shorthands.borderRadius(tokens.borderRadiusMedium),
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
  color: tokens.colorNeutralForeground1,
  ":hover": { backgroundColor: tokens.colorNeutralBackground1Hover },
});

const useOptionStyles = makeStyles({
  selected: { fontWeight: tokens.fontWeightSemibold },
  checkmark: {
    color: tokens.colorCompoundBrandForeground1,
    width: "16px",
    fontSize: "12px",
  },
});

const baseClassName = useResetStyles(useBaseClass);
const styles = useStyles(useOptionStyles);

function select() {
  if (isSelected.value) ctx.removeValue(props.value);
  else ctx.addValue(props.value);
}
</script>

<template>
  <div
    :class="
      mergeClasses(
        'fui-TagPickerOption',
        baseClassName,
        isSelected && styles.selected,
      )
    "
    role="option"
    :aria-selected="isSelected"
    v-bind="$attrs"
    @click="select"
  >
    <span :class="styles.checkmark"
      ><Checkmark16Filled v-if="isSelected"
    /></span>
    <slot />
  </div>
</template>
