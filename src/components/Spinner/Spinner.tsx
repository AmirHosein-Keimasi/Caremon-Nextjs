import React from "react";

interface LoaderProps {
  size?: number;
  color?: string;
  className?: string;
}

const Spinner: React.FC<LoaderProps> = ({
  size = 30,
  color = "var(--primary-foreground)",
  className = "",
}) => {
  const loaderStyle = {
    width: `${size}px`,
    color: color,
    aspectRatio: "1",
    borderRadius: "50%",
    display: "grid",
    background: `
      conic-gradient(
        from 90deg at 4px 4px,
        transparent 90deg,
        currentColor 0
      ) -4px -4px /
      calc(50% + 2px) calc(50% + 2px),
      radial-gradient(
        farthest-side,
        currentColor 4px,
        transparent 4px calc(100% - 6px),
        currentColor calc(100% - 6px)
      )
      no-repeat
    `,
    animation:
      "spin-loader 1.5s infinite cubic-bezier(0.68, -0.55, 0.27, 1.55)",
    position: "relative" as const,
    boxShadow: "0 0 10px rgba(79, 70, 229, 0.2)",
  };

  return (
    <div
      className={`relative ${className}`}
      style={loaderStyle}
      aria-label="در حال بارگذاری"
      role="status"
    >
      <div
        style={{
          borderRadius: "inherit",
          background: "inherit",
          transform: "rotate(45deg)",
          opacity: 0.8,
          position: "absolute",
          inset: 0,
        }}
      />
    </div>
  );
};

export default Spinner;
