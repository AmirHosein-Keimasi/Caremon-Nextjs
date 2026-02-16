"use client";

import { KeyboardEvent, ReactElement } from "react";

import MingcuteLocationLine from "@/icons/MingcuteLocationLine";
import MingcuteSearchLine from "@/icons/MingcuteSearchLine";

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
    <div className="flex items-center gap-2 w-[min(50rem,100%)] px-4 border border-[var(--color-gray-20)] rounded-full focus-within:border-[var(--color-primary)]">
      <div className="grid items-center text-[var(--fz-500)] focus-within:text-[var(--color-primary)]">
        <MingcuteSearchLine />
      </div>
      <input
        type="text"
        placeholder="نوع خودرو ، محل تحویل ، استان و شهرستان و ..."
        value={value ?? ""}
        onChange={(event) => onValueChange?.(event.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 bg-transparent py-4 border-none focus:outline-none"
      />
      <div className="bg-[var(--color-gray-20)] h-8 w-px"></div>
      <div>
        <button
          type="button"
          onClick={onSubmit}
          className="bg-transparent text-[var(--color-gray-98)] flex items-center gap-1 px-2 py-2 border-none rounded-[var(--border-radius)] cursor-pointer [&_svg]:text-[1.5em]"
        >
          <MingcuteLocationLine />
          همه شهرها
        </button>
      </div>
    </div>
  );
}
