"use client";
import React, { useState, useRef } from "react";
import { DateObject } from "react-multi-date-picker";

import Link from "next/link";

import StartDatePicker from "../calendar/StartDatePicker-component";
import EndDatePicker from "../calendar/EndDatePicker-component";

import SelectLocationComponent from "../selectLocationComponent/SelectLocation.component";
import SelectHourComponent from "../selectHourComponent/selectHour.component";

import MingcuteCheckboxFill from "@/icons/MingcuteCheckboxFill";

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
      <div className="flex flex-col gap-2 min-w-[10rem] flex-1 me-8">
        <SelectHourComponent />
      </div>

      <EndDatePicker
        ref={endDateRef}
        value={endDate}
        onChange={setEndDate}
        minDate={startDate || today}
        disabled={!startDate}
      />
      <div className="flex flex-col gap-2 min-w-[10rem] flex-1 me-8">
        <SelectHourComponent />
      </div>

      <div className="flex flex-col gap-2 min-w-[10rem] flex-1 me-8">
        <label className="text-[var(--fz-300)] leading-5 font-medium">
          موقعیت
        </label>
        <SelectLocationComponent />
      </div>

      <Link
        className="px-8 py-2 rounded-[var(--border-radius)] text-[var(--color-default-background)] text-center font-bold flex items-center justify-center gap-2 mt-2 transition-[color] duration-[var(--animation-duration-normal)] bg-[var(--color-primary)] text-[var(--color-gray-93)]"
        href={`/search`}
      >
        همین الان رزرو کنید <MingcuteCheckboxFill />
      </Link>
    </div>
  );
};

export default SearchFormComponent;
