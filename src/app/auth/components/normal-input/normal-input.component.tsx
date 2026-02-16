import React from "react";

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
  readOnly?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
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

    return (
      <div className={`flex flex-col ${className}`}>
        {label && (
          <label
            htmlFor={id}
            className="block mb-2 text-[var(--fz-300)] leading-5 font-medium text-[var(--color-text-700)]"
          >
            {label}
            {/* {required && <span className={styles.required}>*</span>} */}
          </label>
        )}
        <input
          ref={ref}
          type={type}
          id={id}
          name={inputName}
          className={`bg-[var(--color-surface-400)] text-[var(--color-text-700)] rounded-[var(--border-radius)] block w-full border-none outline-none py-2.5 px-2.5 text-[var(--fz-300)] leading-5 border border-[var(--color-border)] focus:border-[var(--color-primary)] focus:shadow-[0_0_0_1px_var(--color-primary)] placeholder:text-[var(--color-gray-70)] placeholder:text-[var(--fz-300)] ${
            showError ? "border-[var(--color-danger)]" : ""
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
          <p className="text-[var(--color-danger)] text-[var(--fz-200)] leading-4 mt-1">
            {errorText}
          </p>
        )}
      </div>
    );
  },
);

InputField.displayName = "InputField";

export default InputField;
