import React from "react";
import styles from "./normal-input.module.css";

interface InputFieldProps {
  type?: "text" | "email" | "tel" | "number" | "date";
  label?: string;
  placeholder?: string;
  id?: string;
  name?: string;
  value?: string;
  defaultValue?: string;
  errorText?: string;
  showError?: boolean;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  autoComplete?: string;
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      type = "text",
      label,
      placeholder,
      id,
      name,
      value,
      defaultValue,
      errorText,
      showError = false,
      className = "",
      required = false,
      disabled = false,
      readOnly = false,
      onChange,
      onBlur,
      onClick,
      autoComplete,
    },
    ref,
  ) => {
    const getDefaultPlaceholder = () => {
      switch (type) {
        case "email":
          return "example@example.com";
        case "tel":
          return "09123456789";
        default:
          return "";
      }
    };

    const inputPlaceholder = placeholder || getDefaultPlaceholder();
    const inputName = name || id;
    const inputId = id || Math.random().toString(36).substring(2);

    return (
      <div className={`${styles.inputGroup} ${className}`}>
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
          </label>
        )}
        <input
          ref={ref}
          type={type}
          id={inputId}
          name={inputName}
          className={`${styles.input} ${showError ? styles.error : ""} ${
            disabled ? styles.disabled : ""
          }`}
          placeholder={inputPlaceholder}
          value={value}
          defaultValue={defaultValue}
          required={required}
          disabled={disabled}
          readOnly={readOnly}
          onChange={onChange}
          onBlur={onBlur}
          onClick={onClick}
          autoComplete={autoComplete}
        />
        {showError && errorText && (
          <p className={styles.errorText}>{errorText}</p>
        )}
      </div>
    );
  },
);

InputField.displayName = "InputField";

export default InputField;
