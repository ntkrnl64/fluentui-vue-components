import type { InjectionKey, Ref } from "vue";

export interface TreeContext {
  level: number;
}

export const TreeContextKey: InjectionKey<TreeContext> = Symbol("TreeContext");

export interface TreeItemContext {
  level: number;
  itemType: "leaf" | "branch";
  isOpen: Ref<boolean>;
  toggle: () => void;
}

export const TreeItemContextKey: InjectionKey<TreeItemContext> =
  Symbol("TreeItemContext");
