import type { InjectionKey, Ref } from "vue";

export type NavSize = "small" | "medium" | "large";

export interface NavContext {
  size: NavSize;
  selectedValue: Ref<string>;
  selectItem: (value: string) => void;
}

export const NavContextKey: InjectionKey<NavContext> = Symbol("NavContext");

export interface NavCategoryContext {
  value: string;
  open: Ref<boolean>;
  toggle: () => void;
}

export const NavCategoryContextKey: InjectionKey<NavCategoryContext> =
  Symbol("NavCategoryContext");
