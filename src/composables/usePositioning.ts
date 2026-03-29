import { ref, computed } from "vue";
import type { Ref, CSSProperties } from "vue";
import {
  useFloating,
  autoUpdate,
  offset as offsetMiddleware,
  flip as flipMiddleware,
  shift as shiftMiddleware,
  arrow as arrowMiddleware,
  size as sizeMiddleware,
} from "@floating-ui/vue";
import type { Placement, Strategy, Middleware } from "@floating-ui/vue";

export type PositioningShorthand =
  | "above"
  | "above-start"
  | "above-end"
  | "below"
  | "below-start"
  | "below-end"
  | "before"
  | "before-top"
  | "before-bottom"
  | "after"
  | "after-top"
  | "after-bottom";

export interface PositioningOptions {
  position?: PositioningShorthand;
  align?: "start" | "center" | "end";
  offset?: number | { mainAxis?: number; crossAxis?: number };
  flipBoundary?: HTMLElement | HTMLElement[];
  overflowBoundary?: HTMLElement | HTMLElement[];
  autoSize?: boolean | "width" | "height" | "always";
  strategy?: Strategy;
  pinned?: boolean;
  coverTarget?: boolean;
  arrowPadding?: number;
  fallbackPositions?: PositioningShorthand[];
}

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

function resolveOffset(offset: PositioningOptions["offset"]): {
  mainAxis: number;
  crossAxis: number;
} {
  if (typeof offset === "number") return { mainAxis: offset, crossAxis: 0 };
  return { mainAxis: offset?.mainAxis ?? 0, crossAxis: offset?.crossAxis ?? 0 };
}

export function usePositioning(
  options: Ref<PositioningOptions> | PositioningOptions,
) {
  const triggerRef = ref<HTMLElement | null>(null);
  const contentRef = ref<HTMLElement | null>(null);
  const arrowRef = ref<HTMLElement | null>(null);

  const opts = computed(() =>
    typeof (options as Ref).value === "object" && "value" in options
      ? (options as Ref<PositioningOptions>).value
      : (options as PositioningOptions),
  );

  const placement = computed<Placement>(() => {
    const pos = opts.value.position ?? "below";
    return positionMap[pos] ?? "bottom";
  });

  const middleware = computed<Middleware[]>(() => {
    const m: Middleware[] = [];
    const o = opts.value;
    const { mainAxis, crossAxis } = resolveOffset(o.offset);

    if (mainAxis || crossAxis) {
      m.push(offsetMiddleware({ mainAxis, crossAxis }));
    }

    if (!o.pinned) {
      m.push(flipMiddleware());
    }

    m.push(shiftMiddleware({ padding: 8 }));

    if (arrowRef.value) {
      m.push(
        arrowMiddleware({ element: arrowRef, padding: o.arrowPadding ?? 4 }),
      );
    }

    if (o.autoSize) {
      m.push(
        sizeMiddleware({
          apply({ availableWidth, availableHeight, elements }) {
            const applyWidth =
              o.autoSize === true ||
              o.autoSize === "width" ||
              o.autoSize === "always";
            const applyHeight =
              o.autoSize === true ||
              o.autoSize === "height" ||
              o.autoSize === "always";
            if (applyWidth) {
              Object.assign(elements.floating.style, {
                maxWidth: `${availableWidth}px`,
              });
            }
            if (applyHeight) {
              Object.assign(elements.floating.style, {
                maxHeight: `${availableHeight}px`,
              });
            }
          },
        }),
      );
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
    strategy: computed(() => opts.value.strategy ?? "absolute"),
    whileElementsMounted: autoUpdate,
  });

  const arrowStyles = computed<CSSProperties>(() => {
    const arrowData = middlewareData.value?.arrow;
    if (!arrowData) return {};
    return {
      position: "absolute",
      left: arrowData.x != null ? `${arrowData.x}px` : "",
      top: arrowData.y != null ? `${arrowData.y}px` : "",
    };
  });

  return {
    triggerRef,
    contentRef,
    arrowRef,
    contentStyles: floatingStyles,
    arrowStyles,
    placement: resolvedPlacement,
  };
}
