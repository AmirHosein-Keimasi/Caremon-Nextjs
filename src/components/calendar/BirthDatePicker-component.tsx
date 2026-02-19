"use client";

import React, { forwardRef } from "react";

import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

import InputField from "@/app/auth/components/normal-input/normal-input.component";
import { toPersianDigits } from "@/lib/utils";

interface BirthDatePickerProps {
  value: string;
  onChange: (value: string) => void;
  maxDate?: DateObject;
  placeholder?: string;
  id?: string;
  label?: string;
  disabled?: boolean;
}

const BirthDatePicker = forwardRef<HTMLInputElement, BirthDatePickerProps>(
  (
    {
      value,
      onChange,
      maxDate,
      placeholder = "تاریخ تولد را انتخاب کنید",
      id = "birthDate",
      label = "تاریخ تولد",
      disabled = false,
    },
    ref,
  ) => {
    const dateValue = value
      ? new DateObject(new Date(value))
      : null;

    const handleChange = (date: DateObject | null) => {
      if (!date) {
        onChange("");
        return;
      }
      const d = date.toDate();
      const iso = d.toISOString().slice(0, 10);
      onChange(iso);
    };

    return (
      <DatePicker
        value={dateValue}
        onChange={handleChange}
        calendar={persian}
        locale={persian_fa}
        calendarPosition="bottom-right"
        maxDate={maxDate ?? new DateObject()}
        disabled={disabled}
        format="YYYY/MM/DD"
        containerClassName="w-full rtl"
        className="rmdp-rtl calendar-rtl text-foreground bg-card border border-border rounded-xl shadow-lg"
        render={(value, openCalendar) => (
          <InputField
            ref={ref}
            id={id}
            type="text"
            label={label}
            placeholder={placeholder}
            value={value ? toPersianDigits(value) : ""}
            onClick={openCalendar}
            readOnly
            disabled={disabled}
          />
        )}
      />
    );
  },
);

BirthDatePicker.displayName = "BirthDatePicker";
export default BirthDatePicker;
