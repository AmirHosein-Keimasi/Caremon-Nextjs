"use client";

import { ChangeEvent, ReactElement } from "react";

import CardComponent from "@/components/card-component/card-component";

import { SelectOptionType } from "@/types/select-option.type";

type Props = {
  title: string;
  name: string;
  options: SelectOptionType[];
  value?: string;
  onChange?: (value: string) => void;
};

export default function RadioFilterComponent({
  title,
  name,
  options,
  value,
  onChange,
}: Props): ReactElement {
  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    onChange?.(e.currentTarget.value);
  };

  return (
    <CardComponent>
      <div>
        <div className="mb-2 font-black">{title}</div>
        {options.map((x) => (
          <label
            key={x.value}
            className="flex gap-2 py-1 px-2 hover:bg-[var(--color-surface-400)] hover:rounded-[var(--border-radius)]"
          >
            <input
              type="radio"
              name={name}
              value={x.value}
              checked={x.value === value}
              onChange={inputChangeHandler}
            />
            {x.label}
          </label>
        ))}
      </div>
    </CardComponent>
  );
}
