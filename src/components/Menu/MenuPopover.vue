<script setup lang="ts">
import { inject, computed, watch, nextTick } from "vue";
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

const menuItemSelector =
  '[role="menuitem"], [role="menuitemcheckbox"], [role="menuitemradio"]';

function getMenuItems(): HTMLElement[] {
  if (!ctx.contentRef.value) return [];
  return Array.from(ctx.contentRef.value.querySelectorAll(menuItemSelector));
}

function focusItemByIndex(items: HTMLElement[], index: number) {
  if (items.length === 0) return;
  const clamped = Math.max(0, Math.min(index, items.length - 1));
  items[clamped]?.focus();
}

function handleKeydown(event: KeyboardEvent) {
  const items = getMenuItems();
  if (items.length === 0) return;

  const currentIndex = items.indexOf(document.activeElement as HTMLElement);

  switch (event.key) {
    case "ArrowDown":
      event.preventDefault();
      focusItemByIndex(items, currentIndex < 0 ? 0 : currentIndex + 1);
      break;
    case "ArrowUp":
      event.preventDefault();
      focusItemByIndex(
        items,
        currentIndex < 0 ? items.length - 1 : currentIndex - 1,
      );
      break;
    case "Home":
      event.preventDefault();
      focusItemByIndex(items, 0);
      break;
    case "End":
      event.preventDefault();
      focusItemByIndex(items, items.length - 1);
      break;
    case "Enter":
    case " ":
      if (
        document.activeElement &&
        items.includes(document.activeElement as HTMLElement)
      ) {
        event.preventDefault();
        (document.activeElement as HTMLElement).click();
      }
      break;
  }
}

// Auto-focus the first menu item when the menu opens
watch(
  () => ctx.open.value,
  (isOpen) => {
    if (isOpen) {
      nextTick(() => {
        const items = getMenuItems();
        if (items.length > 0) {
          items[0].focus();
        }
      });
    }
  },
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
      :class="mergeClasses('fui-MenuPopover', baseClassName)"
      :style="floatingStyles"
      role="menu"
      v-bind="$attrs"
      @keydown="handleKeydown"
    >
      <slot />
    </div>
  </Teleport>
</template>
