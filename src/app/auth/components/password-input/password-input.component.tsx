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

import styles from "./password-input.module.css";

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
      <label className={clsx(styles["password-input"], className)}>
        <div className={styles["label-text"]}>{label}</div>
        <div className={styles.box}>
          <input
            ref={ref}
            type={isVisible ? "text" : "password"}
            placeholder=""
            {...otherProps}
          />
          <button
            type="button"
            className={styles["toggle-button"]}
            onClick={toggleVisibility}
            aria-label={isVisible ? "مخفی کردن پسورد" : "نمایش پسورد"}
          >
            <div className={styles["suffix-icon"]}>
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
