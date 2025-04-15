"use client";
import React, { useState, useRef } from "react";
import { DateObject } from "react-multi-date-picker";

import Link from "next/link";

import StartDatePicker from "../calendar/StartDatePicker-component";
import EndDatePicker from "../calendar/EndDatePicker-component";

import SelectLocationComponent from "../selectLocationComponent/SelectLocation.component";
import SelectHourComponent from "../selectHourComponent/selectHour.component";

import MingcuteCheckboxFill from "@/icons/MingcuteCheckboxFill";

import styles from "./search-form.module.css";

const SearchFormComponent = () => {
  const [startDate, setStartDate] = useState<DateObject | null>(null);
  const [endDate, setEndDate] = useState<DateObject | null>(null);
  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);

  const today = new DateObject().setCalendar("persian").setLocale("fa");

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
    <div className={styles.container}>
      <StartDatePicker
        ref={startDateRef}
        value={startDate}
        onChange={handleStartDateChange}
        minDate={today}
      />
      <div className={styles.inputGroup}>
        <SelectHourComponent />
      </div>

      <EndDatePicker
        ref={endDateRef}
        value={endDate}
        onChange={setEndDate}
        minDate={startDate || today}
        disabled={!startDate}
      />
      <div className={styles.inputGroup}>
        <SelectHourComponent />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>موقعیت</label>
        <SelectLocationComponent />
      </div>

      <Link className={styles.detailsLink} href={`/search`}>
        همین الان رزرو کنید <MingcuteCheckboxFill />
      </Link>
    </div>
  );
};

export default SearchFormComponent;
