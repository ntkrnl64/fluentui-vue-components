import type { InjectionKey, Ref } from "vue";

export interface TagPickerContext {
  selectedValues: Ref<string[]>;
  addValue: (value: string) => void;
  removeValue: (value: string) => void;
  open: Ref<boolean>;
  setOpen: (value: boolean) => void;
  inputRef: Ref<HTMLElement | null>;
  listRef: Ref<HTMLElement | null>;
  listStyles: Ref<Record<string, string>>;
}

export const TagPickerContextKey: InjectionKey<TagPickerContext> =
  Symbol("TagPickerContext");
