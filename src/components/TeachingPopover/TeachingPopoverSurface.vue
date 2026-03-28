<script setup lang="ts">
import { inject } from "vue";
import {
  useResetStyles,
  mergeClasses,
  makeResetStyles,
  shorthands,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";
import { TeachingPopoverContextKey } from "./context";

defineOptions({ inheritAttrs: false });
const ctx = inject(TeachingPopoverContextKey)!;

const useBaseClass = makeResetStyles({
  backgroundColor: tokens.colorBrandBackground,
  color: tokens.colorNeutralForegroundOnBrand,
  boxShadow: tokens.shadow16,
  ...shorthands.borderRadius(tokens.borderRadiusMedium),
  ...shorthands.padding(tokens.spacingVerticalL, tokens.spacingHorizontalL),
  fontFamily: tokens.fontFamilyBase,
  fontSize: tokens.fontSizeBase300,
  maxWidth: "360px",
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
          ctx.contentRef.value = el as HTMLElement;
        }
      "
      :class="mergeClasses('fui-TeachingPopoverSurface', baseClassName)"
      :style="ctx.contentStyles.value"
      role="dialog"
      v-bind="$attrs"
    >
      <slot />
    </div>
  </Teleport>
</template>
