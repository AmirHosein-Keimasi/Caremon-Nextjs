"use client";
import React, { forwardRef } from "react";

import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";

import persian_fa from "react-date-object/locales/persian_fa";

import InputField from "@/app/auth/components/normal-input/normal-input.component";

interface EndDatePickerProps {
  value: DateObject | null;
  onChange: (date: DateObject | null) => void;
  minDate?: DateObject;
  disabled?: boolean;
}

const EndDatePicker = forwardRef<HTMLInputElement, EndDatePickerProps>(
  ({ value, onChange, minDate, disabled }, ref) => {
    return (
      <DatePicker
        value={value}
        onChange={onChange}
        calendar={persian}
        locale={persian_fa}
        calendarPosition="bottom-right"
        minDate={minDate}
        disabled={disabled}
        render={(value, openCalendar) => (
          <InputField
            ref={ref}
            type="text"
            label="تاریخ و ساعت بازگشت"
            placeholder="تاریخ پایان را انتخاب کنید "
            value={value}
            onClick={openCalendar}
            readOnly
            disabled={disabled}
          />
        )}
      />
    );
  },
);

EndDatePicker.displayName = "EndDatePicker";
export default EndDatePicker;
