export { default as FluentProvider } from "./FluentProvider.vue";
export { createCSSRuleFromTheme } from "./createCSSRuleFromTheme";

// Re-export themes from @fluentui/react-theme
export {
  webLightTheme,
  webDarkTheme,
  teamsLightTheme,
  teamsDarkTheme,
  teamsHighContrastTheme,
  tokens,
  typographyStyles,
  createLightTheme,
  createDarkTheme,
  createHighContrastTheme,
  themeToTokensObject,
} from "@fluentui/react-theme";

export type { Theme, PartialTheme, BrandVariants } from "@fluentui/react-theme";
