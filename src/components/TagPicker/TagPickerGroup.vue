<script setup lang="ts">
import { inject } from "vue";
import { Dismiss16Regular } from "@ntkrnl64/fluentui-vue-icons";
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

defineOptions({ inheritAttrs: false });
const ctx = inject(TagPickerContextKey)!;

const useBaseClass = makeResetStyles({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: tokens.spacingHorizontalXXS,
});

const useTagStyles = makeStyles({
  tag: {
    display: "inline-flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXXS,
    ...shorthands.padding(tokens.spacingVerticalXXS, tokens.spacingHorizontalS),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    backgroundColor: tokens.colorNeutralBackground3,
    color: tokens.colorNeutralForeground1,
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
  },
  dismiss: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    backgroundColor: "transparent",
    cursor: "pointer",
    ...shorthands.padding("0"),
    color: tokens.colorNeutralForeground3,
    fontSize: "12px",
    ":hover": { color: tokens.colorNeutralForeground1 },
  },
});

const baseClassName = useResetStyles(useBaseClass);
const styles = useStyles(useTagStyles);
</script>

<template>
  <div
    :class="mergeClasses('fui-TagPickerGroup', baseClassName)"
    role="listbox"
    aria-label="Selected values"
    v-bind="$attrs"
  >
    <span
      v-for="val in ctx.selectedValues.value"
      :key="val"
      :class="styles.tag"
      role="option"
      aria-selected="true"
    >
      {{ val }}
      <button
        :class="styles.dismiss"
        type="button"
        :aria-label="`Remove ${val}`"
        @click="ctx.removeValue(val)"
      >
        <Dismiss16Regular />
      </button>
    </span>
  </div>
</template>
