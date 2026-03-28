import { inject, computed, onMounted, onUnmounted } from "vue";
import type { Ref } from "vue";
import { TabsterKey } from "../contexts";
import { getModalizer, Types as TabsterTypes } from "tabster";

export interface ModalAttributesOptions {
  trapFocus?: boolean;
  alwaysFocusable?: boolean;
}

/**
 * Creates modal attributes for focus trapping (dialogs, drawers).
 * Uses tabster's Modalizer functionality.
 */
export function useModalAttributes(options: ModalAttributesOptions = {}) {
  const tabster = inject(TabsterKey, undefined);

  const modalAttr = computed(() => {
    if (!tabster) return {};

    return {
      "data-tabster": JSON.stringify({
        modalizer: {
          id: `modal-${Date.now()}`,
          isTrapped: options.trapFocus ?? true,
          isAlwaysFocusable: options.alwaysFocusable ?? false,
        },
      }),
    };
  });

  return modalAttr;
}
