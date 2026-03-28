import type { InjectionKey, Ref } from "vue";

export interface OverflowContext {
  overflowItems: Ref<string[]>;
  registerItem: (id: string, el: HTMLElement, priority?: number) => void;
  unregisterItem: (id: string) => void;
  hasOverflow: Ref<boolean>;
}

export const OverflowContextKey: InjectionKey<OverflowContext> =
  Symbol("OverflowContext");
