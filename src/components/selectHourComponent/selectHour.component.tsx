"use client";

import { ReactElement, useState } from "react";

import SelectComponent from "../select/select.component";

import { SelectOptionType } from "@/types/select-option.type";

// تابع تبدیل عدد انگلیسی به فارسی
const toPersianNumber = (input: string): string => {
  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
  return input.replace(/\d/g, (d) => persianDigits[parseInt(d)]);
};

const timeOptions: SelectOptionType[] = Array.from({ length: 17 }, (_, i) => {
  const hour = (7 + i).toString().padStart(2, "0");
  const label = `${hour}:00`;
  return {
    value: label,
    label: toPersianNumber(label),
  };
});

export default function SelectHourComponent(): ReactElement {
  const [selectedOption, setSelectedOption] = useState<SelectOptionType>(
    timeOptions[0],
  );

  const handleSortChange = (option: SelectOptionType) => {
    setSelectedOption(option);
  };

  return (
    <SelectComponent
      floating
      title=""
      options={timeOptions}
      selectedOption={selectedOption}
      onSelectedOptionChange={handleSortChange}
    />
  );
}
