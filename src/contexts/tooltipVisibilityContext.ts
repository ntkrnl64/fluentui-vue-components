import type { InjectionKey, Ref } from "vue";

export const TooltipVisibilityKey: InjectionKey<Ref<boolean>> =
  Symbol("TooltipVisibility");
