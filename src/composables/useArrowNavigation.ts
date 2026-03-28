import { inject, computed, onMounted, onUnmounted } from "vue";
import type { Ref } from "vue";
import { TabsterKey } from "../contexts";
import { getMover, Types as TabsterTypes } from "tabster";

export interface ArrowNavigationOptions {
  axis?: "horizontal" | "vertical" | "both";
  circular?: boolean;
  memorizeCurrent?: boolean;
}

/**
 * Enables arrow key navigation within a container element.
 * Uses tabster's Mover functionality.
 */
export function useArrowNavigation(
  elementRef: Ref<HTMLElement | null | undefined>,
  options: ArrowNavigationOptions = {},
) {
  const tabster = inject(TabsterKey, undefined);

  const tabsterAttr = computed(() => {
    if (!tabster) return {};
    const axis = options.axis ?? "horizontal";

    let direction: TabsterTypes.MoverDirection;
    switch (axis) {
      case "horizontal":
        direction = TabsterTypes.MoverDirections.Horizontal;
        break;
      case "vertical":
        direction = TabsterTypes.MoverDirections.Vertical;
        break;
      case "both":
        direction = TabsterTypes.MoverDirections.Both;
        break;
    }

    return {
      "data-tabster": JSON.stringify({
        mover: {
          direction,
          cyclic: options.circular ?? false,
          memorizeCurrent: options.memorizeCurrent ?? false,
        },
      }),
    };
  });

  return tabsterAttr;
}
