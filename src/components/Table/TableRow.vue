<script setup lang="ts">
import { inject, computed } from "vue";
import {
  useStyles,
  useResetStyles,
  mergeClasses,
  makeStyles,
  makeResetStyles,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";
import { TableContextKey } from "./context";

export interface TableRowProps {
  appearance?: "none" | "neutral" | "brand";
}

const props = withDefaults(defineProps<TableRowProps>(), {
  appearance: "none",
});
defineOptions({ inheritAttrs: false });
const ctx = inject(TableContextKey)!;

const useBaseClass = makeResetStyles({
  borderBottomWidth: tokens.strokeWidthThin,
  borderBottomStyle: "solid",
  borderBottomColor: tokens.colorNeutralStroke2,
  color: tokens.colorNeutralForeground1,
});

const useRowStyles = makeStyles({
  neutral: {
    backgroundColor: tokens.colorSubtleBackground,
    ":hover": { backgroundColor: tokens.colorSubtleBackgroundHover },
  },
  brand: {
    backgroundColor: tokens.colorBrandBackground2,
    ":hover": { backgroundColor: tokens.colorBrandBackground2Hover },
    color: tokens.colorNeutralForeground1,
  },
});

const baseClassName = useResetStyles(useBaseClass);
const styles = useStyles(useRowStyles);

const rootClass = computed(() =>
  mergeClasses(
    "fui-TableRow",
    baseClassName.value,
    props.appearance !== "none" && styles.value[props.appearance],
  ),
);
</script>

<template>
  <tr
    v-if="!ctx.noNativeElements"
    :class="rootClass"
    role="row"
    v-bind="$attrs"
  >
    <slot />
  </tr>
  <div
    v-else
    :class="rootClass"
    role="row"
    style="display: flex"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>
