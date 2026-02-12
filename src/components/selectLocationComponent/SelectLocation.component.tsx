"use client";

import { ReactElement, useState } from "react";

import SelectComponent from "../select/select.component";

import { SelectOptionType } from "@/types/select-option.type";

const options: SelectOptionType[] = [
  { value: "تهران", label: "تهران" },
  { value: "اصفهان", label: "اصفهان" },
  { value: "خراسان رضوی", label: "خراسان رضوی" },
  { value: "البرز", label: "البرز" },
];

export default function SelectLocationComponent(): ReactElement {
  const [selectedOption, setSelectedOption] = useState<SelectOptionType>(
    options[0],
  );

  const handleSortChange = (option: SelectOptionType) => {
    setSelectedOption(option);
  };

  return (
    <SelectComponent
      floating
      title=""
      options={options}
      selectedOption={selectedOption}
      onSelectedOptionChange={handleSortChange}
    />
  );
}
