import type { InjectionKey } from "vue";

export type ListNavigationMode = "items" | "composite";

export interface ListContext {
  navigationMode?: ListNavigationMode;
}

export const ListContextKey: InjectionKey<ListContext> = Symbol("ListContext");
