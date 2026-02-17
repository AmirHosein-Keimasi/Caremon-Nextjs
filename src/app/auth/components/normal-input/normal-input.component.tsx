import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
      <div className={`flex flex-col gap-2 ${className}`}>
        {label && (
          <Label htmlFor={id} className="text-sm font-medium text-foreground">
            {label}
          </Label>
        )}
        <Input
          ref={ref}
          type={type}
          id={id}
          name={inputName}
          className={showError ? "border-destructive" : ""}
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
          <p className="text-destructive text-xs leading-4">{errorText}</p>
        )}
      </div>
    );
  },
);

InputField.displayName = "InputField";

export default InputField;
