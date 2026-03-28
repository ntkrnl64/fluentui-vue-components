import type { InjectionKey, Ref } from "vue";

export interface ColorPickerContext {
  color: Ref<{ h: number; s: number; v: number; a: number }>;
  setColor: (color: { h?: number; s?: number; v?: number; a?: number }) => void;
}

export const ColorPickerContextKey: InjectionKey<ColorPickerContext> =
  Symbol("ColorPickerContext");
