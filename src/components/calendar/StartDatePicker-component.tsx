"use client";
import React, { forwardRef } from "react";

import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";

import persian_fa from "react-date-object/locales/persian_fa";

import InputField from "@/app/auth/components/normal-input/normal-input.component";

interface StartDatePickerProps {
  value: DateObject | null;
  onChange: (date: DateObject | null) => void;
  minDate?: DateObject;
}

const StartDatePicker = forwardRef<HTMLInputElement, StartDatePickerProps>(
  ({ value, onChange, minDate }, ref) => {
    return (
      <DatePicker
        value={value}
        onChange={onChange}
        calendar={persian}
        locale={persian_fa}
        calendarPosition="bottom-right"
        minDate={minDate}
        render={(value, openCalendar) => (
          <InputField
            ref={ref}
            type="text"
            label="تاریخ و ساعت تحویل"
            placeholder="تاریخ شروع را انتخاب کنید"
            value={value}
            onClick={openCalendar}
            readOnly
          />
        )}
      />
    );
  },
);

StartDatePicker.displayName = "StartDatePicker";
export default StartDatePicker;
