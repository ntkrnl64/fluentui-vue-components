import { inject } from "vue";
import type { VNode } from "vue";
import { ToasterContextKey } from "./context";
import type { ToastOptions } from "./context";

export function useToastController() {
  const context = inject(ToasterContextKey);
  if (!context) {
    throw new Error(
      "useToastController must be used within a <Toaster> component",
    );
  }

  return {
    dispatchToast: (content: VNode | (() => VNode), options?: ToastOptions) => {
      context.dispatchToast(content, options);
    },
  };
}
