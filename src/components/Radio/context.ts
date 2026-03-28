import type { InjectionKey, Ref } from "vue";

export interface RadioGroupContext {
  name: string;
  modelValue: Ref<string>;
  disabled: Ref<boolean>;
  layout: Ref<"vertical" | "horizontal" | "horizontal-stacked">;
}

export const RadioGroupContextKey: InjectionKey<RadioGroupContext> =
  Symbol("RadioGroup");
