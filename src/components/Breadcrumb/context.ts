import type { InjectionKey } from "vue";

export type BreadcrumbSize = "small" | "medium" | "large";

export interface BreadcrumbContext {
  size: BreadcrumbSize;
}

export const BreadcrumbContextKey: InjectionKey<BreadcrumbContext> =
  Symbol("BreadcrumbContext");
