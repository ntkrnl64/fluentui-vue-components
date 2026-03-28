import type { InjectionKey, Ref } from "vue";

export type ComboboxAppearance =
  | "outline"
  | "underline"
  | "filled-darker"
  | "filled-lighter";
export type ComboboxSize = "small" | "medium" | "large";

export interface ComboboxContext {
  selectedValues: Ref<string[]>;
  selectOption: (value: string) => void;
  isSelected: (value: string) => boolean;
  multiselect: boolean;
  activeDescendant: Ref<string>;
  setActiveDescendant: (id: string) => void;
  listboxId: string;
}

export const ComboboxContextKey: InjectionKey<ComboboxContext> =
  Symbol("ComboboxContext");
