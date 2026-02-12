"use client";

import { KeyboardEvent, ReactElement } from "react";

import MingcuteLocationLine from "@/icons/MingcuteLocationLine";
import MingcuteSearchLine from "@/icons/MingcuteSearchLine";

import styles from "./globall-search-box.module.css";

type Props = {
  value?: string;
  onValueChange?: (value: string) => void;
  onSubmit?: () => void;
};

export default function GlobalSearchBoxComponent({
  value,
  onValueChange,
  onSubmit,
}: Props): ReactElement {
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === "Enter") {
      event.preventDefault();
      onSubmit?.();
    }
  };

  return (
    <div className={styles["global-search-box"]}>
      <div className={styles.prefix}>
        <MingcuteSearchLine />
      </div>
      <input
        type="text"
        placeholder="نوع خودرو ، محل تحویل ، استان و شهرستان و ..."
        value={value ?? ""}
        onChange={(event) => onValueChange?.(event.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div className={styles.divider}></div>
      <div className={styles.suffix}>
        <button type="button" onClick={onSubmit}>
          <MingcuteLocationLine />
          همه شهرها
        </button>
      </div>
    </div>
  );
}
