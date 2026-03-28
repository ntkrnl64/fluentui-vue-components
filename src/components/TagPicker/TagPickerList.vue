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
  backgroundColor: tokens.colorNeutralBackground1,
  boxShadow: tokens.shadow16,
  ...shorthands.borderRadius(tokens.borderRadiusMedium),
  border: `${tokens.strokeWidthThin} solid ${tokens.colorTransparentStroke}`,
  ...shorthands.padding(tokens.spacingVerticalXXS, "0"),
  maxHeight: "220px",
  overflowY: "auto",
  zIndex: 1000000,
});

const baseClassName = useResetStyles(useBaseClass);
</script>

<template>
  <Teleport to="body">
    <div
      v-if="ctx.open.value"
      :ref="
        (el) => {
          ctx.listRef.value = el as HTMLElement;
        }
      "
      :class="mergeClasses('fui-TagPickerList', baseClassName)"
      :style="ctx.listStyles.value"
      role="listbox"
      v-bind="$attrs"
    >
      <slot />
    </div>
  </Teleport>
</template>
