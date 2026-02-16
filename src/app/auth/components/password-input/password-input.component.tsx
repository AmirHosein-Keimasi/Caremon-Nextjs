"use client";

import {
  ComponentProps,
  ForwardedRef,
  forwardRef,
  ReactElement,
  useState,
} from "react";
import clsx from "clsx";

import MingcuteEye2Line from "@/icons/MingcuteEye2Line";
import MingcuteEyeCloseLine from "@/icons/MingcuteEyeCloseLine";

type PasswordInputProps = ComponentProps<"input"> & {
  label: string;
  className?: string;
  prefixIcon?: ReactElement;
  customShowPasswordIcon?: ReactElement;
  customHidePasswordIcon?: ReactElement;
};

const PasswordInput = forwardRef(
  (
    {
      label,
      customShowPasswordIcon = <MingcuteEye2Line />,
      customHidePasswordIcon = <MingcuteEyeCloseLine />,
      className,
      ...otherProps
    }: PasswordInputProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible((prev) => !prev);

    return (
      <label className={clsx("block mb-4 w-full", className)}>
        <div className="block mb-2 text-[var(--fz-300)] leading-5 font-medium text-[var(--color-text-700)]">
          {label}
        </div>
        <div className="relative flex items-center border border-[var(--color-border)] rounded-[var(--border-radius)] overflow-hidden transition-[border-color] duration-[var(--animation-duration-fast)] w-full bg-[var(--color-surface-400)] focus-within:border-[var(--color-primary)] focus-within:shadow-[0_0_0_1px_var(--color-primary)]">
          <input
            ref={ref}
            type={isVisible ? "text" : "password"}
            placeholder=""
            className="flex-1 py-2 px-2 border-none outline-none bg-transparent text-[var(--fz-400)] min-w-0 text-[var(--color-text-400)] placeholder:text-[var(--color-gray-70)] placeholder:text-[var(--fz-300)]"
            {...otherProps}
          />
          <button
            type="button"
            className="p-3 bg-transparent border-none cursor-pointer flex items-center justify-center text-[var(--color-gray-70)] transition-[color] duration-[var(--animation-duration-fast)] text-[var(--fz-400)] hover:text-[var(--color-primary)] focus:outline-none focus:shadow-[0_0_0_2px_color-mix(in_srgb,var(--color-primary)_50%,transparent)]"
            onClick={toggleVisibility}
            aria-label={isVisible ? "مخفی کردن پسورد" : "نمایش پسورد"}
          >
            <div className="flex items-center justify-center px-3 text-[var(--color-gray-70)] text-[var(--fz-400)]">
              {isVisible ? customHidePasswordIcon : customShowPasswordIcon}
            </div>
          </button>
        </div>
      </label>
    );
  },
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
