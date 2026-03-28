import type { InjectionKey, Ref } from "vue";

export interface SwatchPickerContext {
  selectedValue: Ref<string>;
  selectValue: (value: string) => void;
  size: Ref<"extra-small" | "small" | "medium" | "large">;
  shape: Ref<"rounded" | "square" | "circular">;
}

export const SwatchPickerContextKey: InjectionKey<SwatchPickerContext> = Symbol(
  "SwatchPickerContext",
);
