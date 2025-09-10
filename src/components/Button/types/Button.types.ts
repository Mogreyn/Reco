import type { ReactElement } from "react";
import type React from "react";
export type ButtonSize =
  | "s"
  | "m"
  | "l"
  | "pr"
  | "xl"
  | "xxl"
  | "black1"
  | "black2"
  | "black3";
export type ButtonState =
  | "default"
  | "hover"
  | "focus"
  | "disabled"
  | "pressed";
export type ButtonVariant = "primary" | "secondary" | "black" | "transparent";
export interface ButtonProps {
  size?: ButtonSize;
  disabled?: boolean;
  variant?: ButtonVariant;
  state?: ButtonState;
  onClick?: (e: React.MouseEvent) => void;
  children: React.ReactNode;
  icon?: ReactElement | string;
  className?: string;
  style?: React.CSSProperties;
}
