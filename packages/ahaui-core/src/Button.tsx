import React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent";
  size?: "small" | "medium" | "large";
  width?: "auto" | "full" | "min";
  onlyIcon?: boolean;
}

const ButtonStyles = {
  base: {
    // primary
    "--_aha.button.primary.color": "var(--_aha.colors.white, #ffffff)",
    "--_aha.button.primary.background": "var(--_aha.colors.primary, #375de7)",
    "--_aha.button.primary.background_hover":
      "var(--_aha.colors.primary.dark, #2C4AB8)",
    "--_aha.button.primary.border": "var(--_aha.colors.primary, #375de7)",
    // secondary
    "--_aha.button.secondary.color": "var(--_aha.colors.dark, #172b4d)",
    "--_aha.button.secondary.background": "var(--_aha.colors.white, #ffffff)",
    "--_aha.button.secondary.background_hover":
      "var(--_aha.colors.neutral20, #f4f5f7)",
    "--_aha.button.secondary.border": "var(--_aha.colors.neutral40, #dfe1e6)",
    // accent
    "--_aha.button.accent.color": "var(--_aha.colors.white, #ffffff)",
    "--_aha.button.accent.background": "var(--_aha.colors.accent, #ED6200)",
    "--_aha.button.accent.background_hover":
      "var(--_aha.colors.accent.dark, #D55800)",
    "--_aha.button.accent.border": "var(--_aha.colors.accent, #ED6200)",

    // Sizes
    "--_aha.button.small.padding": "8px 16px",
    "--_aha.button.small.font_size": "14px",
    "--_aha.button.medium.padding": "12px 24px",
    "--_aha.button.medium.font_size": "16px",
    "--_aha.button.large.padding": "16px 32px",
    "--_aha.button.large.font_size": "18px",
    // Width
    "--_aha.button.width.auto": "auto",
    "--_aha.button.width.full": "100%",
    "--_aha.button.width.min": "112px",
    // Global styles
    "--_aha.button.rounded": "var(--_aha.rounded.medium, 8px)",
    "--_aha.button.font": "var(--_aha.fonts.body, 'Roboto', sans-serif)",
    "--_aha.button.font_weight": "var(--_aha.fonts.medium, 500)",
    background: "var(--_aha.button.background)",
    "&:hover": {
      background: "var(--_aha.button.background_hover)",
    },
    color: "var(--_aha.button.color)",
    border: "1px solid",
    borderColor: "var(--_aha.button.border)",
    borderRadius: "var(--_aha.button.rounded)",
    fontFamily: "var(--_aha.button.font)",
    fontWeight: "var(--_aha.button.font_weight)",
    padding: "var(--_aha.button.padding)",
    fontSize: "var(--_aha.button.font_size)",
    width: "var(--_aha.button.width)",
  },
  width: {
    auto: {
      "--_aha.button.width": "var(--_aha.button.width.auto)",
    },
    full: {
      "--_aha.button.width": "var(--_aha.button.width.full)",
    },
    min: {
      "--_aha.button.width": "var(--_aha.button.width.min)",
    },
  },
  size: {
    small: {
      "--_aha.button.padding": "var(--_aha.button.small.padding)",
      "--_aha.button.font_size": "var(--_aha.button.small.font_size)",
    },
    medium: {
      "--_aha.button.padding": "var(--_aha.button.medium.padding)",
      "--_aha.button.font_size": "var(--_aha.button.medium.font_size)",
    },
    large: {
      "--_aha.button.padding": "var(--_aha.button.large.padding)",
      "--_aha.button.font_size": "var(--_aha.button.large.font_size)",
    },
  },
  variant: {
    primary: {
      "--_aha.button.color": "var(--_aha.button.primary.color)",
      "--_aha.button.background": "var(--_aha.button.primary.background)",
      "--_aha.button.background_hover":
        "var(--_aha.button.primary.background_hover)",
    },
    secondary: {
      "--_aha.button.color": "var(--_aha.button.secondary.color)",
      "--_aha.button.background": "var(--_aha.button.secondary.background)",
      "--_aha.button.background_hover":
        "var(--_aha.button.secondary.background_hover)",
      "--_aha.button.border": "var(--_aha.button.secondary.border)",
    },
    accent: {
      "--_aha.button.color": "var(--_aha.button.accent.color)",
      "--_aha.button.background": "var(--_aha.button.accent.background)",
      "--_aha.button.background_hover":
        "var(--_aha.button.accent.background_hover)",
      "--_aha.button.border": "var(--_aha.button.accent.border)",
    },
  },
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "medium",
      width = "auto",
      onlyIcon = false,
      children,
      ...rest
    },
    ref
  ) => {
    const buttonStyles = {
      ...(ButtonStyles.base as React.CSSProperties),
      ...(ButtonStyles.variant[variant] as React.CSSProperties),
      ...(ButtonStyles.size[size] as React.CSSProperties),
      ...(ButtonStyles.width[width] as React.CSSProperties),
    };

    return (
      <button
        ref={ref}
        style={{
          ...buttonStyles,
        }}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
