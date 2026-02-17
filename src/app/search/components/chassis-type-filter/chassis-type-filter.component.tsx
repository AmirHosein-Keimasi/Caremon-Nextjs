"use client";

import { ReactElement, useContext } from "react";

import RadioFilterComponent from "../radio-filter/radio-filter.component";
import { FiltersContext } from "../../providers/filter.providers";

const CHASSIS_OPTIONS = [
  { value: "سواری", label: "سواری" },
  { value: "سدان", label: "سدان" },
  { value: "هاچ‌بک", label: "هاچ‌بک" },
  { value: "کراس‌اوور", label: "کراس‌اوور" },
];

export default function ChassisTypeFilterComponent(): ReactElement {
  const { filters, dispatchFilters } = useContext(FiltersContext);

  const changeHandler = (value: string): void => {
    dispatchFilters({ type: "updated_filter", key: "chassisType", value });
  };

  return (
    <RadioFilterComponent
      title="نوع خودرو"
      name="chassisType"
      options={CHASSIS_OPTIONS}
      value={filters.chassisType}
      onChange={changeHandler}
    />
  );
}
