<script setup lang="ts">
import { inject, computed } from "vue";
import {
  useResetStyles,
  mergeClasses,
  makeResetStyles,
  shorthands,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";
import {
  useFloating,
  autoUpdate,
  offset as offsetMiddleware,
  flip,
  shift,
} from "@floating-ui/vue";
import type { Placement } from "@floating-ui/vue";
import { MenuContextKey } from "./context";

const ctx = inject(MenuContextKey)!;
defineOptions({ inheritAttrs: false });

const positionMap: Record<string, Placement> = {
  above: "top",
  "above-start": "top-start",
  "above-end": "top-end",
  below: "bottom",
  "below-start": "bottom-start",
  "below-end": "bottom-end",
  before: "left",
  "before-top": "left-start",
  "before-bottom": "left-end",
  after: "right",
  "after-top": "right-start",
  "after-bottom": "right-end",
};

const placement = computed<Placement>(
  () => positionMap[ctx.position.value] ?? "bottom-end",
);
const middleware = computed(() => [
  offsetMiddleware(4),
  flip(),
  shift({ padding: 8 }),
]);

const { floatingStyles } = useFloating(ctx.triggerRef, ctx.contentRef, {
  placement,
  middleware,
  whileElementsMounted: autoUpdate,
});

const fadeInKeyframes = {
  from: { opacity: 0 },
  to: { opacity: 1 },
};

const useBaseClass = makeResetStyles({
  backgroundColor: tokens.colorNeutralBackground1,
  boxShadow: tokens.shadow16,
  ...shorthands.borderRadius(tokens.borderRadiusMedium),
  border: `${tokens.strokeWidthThin} solid ${tokens.colorTransparentStroke}`,
  ...shorthands.padding(tokens.spacingVerticalXXS, "0"),
  minWidth: "128px",
  maxHeight: "80vh",
  overflowY: "auto",
  zIndex: 1000000,
  animationName: fadeInKeyframes,
  animationDuration: tokens.durationNormal,
  animationTimingFunction: tokens.curveEasyEase,
  animationFillMode: "forwards",
  "@media screen and (prefers-reduced-motion: reduce)": {
    animationDuration: "0.01ms",
  },
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
      :class="mergeClasses('fui-MenuPopover', baseClassName)"
      :style="floatingStyles"
      role="menu"
      v-bind="$attrs"
    >
      <slot />
    </div>
  </Teleport>
</template>
