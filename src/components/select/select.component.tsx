"use client";

import { ReactElement } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectOptionType } from "@/types/select-option.type";

type Props = {
  floating?: boolean;
  title?: string;
  placeholder?: string;
  options: SelectOptionType[];
  selectedOption?: SelectOptionType;
  onSelectedOptionChange?: (value: SelectOptionType) => void;
  onIsOpenChange?: (value: boolean) => void;
};

export default function SelectComponent({
  floating,
  title,
  placeholder,
  options,
  selectedOption,
  onSelectedOptionChange,
}: Props): ReactElement {
  const handleValueChange = (value: string) => {
    const option = options.find((o) => o.value === value);
    if (option && option !== selectedOption) {
      onSelectedOptionChange?.(option);
    }
  };

  return (
    <div className={title ? "flex flex-row-reverse items-center gap-2" : ""}>
      {title && (
        <span className="text-[var(--fz-300)] font-bold">{title}: </span>
      )}
      <Select
        value={selectedOption?.value ?? ""}
        onValueChange={handleValueChange}
      >
        <SelectTrigger
          className={
            floating
              ? "min-w-[8rem] bg-[var(--color-surface-700)] shadow-[var(--shadow-400)]"
              : "min-w-[8rem]"
          }
        >
          <SelectValue placeholder={placeholder ?? "انتخاب کنید"} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
