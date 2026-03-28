import type { InjectionKey, Ref } from "vue";

export type RatingSize = "small" | "medium" | "large" | "extra-large";

export interface RatingContext {
  modelValue: Ref<number>;
  hoverValue: Ref<number | null>;
  size: RatingSize;
  color: "brand" | "marigold" | "neutral";
  disabled: boolean;
  readOnly: boolean;
  selectStar: (index: number) => void;
  setHover: (index: number | null) => void;
}

export const RatingContextKey: InjectionKey<RatingContext> =
  Symbol("RatingContext");
