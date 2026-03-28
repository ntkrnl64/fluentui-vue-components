import type { InjectionKey, Ref } from "vue";

export interface DataGridColumn<T = unknown> {
  columnId: string;
  compare?: (a: T, b: T) => number;
  renderHeaderCell: () => string;
  renderCell: (item: T) => string;
}

export interface DataGridContext {
  sortState: Ref<{
    columnId: string;
    direction: "ascending" | "descending";
  } | null>;
  setSortState: (columnId: string) => void;
  selectedRows: Ref<Set<string | number>>;
  toggleRowSelection: (rowId: string | number) => void;
  selectionMode: "none" | "single" | "multiselect";
}

export const DataGridContextKey: InjectionKey<DataGridContext> =
  Symbol("DataGridContext");
