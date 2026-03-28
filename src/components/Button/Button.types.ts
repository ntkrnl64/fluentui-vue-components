export type ButtonAppearance =
  | "secondary"
  | "primary"
  | "outline"
  | "subtle"
  | "transparent";
export type ButtonShape = "rounded" | "circular" | "square";
export type ButtonSize = "small" | "medium" | "large";

export interface ButtonProps {
  appearance?: ButtonAppearance;
  shape?: ButtonShape;
  size?: ButtonSize;
  disabled?: boolean;
  disabledFocusable?: boolean;
  iconPosition?: "before" | "after";
  as?: "button" | "a";
}

export interface CompoundButtonProps extends ButtonProps {
  secondaryContent?: string;
}

export interface ToggleButtonProps extends ButtonProps {
  checked?: boolean;
}

export interface SplitButtonProps extends ButtonProps {
  menuButtonDisabled?: boolean;
}
