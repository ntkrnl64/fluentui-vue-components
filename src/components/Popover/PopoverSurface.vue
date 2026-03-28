<script setup lang="ts">
import { inject, computed } from "vue";
import {
  useStyles,
  useResetStyles,
  mergeClasses,
  makeStyles,
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
  arrow as arrowMiddleware,
} from "@floating-ui/vue";
import type { Placement } from "@floating-ui/vue";
import { PopoverContextKey } from "./context";

const ctx = inject(PopoverContextKey)!;

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
  () => positionMap[ctx.position.value] ?? "bottom",
);

const resolvedOffset = computed(() => {
  const o = ctx.offset.value;
  if (typeof o === "number") return o;
  return (o as any)?.mainAxis ?? 4;
});

const middleware = computed(() => {
  const m = [
    offsetMiddleware(resolvedOffset.value),
    flip(),
    shift({ padding: 8 }),
  ];
  if (ctx.withArrow) {
    m.push(arrowMiddleware({ element: ctx.arrowRef, padding: 4 }));
  }
  return m;
});

const {
  floatingStyles,
  middlewareData,
  placement: resolvedPlacement,
} = useFloating(ctx.triggerRef, ctx.contentRef, {
  placement,
  middleware,
  whileElementsMounted: autoUpdate,
});

const arrowStyles = computed(() => {
  const d = middlewareData.value?.arrow;
  if (!d) return {};

  const side = resolvedPlacement.value.split("-")[0];
  const staticSide: Record<string, string> = {
    top: "bottom",
    right: "left",
    bottom: "top",
    left: "right",
  };

  return {
    position: "absolute" as const,
    left: d.x != null ? `${d.x}px` : "",
    top: d.y != null ? `${d.y}px` : "",
    [staticSide[side]]: "-4px",
  };
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
  ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalM),
  fontFamily: tokens.fontFamilyBase,
  fontSize: tokens.fontSizeBase300,
  color: tokens.colorNeutralForeground1,
  zIndex: 1000000,
  animationName: fadeInKeyframes,
  animationDuration: tokens.durationNormal,
  animationTimingFunction: tokens.curveEasyEase,
  animationFillMode: "forwards",
  "@media screen and (prefers-reduced-motion: reduce)": {
    animationDuration: "0.01ms",
  },
});

const usePopoverStyles = makeStyles({
  arrow: {
    position: "absolute",
    width: "8px",
    height: "8px",
    backgroundColor: "inherit",
    transform: "rotate(45deg)",
    border: "inherit",
    borderBottom: "none",
    borderRight: "none",
  },
});

const baseClassName = useResetStyles(useBaseClass);
const styles = useStyles(usePopoverStyles);

const rootClass = computed(() =>
  mergeClasses("fui-PopoverSurface", baseClassName.value),
);
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
      :class="rootClass"
      :style="floatingStyles"
      role="dialog"
      v-bind="$attrs"
    >
      <div
        v-if="ctx.withArrow"
        :ref="
          (el) => {
            ctx.arrowRef.value = el as HTMLElement;
          }
        "
        :class="styles.arrow"
        :style="arrowStyles"
      />
      <slot />
    </div>
  </Teleport>
</template>
