"use client";

import { ReactElement, useContext, useMemo } from "react";

import SelectComponent from "@/components/select/select.component";

import { SelectOptionType } from "@/types/select-option.type";

import { FiltersContext } from "../../providers/filter.providers";

const SORT_OPTIONS: SelectOptionType[] = [
  { value: "price-to-up", label: "ارزان‌ترین" },
  { value: "price-to-down", label: "گران‌ترین" },
  { value: "model", label: "جدیدترین (مدل)" },
  { value: "model-asc", label: "قدیمی‌ترین (مدل)" },
  { value: "name", label: "حروف الفبا (الف-ی)" },
  { value: "name-desc", label: "حروف الفبا (ی-الف)" },
  { value: "rating", label: "بالاترین امتیاز" },
  { value: "passengers", label: "ظرفیت سرنشین" },
];

export default function SortComponent(): ReactElement {
  const { filters, dispatchFilters } = useContext(FiltersContext);

  const selectedOption = useMemo(() => {
    const current = filters.sortType;
    const found = SORT_OPTIONS.find((o) => o.value === current);
    return found ?? SORT_OPTIONS[0];
  }, [filters.sortType]);

  const handleSortChange = (option: SelectOptionType) => {
    dispatchFilters({
      type: "updated_filter",
      key: "sortType",
      value: option.value,
    });
  };

  return (
    <SelectComponent
      floating
      title="مرتب‌سازی"
      options={SORT_OPTIONS}
      selectedOption={selectedOption}
      onSelectedOptionChange={handleSortChange}
    />
  );
}
