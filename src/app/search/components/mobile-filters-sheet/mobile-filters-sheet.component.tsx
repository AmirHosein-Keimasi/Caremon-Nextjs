"use client";

import { ReactElement, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import SavedFiltersComponent from "../saved-filters/saved-filters.component";
import LocationFilterComponent from "../location-filter/location-filter.component";
import ModelFilterComponent from "../model-filter/model-filter.component";
import TransmissionFilterComponent from "../transmission-filter/transmission-filter.component";
import ChassisTypeFilterComponent from "../chassis-type-filter/chassis-type-filter.component";
import PriceRangeFilterComponent from "../price-range-filter/price-range-filter.component";
import WithDriverFilterComponent from "../withdriver-filter/withdriver-filter.component";

import { SlidersHorizontal } from "lucide-react";

export default function MobileFiltersSheetComponent(): ReactElement {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            type="button"
            variant="outline"
            className="w-full gap-2"
          >
            <SlidersHorizontal className="size-4" />
            فیلترها
          </Button>
        </SheetTrigger>
        <SheetContent
          side="bottom"
          className="h-[75vh] max-h-[75vh] rounded-t-2xl p-0 flex flex-col"
        >
          <SheetHeader className="border-b px-4 py-3 text-left shrink-0">
            <SheetTitle className="text-lg font-bold">فیلترها</SheetTitle>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto px-4 py-3 grid gap-3">
            <SavedFiltersComponent />
            <LocationFilterComponent />
            <ModelFilterComponent />
            <TransmissionFilterComponent />
            <ChassisTypeFilterComponent />
            <PriceRangeFilterComponent />
            <WithDriverFilterComponent />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
