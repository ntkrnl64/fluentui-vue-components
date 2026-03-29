import { inject, computed } from "vue";
import type { Ref } from "vue";
import { TabsterKey } from "../contexts";
import { MoverDirections } from "tabster";
import type { Types as TabsterTypes } from "tabster";

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
  _elementRef: Ref<HTMLElement | null | undefined>,
  options: ArrowNavigationOptions = {},
) {
  const tabster = inject(TabsterKey, undefined);

  const tabsterAttr = computed(() => {
    if (!tabster) return {};
    const axis = options.axis ?? "horizontal";

    let direction: TabsterTypes.MoverDirection;
    switch (axis) {
      case "horizontal":
        direction = MoverDirections.Horizontal;
        break;
      case "vertical":
        direction = MoverDirections.Vertical;
        break;
      case "both":
        direction = MoverDirections.Both;
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
