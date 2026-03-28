import type { InjectionKey } from "vue";

export type ToolbarSize = "small" | "medium" | "large";

export interface ToolbarContext {
  size: ToolbarSize;
  vertical: boolean;
}

export const ToolbarContextKey: InjectionKey<ToolbarContext> =
  Symbol("ToolbarContext");
