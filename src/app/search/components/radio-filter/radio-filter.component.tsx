"use client";

import { ReactElement } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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
  options,
  value,
  onChange,
}: Props): ReactElement {
  return (
    <Card>
      <CardContent className="pt-3 pb-1">
        <Label className="mb-1.5 block font-bold text-sm">{title}</Label>
        <RadioGroup
          value={value ?? ""}
          onValueChange={onChange}
          className="flex flex-col gap-1"
        >
          {options.map((x) => (
            <div
              key={x.value}
              className="flex items-center gap-2 py-1 px-2 hover:bg-accent hover:rounded-md cursor-pointer"
            >
              <RadioGroupItem value={x.value} id={`${x.value}-${x.label}`} />
              <Label
                htmlFor={`${x.value}-${x.label}`}
                className="cursor-pointer font-normal"
              >
                {x.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
}
