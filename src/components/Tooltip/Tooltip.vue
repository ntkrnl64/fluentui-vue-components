<script setup lang="ts">
import { ref, computed, onUnmounted } from "vue";
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

export type TooltipAppearance = "normal" | "inverted";

export interface TooltipProps {
  content: string;
  relationship?: "label" | "description";
  appearance?: TooltipAppearance;
  position?: string;
  withArrow?: boolean;
  showDelay?: number;
  hideDelay?: number;
}

const props = withDefaults(defineProps<TooltipProps>(), {
  relationship: "description",
  appearance: "normal",
  position: "above",
  withArrow: false,
  showDelay: 250,
  hideDelay: 250,
});

defineOptions({ inheritAttrs: false });

const visible = ref(false);
let showTimer: ReturnType<typeof setTimeout> | null = null;
let hideTimer: ReturnType<typeof setTimeout> | null = null;

const triggerRef = ref<HTMLElement | null>(null);
const contentRef = ref<HTMLElement | null>(null);
const arrowRef = ref<HTMLElement | null>(null);

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
  () => positionMap[props.position] ?? "top",
);

const middleware = computed(() => {
  const m = [
    offsetMiddleware(props.withArrow ? 8 : 4),
    flip(),
    shift({ padding: 8 }),
  ];
  if (props.withArrow) {
    m.push(arrowMiddleware({ element: arrowRef, padding: 4 }));
  }
  return m;
});

const {
  floatingStyles,
  middlewareData,
  placement: resolvedPlacement,
} = useFloating(triggerRef, contentRef, {
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
  ...shorthands.borderRadius(tokens.borderRadiusMedium),
  border: `${tokens.strokeWidthThin} solid ${tokens.colorTransparentStroke}`,
  ...shorthands.padding("4px", "11px", "6px", "11px"),
  fontFamily: tokens.fontFamilyBase,
  fontSize: tokens.fontSizeBase200,
  lineHeight: tokens.lineHeightBase200,
  maxWidth: "240px",
  zIndex: 1000000,
  boxShadow: tokens.shadow4,
  animationName: fadeInKeyframes,
  animationDuration: tokens.durationFast,
  animationTimingFunction: tokens.curveEasyEase,
  animationFillMode: "forwards",
  "@media screen and (prefers-reduced-motion: reduce)": {
    animationDuration: "0.01ms",
  },
});

const useTooltipStyles = makeStyles({
  normal: {
    backgroundColor: tokens.colorNeutralBackground1,
    color: tokens.colorNeutralForeground1,
  },
  inverted: {
    backgroundColor: tokens.colorNeutralBackgroundStatic,
    color: tokens.colorNeutralForegroundStaticInverted,
  },
  arrow: {
    position: "absolute",
    width: "8.5px",
    height: "8.5px",
    backgroundColor: "inherit",
    transform: "rotate(45deg)",
  },
});

const baseClassName = useResetStyles(useBaseClass);
const styles = useStyles(useTooltipStyles);

const rootClass = computed(() =>
  mergeClasses(
    "fui-Tooltip",
    baseClassName.value,
    styles.value[props.appearance],
  ),
);

function show() {
  if (hideTimer) {
    clearTimeout(hideTimer);
    hideTimer = null;
  }
  showTimer = setTimeout(() => {
    visible.value = true;
  }, props.showDelay);
}

function hide() {
  if (showTimer) {
    clearTimeout(showTimer);
    showTimer = null;
  }
  hideTimer = setTimeout(() => {
    visible.value = false;
  }, props.hideDelay);
}

onUnmounted(() => {
  if (showTimer) clearTimeout(showTimer);
  if (hideTimer) clearTimeout(hideTimer);
});
</script>

<template>
  <span
    :ref="
      (el) => {
        if (el) {
          const child = (el as HTMLElement).firstElementChild as HTMLElement;
          triggerRef = child ?? (el as HTMLElement);
        }
      }
    "
    style="display: contents"
    @mouseenter="show"
    @mouseleave="hide"
    @focusin="show"
    @focusout="hide"
  >
    <slot />
  </span>
  <Teleport to="body">
    <div
      v-if="visible"
      :ref="
        (el) => {
          contentRef = el as HTMLElement;
        }
      "
      :class="rootClass"
      :style="floatingStyles"
      role="tooltip"
      v-bind="$attrs"
    >
      <div
        v-if="withArrow"
        :ref="
          (el) => {
            arrowRef = el as HTMLElement;
          }
        "
        :class="styles.arrow"
        :style="arrowStyles"
      />
      {{ content }}
    </div>
  </Teleport>
</template>
