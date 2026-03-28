import type { PartialTheme } from "@fluentui/react-theme";

const CSS_ESCAPE_MAP: Record<string, string> = {
  "<": "\\3C ",
  ">": "\\3E ",
};

function escapeForStyleTag(value: string): string {
  return value.replace(/[<>]/g, (match) => CSS_ESCAPE_MAP[match] ?? match);
}

/**
 * Creates a CSS rule from a theme object, converting each token to a CSS custom property.
 */
export function createCSSRuleFromTheme(
  selector: string,
  theme: PartialTheme | undefined,
): string {
  if (theme) {
    const cssVarsAsString = (
      Object.keys(theme) as (keyof typeof theme)[]
    ).reduce((cssVarRule, cssVar) => {
      return `${cssVarRule}--${cssVar}: ${theme[cssVar]}; `;
    }, "");

    return `${selector} { ${escapeForStyleTag(cssVarsAsString)} }`;
  }

  return `${selector} {}`;
}
