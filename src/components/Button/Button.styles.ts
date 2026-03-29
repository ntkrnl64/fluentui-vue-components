import { makeStyles, makeResetStyles, shorthands } from "@griffel/core";
import { tokens } from "@fluentui/react-theme";

export const useButtonBaseClassName = makeResetStyles({
  alignItems: "center",
  boxSizing: "border-box",
  display: "inline-flex",
  justifyContent: "center",
  textDecorationLine: "none",
  verticalAlign: "middle",
  margin: "0",
  overflow: "hidden",
  backgroundColor: tokens.colorNeutralBackground1,
  color: tokens.colorNeutralForeground1,
  border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
  fontFamily: tokens.fontFamilyBase,
  outlineStyle: "none",
  position: "relative",
  transitionDuration: tokens.durationFaster,
  transitionProperty: "background, border, color",
  transitionTimingFunction: tokens.curveEasyEase,
  "@media screen and (prefers-reduced-motion: reduce)": {
    transitionDuration: "0.01ms",
  },
  ":hover": {
    backgroundColor: tokens.colorNeutralBackground1Hover,
    ...shorthands.borderColor(tokens.colorNeutralStroke1Hover),
    color: tokens.colorNeutralForeground1Hover,
    cursor: "pointer",
  },
  ":hover:active": {
    backgroundColor: tokens.colorNeutralBackground1Pressed,
    ...shorthands.borderColor(tokens.colorNeutralStroke1Pressed),
    color: tokens.colorNeutralForeground1Pressed,
  },
  ":focus-visible": {
    outlineColor: tokens.colorStrokeFocus2,
    outlineWidth: tokens.strokeWidthThick,
    outlineStyle: "solid",
    outlineOffset: "2px",
  },
});

export const useButtonStyles = makeStyles({
  // Appearances
  primary: {
    backgroundColor: tokens.colorBrandBackground,
    ...shorthands.borderColor("transparent"),
    color: tokens.colorNeutralForegroundOnBrand,
    ":hover": {
      backgroundColor: tokens.colorBrandBackgroundHover,
      ...shorthands.borderColor("transparent"),
      color: tokens.colorNeutralForegroundOnBrand,
    },
    ":hover:active": {
      backgroundColor: tokens.colorBrandBackgroundPressed,
      ...shorthands.borderColor("transparent"),
      color: tokens.colorNeutralForegroundOnBrand,
    },
  },
  outline: {
    backgroundColor: tokens.colorTransparentBackground,
    ...shorthands.borderColor(tokens.colorNeutralStroke1),
    color: tokens.colorNeutralForeground1,
    ":hover": {
      backgroundColor: tokens.colorTransparentBackgroundHover,
    },
    ":hover:active": {
      backgroundColor: tokens.colorTransparentBackgroundPressed,
    },
  },
  subtle: {
    backgroundColor: tokens.colorSubtleBackground,
    ...shorthands.borderColor("transparent"),
    color: tokens.colorNeutralForeground2,
    ":hover": {
      backgroundColor: tokens.colorSubtleBackgroundHover,
      ...shorthands.borderColor("transparent"),
      color: tokens.colorNeutralForeground2Hover,
    },
    ":hover:active": {
      backgroundColor: tokens.colorSubtleBackgroundPressed,
      ...shorthands.borderColor("transparent"),
      color: tokens.colorNeutralForeground2Pressed,
    },
  },
  transparent: {
    backgroundColor: tokens.colorTransparentBackground,
    ...shorthands.borderColor("transparent"),
    color: tokens.colorNeutralForeground2,
    ":hover": {
      backgroundColor: tokens.colorTransparentBackgroundHover,
      ...shorthands.borderColor("transparent"),
      color: tokens.colorNeutralForeground2BrandHover,
    },
    ":hover:active": {
      backgroundColor: tokens.colorTransparentBackgroundPressed,
      ...shorthands.borderColor("transparent"),
      color: tokens.colorNeutralForeground2BrandPressed,
    },
  },

  // Sizes
  small: {
    minWidth: "64px",
    ...shorthands.padding("3px", tokens.spacingHorizontalS),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightRegular,
    lineHeight: tokens.lineHeightBase200,
    columnGap: tokens.spacingHorizontalXS,
  },
  medium: {
    minWidth: "96px",
    ...shorthands.padding("5px", tokens.spacingHorizontalM),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase300,
    columnGap: tokens.spacingHorizontalSNudge,
  },
  large: {
    minWidth: "96px",
    ...shorthands.padding("8px", tokens.spacingHorizontalL),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase400,
    columnGap: tokens.spacingHorizontalSNudge,
  },

  // Shapes
  circular: { ...shorthands.borderRadius(tokens.borderRadiusCircular) },
  square: { ...shorthands.borderRadius(tokens.borderRadiusNone) },

  // States
  disabled: {
    backgroundColor: tokens.colorNeutralBackgroundDisabled,
    ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
    color: tokens.colorNeutralForegroundDisabled,
    cursor: "not-allowed",
    ":hover": {
      backgroundColor: tokens.colorNeutralBackgroundDisabled,
      ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
      color: tokens.colorNeutralForegroundDisabled,
      cursor: "not-allowed",
    },
    ":hover:active": {
      backgroundColor: tokens.colorNeutralBackgroundDisabled,
      ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
      color: tokens.colorNeutralForegroundDisabled,
    },
  },

  // Icon-only
  iconOnly: {
    minWidth: "32px",
    maxWidth: "32px",
  },
  iconOnlySmall: {
    minWidth: "24px",
    maxWidth: "24px",
    ...shorthands.padding("1px"),
  },
  iconOnlyLarge: {
    minWidth: "40px",
    maxWidth: "40px",
    ...shorthands.padding("7px"),
  },

  // Icon sizing
  icon: {
    alignItems: "center",
    display: "inline-flex",
    justifyContent: "center",
  },
  iconSmall: {
    fontSize: "20px",
    height: "20px",
    width: "20px",
  },
  iconMedium: {
    fontSize: "20px",
    height: "20px",
    width: "20px",
  },
  iconLarge: {
    fontSize: "24px",
    height: "24px",
    width: "24px",
  },
});
