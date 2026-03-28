import type { InjectionKey, Ref, ComputedRef } from "vue";

export interface AccordionContext {
  openItems: Ref<string[]>;
  toggleItem: (value: string) => void;
  collapsible: boolean;
  multiple: boolean;
}

export const AccordionContextKey: InjectionKey<AccordionContext> =
  Symbol("AccordionContext");

export interface AccordionItemContext {
  isOpen: ComputedRef<boolean>;
  toggle: () => void;
  value: string;
}

export const AccordionItemContextKey: InjectionKey<AccordionItemContext> =
  Symbol("AccordionItemContext");
