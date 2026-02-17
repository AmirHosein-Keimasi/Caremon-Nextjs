"use client";

import {
  ComponentProps,
  ForwardedRef,
  forwardRef,
  ReactElement,
  useState,
} from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type PasswordInputProps = ComponentProps<"input"> & {
  label: string;
  className?: string;
};

const PasswordInput = forwardRef(
  (
    { label, className, ...otherProps }: PasswordInputProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
      <div className={className}>
        <Label className="mb-2 block text-[var(--fz-300)] font-medium text-[var(--color-text-700)]">
          {label}
        </Label>
        <div className="relative flex items-center">
          <Input
            ref={ref}
            type={isVisible ? "text" : "password"}
            placeholder=""
            className="pe-10"
            {...otherProps}
          />
          <button
            type="button"
            className="absolute end-2 p-1 text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setIsVisible((prev) => !prev)}
            aria-label={isVisible ? "مخفی کردن پسورد" : "نمایش پسورد"}
          >
            {isVisible ? (
              <EyeOffIcon className="size-4" />
            ) : (
              <EyeIcon className="size-4" />
            )}
          </button>
        </div>
      </div>
    );
  },
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
