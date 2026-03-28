import type { InjectionKey, Ref } from "vue";

export interface TabListContext {
  selectedValue: Ref<string>;
  size: "small" | "medium" | "large";
  appearance: "subtle" | "transparent";
  selectTab: (value: string) => void;
}

export const TabListContextKey: InjectionKey<TabListContext> =
  Symbol("TabListContext");
