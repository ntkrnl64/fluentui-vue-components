import type { InjectionKey, Ref } from "vue";

export type BackgroundAppearance = "brand" | "none";

export const BackgroundAppearanceKey: InjectionKey<Ref<BackgroundAppearance>> =
  Symbol("BackgroundAppearance");
