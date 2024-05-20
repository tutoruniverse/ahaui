import React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "secondary" | "accent";
  size?: "small" | "medium" | "large";
  roundedSize?: "none" | "small" | "medium" | "large";
}

const BadgeStyle = {
  base: {
    color: "var(--_aha.badge.color)",
    background: "var(--_aha.badge.background)",
    padding: "var(--_aha.badge.padding)",
    borderRadius: "var(--_aha.badge.border_radius)",
    fontSize: "var(--_aha.badge.font_size)",
  },
  size: {
    small: {
      "--_aha.badge.padding": "var(--_aha.badge.small.padding)",
      "--_aha.badge.font_size": "var(--_aha.badge.small.font_size)",
    },
    medium: {
      "--_aha.badge.padding": "var(--_aha.badge.medium.padding)",
      "--_aha.badge.font_size": "var(--_aha.badge.medium.font_size)",
    },
    large: {
      "--_aha.badge.padding": "var(--_aha.badge.large.padding)",
      "--_aha.badge.font_size": "var(--_aha.badge.large.font_size)",
    },
  },
  roundedSize: {
    none: {
      "--_aha.badge.border_radius": "var(--_aha.badge.border_radius.none)",
    },
    small: {
      "--_aha.badge.border_radius": "var(--_aha.badge.border_radius.small)",
    },
    medium: {
      "--_aha.badge.border_radius": "var(--_aha.badge.border_radius.medium)",
    },
    large: {
      "--_aha.badge.border_radius": "var(--_aha.badge.border_radius.large)",
    },
  },
  variant: {
    primary: {
      "--_aha.badge.color": "var(--_aha.colors.white, #fff)",
      "--_aha.badge.background": "var(--_aha.colors.primary)",
    },
    secondary: {
      "--_aha.badge.color": "var(--_aha.colors.white, #fff)",
      "--_aha.badge.background": "var(--_aha.colors.secondary)",
    },
    accent: {
      "--_aha.badge.color": "var(--_aha.colors.white, #fff)",
      "--_aha.badge.background": "var(--_aha.colors.accent)",
    },
  },
};

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = "primary",
      size = "medium",
      roundedSize = "medium",
      className,
      ...rest
    },
    ref
  ) => {
    const badgeStyles = {
      ...BadgeStyle.base,
      ...BadgeStyle.size[size],
      ...BadgeStyle.roundedSize[roundedSize],
      ...BadgeStyle.variant[variant],
    };

    return (
      <span
        ref={ref}
        style={{
          ...badgeStyles,
        }}
        {...rest}
      />
    );
  }
);

Badge.displayName = "Badge";
export default Badge;
