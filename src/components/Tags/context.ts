import type { InjectionKey } from "vue";

export type TagSize = "extra-small" | "small" | "medium";

export interface TagGroupContext {
  size: TagSize;
  dismissible: boolean;
  handleDismiss: (value: string) => void;
}

export const TagGroupContextKey: InjectionKey<TagGroupContext> =
  Symbol("TagGroupContext");
