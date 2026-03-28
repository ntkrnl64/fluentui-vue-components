import type { InjectionKey, Ref } from "vue";

export interface ProviderContextValue {
  dir: Ref<"ltr" | "rtl">;
  targetDocument: Document | undefined;
}

export const ProviderContextKey: InjectionKey<ProviderContextValue> =
  Symbol("FluentProvider");
