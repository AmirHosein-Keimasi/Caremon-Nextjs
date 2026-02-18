"use client";

import { ReactElement, useContext, ChangeEvent } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { FiltersContext } from "../../providers/filter.providers";

const PRICE_STEP = 100_000;
const MIN_PRICE = 0;
const MAX_PRICE = 50_000_000;

export default function PriceRangeFilterComponent(): ReactElement {
  const { filters, dispatchFilters } = useContext(FiltersContext);

  const handleMinChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === "") {
      dispatchFilters({ type: "removed_filter", key: "price_min" });
      return;
    }
    const num = parseInt(val, 10);
    if (!Number.isNaN(num)) {
      dispatchFilters({
        type: "updated_filter",
        key: "price_min",
        value: String(num),
      });
    }
  };

  const handleMaxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === "") {
      dispatchFilters({ type: "removed_filter", key: "price_max" });
      return;
    }
    const num = parseInt(val, 10);
    if (!Number.isNaN(num)) {
      dispatchFilters({
        type: "updated_filter",
        key: "price_max",
        value: String(num),
      });
    }
  };

  return (
    <Card>
      <CardContent className="pt-3 pb-1">
        <Label className="mb-1.5 block text-sm font-bold">
          محدوده قیمت (روزانه)
        </Label>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label className="text-xs text-muted-foreground">
              حداقل (تومان)
            </Label>
            <Input
              type="number"
              min={MIN_PRICE}
              max={MAX_PRICE}
              step={PRICE_STEP}
              placeholder="۰"
              value={filters.price_min ?? ""}
              onChange={handleMinChange}
              className="mt-1"
            />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">
              حداکثر (تومان)
            </Label>
            <Input
              type="number"
              min={MIN_PRICE}
              max={MAX_PRICE}
              step={PRICE_STEP}
              placeholder="بدون محدودیت"
              value={filters.price_max ?? ""}
              onChange={handleMaxChange}
              className="mt-1"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
