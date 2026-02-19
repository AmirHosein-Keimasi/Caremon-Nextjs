"use client";

import { ReactElement, useContext } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

import { FiltersContext } from "../../providers/filter.providers";

const OPTIONS = [
  "آذربایجان شرقی",
  "آذربایجان غربی",
  "اصفهان",
  "البرز",
  "ایلام",
  "بوشهر",
  "تهران",
  "چهارمحال و بختیاری",
  "خراسان جنوبی",
  "خراسان رضوی",
  "خراسان شمالی",
  "خوزستان",
  "زنجان",
  "سمنان",
  "سیستان و بلوچستان",
  "فارس",
  "قزوین",
  "قم",
  "کردستان",
  "کرمان",
  "کرمانشاه",
  "کهگیلویه و بویراحمد",
  "گلستان",
  "گیلان",
  "لرستان",
  "مازندران",
  "مركزی",
  "هرمزگان",
  "همدان",
  "یزد",
];

export default function LocationFilterComponent(): ReactElement {
  const { filters, dispatchFilters } = useContext(FiltersContext);

  const selected = (filters.location ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const toggle = (value: string): void => {
    const next = selected.includes(value)
      ? selected.filter((v) => v !== value)
      : [...selected, value];
    dispatchFilters({
      type: "updated_filter",
      key: "location",
      value: next.join(","),
    });
  };

  return (
    <Card>
      <CardContent className="pt-3 pb-1">
        <Label className="mb-1.5 block font-bold text-sm">
          استان — چند انتخاب
        </Label>
        <ul className="max-h-72 space-y-0.5 overflow-auto [scrollbar-width:thin] [scrollbar-color:#888_#f3f4f6]">
          {OPTIONS.map((loc) => (
            <li key={loc}>
              <label className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 hover:bg-accent">
                <Checkbox
                  checked={selected.includes(loc)}
                  onCheckedChange={() => toggle(loc)}
                />
                <span className="text-sm font-normal">{loc}</span>
              </label>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
