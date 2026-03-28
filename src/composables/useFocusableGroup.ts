import { inject, computed } from "vue";
import { TabsterKey } from "../contexts";
import { Types as TabsterTypes } from "tabster";

export interface FocusableGroupOptions {
  tabBehavior?: "unlimited" | "limited" | "limited-trap-focus";
}

/**
 * Creates a focusable group (Groupper) for keyboard navigation.
 * Used for composite widgets where Tab should move between groups,
 * and arrow keys navigate within groups.
 */
export function useFocusableGroup(options: FocusableGroupOptions = {}) {
  const tabster = inject(TabsterKey, undefined);

  const tabsterAttr = computed(() => {
    if (!tabster) return {};

    let tabbability: TabsterTypes.GroupperTabbability;
    switch (options.tabBehavior) {
      case "limited":
        tabbability = TabsterTypes.GroupperTabbabilities.Limited;
        break;
      case "limited-trap-focus":
        tabbability = TabsterTypes.GroupperTabbabilities.LimitedTrapFocus;
        break;
      default:
        tabbability = TabsterTypes.GroupperTabbabilities.Unlimited;
    }

    return {
      "data-tabster": JSON.stringify({
        groupper: { tabbability },
      }),
    };
  });

  return tabsterAttr;
}
