import { inject, ref } from "vue";
import type { Ref } from "vue";
import type { Theme } from "@fluentui/react-theme";
import { webLightTheme } from "@fluentui/react-theme";
import { ThemeKey, ProviderContextKey } from "../contexts";

export interface FluentContext {
  theme: Ref<Theme>;
  dir: Ref<"ltr" | "rtl">;
  targetDocument: Document | undefined;
}

export function useFluentContext(): FluentContext {
  const theme = inject(ThemeKey, ref(webLightTheme) as Ref<Theme>);
  const providerCtx = inject(ProviderContextKey, undefined);

  return {
    theme,
    dir: providerCtx?.dir ?? ref("ltr"),
    targetDocument:
      providerCtx?.targetDocument ??
      (typeof document !== "undefined" ? document : undefined),
  };
}
