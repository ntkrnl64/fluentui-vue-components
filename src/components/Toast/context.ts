import type { InjectionKey, VNode } from "vue";

export interface ToastOptions {
  intent?: "success" | "error" | "warning" | "info";
  timeout?: number;
  position?: "top-end" | "top-start" | "bottom-end" | "bottom-start";
}

export interface ToastEntry {
  id: number;
  content: VNode | (() => VNode);
  options: ToastOptions;
}

export interface ToasterContext {
  dispatchToast: (
    content: VNode | (() => VNode),
    options?: ToastOptions,
  ) => void;
}

export const ToasterContextKey: InjectionKey<ToasterContext> =
  Symbol("ToasterContext");
