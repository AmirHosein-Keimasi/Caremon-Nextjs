import React from "react";
import styles from "./Spinner.module.css";

interface LoaderProps {
  size?: number;
  color?: string;
  className?: string;
}

const Spinner: React.FC<LoaderProps> = ({
  size = 30,
  color = "var(--color-primary-opposite)",
  className = "",
}) => {
  const loaderStyle = {
    width: `${size}px`,
    color: color,
  };

  return (
    <div
      className={`${styles.loader} ${className}`}
      style={loaderStyle}
      aria-label="Loading"
      role="status"
    />
  );
};

export default Spinner;
