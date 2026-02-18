"use client";

import { ReactElement, useContext } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { FiltersContext } from "../../providers/filter.providers";

const options: string[] = [
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
  const { dispatchFilters } = useContext(FiltersContext);

  const buttonClickHandler = (value: string): void => {
    dispatchFilters({ type: "updated_filter", key: "location", value });
  };

  return (
    <Card>
      <CardContent className="pt-3 pb-1">
        <div className="mb-1.5 font-bold text-sm">استان</div>
        <ul className="overflow-auto max-h-72 space-y-0.5 [scrollbar-width:thin] [scrollbar-color:#888_#f3f4f6]">
          {options.map((x) => (
            <li key={x}>
              <Button
                type="button"
                variant="ghost"
                className="w-full justify-start font-normal h-auto py-1 px-2"
                onClick={() => buttonClickHandler(x)}
              >
                {x}
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
