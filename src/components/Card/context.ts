import type { InjectionKey, Ref } from "vue";

export interface CardContext {
  selected: Ref<boolean>;
  interactive: Ref<boolean>;
}

export const CardContextKey: InjectionKey<CardContext> = Symbol("CardContext");
