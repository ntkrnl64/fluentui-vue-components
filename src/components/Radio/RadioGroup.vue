<script setup lang="ts">
import { provide, toRef, computed } from "vue";
import {
  useStyles,
  useResetStyles,
  mergeClasses,
  makeStyles,
  makeResetStyles,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";
import { RadioGroupContextKey } from "./context";
import { useId } from "../../composables/useId";

export interface RadioGroupProps {
  name?: string;
  disabled?: boolean;
  layout?: "vertical" | "horizontal" | "horizontal-stacked";
}

const props = withDefaults(defineProps<RadioGroupProps>(), {
  disabled: false,
  layout: "vertical",
});

defineOptions({ inheritAttrs: false });
const modelValue = defineModel<string>({ default: "" });

const groupName = props.name ?? useId("fui-RadioGroup-");

const useBaseClass = makeResetStyles({
  display: "flex",
  flexDirection: "column",
  gap: tokens.spacingVerticalS,
});

const useRadioGroupStyles = makeStyles({
  horizontal: { flexDirection: "row", gap: tokens.spacingHorizontalM },
  "horizontal-stacked": {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: tokens.spacingHorizontalM,
  },
});

const baseClassName = useResetStyles(useBaseClass);
const styles = useStyles(useRadioGroupStyles);

const rootClass = computed(() =>
  mergeClasses(
    "fui-RadioGroup",
    baseClassName.value,
    props.layout !== "vertical" && styles.value[props.layout],
  ),
);

provide(RadioGroupContextKey, {
  name: groupName,
  modelValue,
  disabled: toRef(props, "disabled"),
  layout: toRef(props, "layout"),
});
</script>

<template>
  <div :class="rootClass" role="radiogroup" v-bind="$attrs">
    <slot />
  </div>
</template>
