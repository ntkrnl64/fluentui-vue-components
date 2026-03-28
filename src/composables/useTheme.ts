import { inject } from "vue";
import type { Ref } from "vue";
import type { Theme } from "@fluentui/react-theme";
import { webLightTheme } from "@fluentui/react-theme";
import { ThemeKey } from "../contexts";

const defaultTheme = { value: webLightTheme } as Ref<Theme>;

export function useTheme(): Ref<Theme> {
  return inject(ThemeKey, defaultTheme);
}
