export type TextSize =
  | 100
  | 200
  | 300
  | 400
  | 500
  | 600
  | 700
  | 800
  | 900
  | 1000;
export type TextWeight = "regular" | "medium" | "semibold" | "bold";
export type TextAlign = "start" | "center" | "end" | "justify";
export type TextFont = "base" | "monospace" | "numeric";

export interface TextProps {
  as?:
    | "span"
    | "p"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "pre"
    | "strong"
    | "em"
    | "b"
    | "i"
    | "u";
  size?: TextSize;
  weight?: TextWeight;
  align?: TextAlign;
  font?: TextFont;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  truncate?: boolean;
  block?: boolean;
  wrap?: boolean;
}
