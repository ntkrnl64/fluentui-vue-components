import type { InjectionKey, Ref } from "vue";

export interface TableContext {
  size: Ref<"extra-small" | "small" | "medium">;
  noNativeElements: boolean;
  sortable: boolean;
}

export const TableContextKey: InjectionKey<TableContext> =
  Symbol("TableContext");
