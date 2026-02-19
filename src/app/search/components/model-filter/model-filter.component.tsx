"use client";

import { ReactElement, useContext } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

import { FiltersContext } from "../../providers/filter.providers";

const OPTIONS = [
  { value: "2024-1403", label: "1403 - 2024" },
  { value: "2023-1402", label: "1402 - 2023" },
  { value: "2022-1401", label: "1401 - 2022" },
  { value: "2021-1400", label: "1400 - 2021" },
  { value: "2020-1399", label: "1399 - 2020" },
  { value: "2019-1398", label: "1398 - 2019" },
  { value: "2018-1397", label: "1397 - 2018" },
  { value: "2017-1396", label: "1396 - 2017" },
];

export default function ModelFilterComponent(): ReactElement {
  const { filters, dispatchFilters } = useContext(FiltersContext);

  const selected = (filters.model ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const toggle = (value: string): void => {
    const next = selected.includes(value)
      ? selected.filter((v) => v !== value)
      : [...selected, value];
    dispatchFilters({
      type: "updated_filter",
      key: "model",
      value: next.join(","),
    });
  };

  return (
    <Card>
      <CardContent className="pt-3 pb-1">
        <Label className="mb-1.5 block font-bold text-sm">
          مدل (سال) — چند انتخاب
        </Label>
        <ul className="flex flex-col gap-1 max-h-72 overflow-auto [scrollbar-width:thin]">
          {OPTIONS.map((opt) => (
            <li key={opt.value}>
              <label className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 hover:bg-accent">
                <Checkbox
                  checked={selected.includes(opt.value)}
                  onCheckedChange={() => toggle(opt.value)}
                />
                <span className="text-sm font-normal">{opt.label}</span>
              </label>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
