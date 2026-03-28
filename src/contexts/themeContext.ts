import type { Theme } from "@fluentui/react-theme";
import type { InjectionKey, Ref } from "vue";

export type ThemeContextValue = Ref<Theme>;

export const ThemeKey: InjectionKey<ThemeContextValue> = Symbol("FluentTheme");
