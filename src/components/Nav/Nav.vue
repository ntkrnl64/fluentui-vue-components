<script setup lang="ts">
import { provide, computed } from "vue";
import {
  useResetStyles,
  useStyles,
  mergeClasses,
  makeResetStyles,
  makeStyles,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";
import { NavContextKey } from "./context";
import type { NavSize } from "./context";

export interface NavProps {
  size?: NavSize;
}

const props = withDefaults(defineProps<NavProps>(), {
  size: "medium",
});

defineOptions({ inheritAttrs: false });

const selectedValue = defineModel<string>("selectedValue", { default: "" });

function selectItem(value: string) {
  selectedValue.value = value;
}

const useBaseClass = makeResetStyles({
  display: "flex",
  flexDirection: "column",
  fontFamily: tokens.fontFamilyBase,
  boxSizing: "border-box",
});

const useNavStyles = makeStyles({
  small: {
    rowGap: tokens.spacingVerticalXXS,
  },
  medium: {
    rowGap: tokens.spacingVerticalXS,
  },
  large: {
    rowGap: tokens.spacingVerticalS,
  },
});

const baseClassName = useResetStyles(useBaseClass);
const styles = useStyles(useNavStyles);

const rootClass = computed(() =>
  mergeClasses("fui-Nav", baseClassName.value, styles.value[props.size]),
);

provide(NavContextKey, {
  size: props.size,
  selectedValue,
  selectItem,
});
</script>

<template>
  <nav :class="rootClass" v-bind="$attrs">
    <slot />
  </nav>
</template>
