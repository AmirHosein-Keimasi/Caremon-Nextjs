"use client";
import React, { useState, useRef } from "react";
import { DateObject } from "react-multi-date-picker";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import StartDatePicker from "../calendar/StartDatePicker-component";
import EndDatePicker from "../calendar/EndDatePicker-component";
import SelectLocationComponent from "../selectLocationComponent/SelectLocation.component";
import SelectHourComponent from "../selectHourComponent/selectHour.component";

import { Check } from "lucide-react";

const SearchFormComponent = () => {
  const [startDate, setStartDate] = useState<DateObject | null>(null);
  const [endDate, setEndDate] = useState<DateObject | null>(null);
  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);

  const today = new DateObject();

  const handleStartDateChange = (date: DateObject | null) => {
    setStartDate(date);

    if (date && endDate) {
      const startTime = new Date(date.format()).getTime();
      const endTime = new Date(endDate.format()).getTime();

      if (startTime > endTime) {
        setEndDate(null);
      }
    }
  };

  return (
    <div className="flex gap-2 items-end justify-between py-4 max-md:flex-col max-md:items-stretch">
      <StartDatePicker
        ref={startDateRef}
        value={startDate}
        onChange={handleStartDateChange}
        minDate={today}
      />
      <div className="flex flex-col gap-2 min-w-40 flex-1 me-8">
        <SelectHourComponent />
      </div>

      <EndDatePicker
        ref={endDateRef}
        value={endDate}
        onChange={setEndDate}
        minDate={startDate || today}
        disabled={!startDate}
      />
      <div className="flex flex-col gap-2 min-w-40 flex-1 me-8">
        <SelectHourComponent />
      </div>

      <div className="flex flex-col gap-2 min-w-40] flex-1 me-8">
        <Label className="text-sm">موقعیت</Label>
        <SelectLocationComponent />
      </div>

      <Button asChild className="mt-2">
        <Link href="/search" className="gap-2">
          همین الان رزرو کنید <Check />
        </Link>
      </Button>
    </div>
  );
};

export default SearchFormComponent;
