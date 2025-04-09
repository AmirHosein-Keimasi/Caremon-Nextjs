import React from "react";
import styles from "./normal-input.module.css"; // مسیر فایل استایل‌های شما

interface InputFieldProps {
  type?: "text" | "email" | "tel" | "number" | "date";
  label?: string;
  placeholder?: string;
  id: string;
  name?: string;
  value?: string;
  defaultValue?: string;
  errorText?: string;
  showError?: boolean;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
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
      onChange,
      onBlur,
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

    return (
      <div className={`${styles.inputGroup} ${className}`}>
        {label && (
          <label htmlFor={id} className={styles.label}>
            {label}
            {/* {required && <span className={styles.required}>*</span>} */}
          </label>
        )}
        <input
          ref={ref}
          type={type}
          id={id}
          name={inputName}
          className={`${styles.input} ${showError ? styles.error : ""}`}
          placeholder={inputPlaceholder}
          value={value}
          defaultValue={defaultValue}
          required={required}
          disabled={disabled}
          onChange={onChange}
          onBlur={onBlur}
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
