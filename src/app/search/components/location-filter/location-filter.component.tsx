"use client";

import { ReactElement, useContext } from "react";

import CardComponent from "@/components/card-component/card-component";

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
    <CardComponent>
      <div className="mb-2 font-black text-[var(--fz-500)]">استان</div>
      <ul className="overflow-auto max-h-[18rem] [scrollbar-width:thin] [scrollbar-color:#888_var(--color-surface-300)] [&>li>button]:bg-transparent [&>li>button]:w-full [&>li>button]:border-none [&>li>button]:py-1 [&>li>button]:px-2 [&>li>button]:text-start [&>li>button]:cursor-pointer [&>li>button]:text-inherit [&>li>button:hover]:bg-[var(--color-surface-400)] [&>li>button:hover]:rounded-[var(--border-radius)]">
        {options.map((x) => (
          <li key={x}>
            <button type="button" onClick={() => buttonClickHandler(x)}>
              {x}
            </button>
          </li>
        ))}
      </ul>
    </CardComponent>
  );
}
