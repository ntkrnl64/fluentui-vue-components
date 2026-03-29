import type { InjectionKey, Ref } from "vue";

export type RatingSize = "small" | "medium" | "large" | "extra-large";
export type RatingColor = "brand" | "marigold" | "neutral";

export interface RatingItemContext {
  value: Ref<number>;
  hoveredValue: Ref<number | undefined>;
  step: number;
  name: string;
  color: RatingColor;
  size: RatingSize;
  interactive: boolean;
  compact?: boolean;
  itemLabel?: (value: number) => string;
}

export const RatingItemContextKey: InjectionKey<RatingItemContext> =
  Symbol("RatingItemContext");
