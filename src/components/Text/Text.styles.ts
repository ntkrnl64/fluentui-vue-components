import { makeStyles, makeResetStyles } from "@griffel/core";
import { tokens } from "@fluentui/react-theme";

export const useTextBaseClassName = makeResetStyles({
  fontFamily: tokens.fontFamilyBase,
  fontSize: tokens.fontSizeBase300,
  lineHeight: tokens.lineHeightBase300,
  fontWeight: tokens.fontWeightRegular,
  textAlign: "start",
  display: "inline",
  whiteSpace: "normal",
  overflow: "visible",
  textOverflow: "clip",
});

export const useTextStyles = makeStyles({
  root: {},

  // Sizes
  100: {
    fontSize: tokens.fontSizeBase100,
    lineHeight: tokens.lineHeightBase100,
  },
  200: {
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
  },
  300: {
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
  },
  400: {
    fontSize: tokens.fontSizeBase400,
    lineHeight: tokens.lineHeightBase400,
  },
  500: {
    fontSize: tokens.fontSizeBase500,
    lineHeight: tokens.lineHeightBase500,
  },
  600: {
    fontSize: tokens.fontSizeBase600,
    lineHeight: tokens.lineHeightBase600,
  },
  700: {
    fontSize: tokens.fontSizeHero700,
    lineHeight: tokens.lineHeightHero700,
  },
  800: {
    fontSize: tokens.fontSizeHero800,
    lineHeight: tokens.lineHeightHero800,
  },
  900: {
    fontSize: tokens.fontSizeHero900,
    lineHeight: tokens.lineHeightHero900,
  },
  1000: {
    fontSize: tokens.fontSizeHero1000,
    lineHeight: tokens.lineHeightHero1000,
  },

  // Weights
  regular: { fontWeight: tokens.fontWeightRegular },
  medium: { fontWeight: tokens.fontWeightMedium },
  semibold: { fontWeight: tokens.fontWeightSemibold },
  bold: { fontWeight: tokens.fontWeightBold },

  // Alignment
  center: { textAlign: "center" },
  end: { textAlign: "end" },
  justify: { textAlign: "justify" },

  // Font
  monospace: { fontFamily: tokens.fontFamilyMonospace },
  numeric: { fontFamily: tokens.fontFamilyNumeric },

  // Style
  italic: { fontStyle: "italic" },
  underline: { textDecorationLine: "underline" },
  strikethrough: { textDecorationLine: "line-through" },
  underlineStrikethrough: { textDecorationLine: "line-through underline" },

  // Layout
  truncate: {
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  block: { display: "block" },
  nowrap: { whiteSpace: "nowrap", overflow: "hidden" },
});
