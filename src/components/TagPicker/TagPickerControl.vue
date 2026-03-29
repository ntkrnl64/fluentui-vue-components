<script setup lang="ts">
import { inject } from "vue";
import {
  useResetStyles,
  mergeClasses,
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
  ...shorthands.padding(
    tokens.spacingVerticalXXS,
    tokens.spacingHorizontalMNudge,
  ),
  ...shorthands.borderRadius(tokens.borderRadiusMedium),
  border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
  borderBottomColor: tokens.colorNeutralStrokeAccessible,
  backgroundColor: tokens.colorNeutralBackground1,
  minHeight: "32px",
  boxSizing: "border-box",
  cursor: "text",
});

const baseClassName = useResetStyles(useBaseClass);
</script>

<template>
  <div
    :ref="
      (el) => {
        ctx.inputRef.value = el as HTMLElement;
      }
    "
    :class="mergeClasses('fui-TagPickerControl', baseClassName)"
    v-bind="$attrs"
    @click="ctx.setOpen(true)"
  >
    <slot />
  </div>
</template>
