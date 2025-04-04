"use client";

import { ReactElement, useContext, useMemo } from "react";

import CardComponent from "@/components/card-component/card-component";

import { FiltersContext } from "../../providers/filter.providers";

import { FiltersType } from "@/types/filter.type";

import styles from "./filters-summary.module.css";

export default function FiltersSummaryComponent(): ReactElement | null {
  const { filters, dispatchFilters } = useContext(FiltersContext);

  const isEmpty = useMemo(() => {
    return (
      !filters.query &&
      !filters.model &&
      !filters.transmission &&
      !filters.location &&
      !filters.with_driver
    );
  }, [filters]);

  const removeAllButtonClickHandler = (): void => {
    dispatchFilters({ type: "removed_all" });
  };

  const filterClickHandler = (key: keyof FiltersType): void => {
    dispatchFilters({ type: "removed_filter", key });
  };

  if (isEmpty) {
    return null;
  }

  return (
    <CardComponent>
      <div className={styles["filters-summary"]}>
        <div className={styles.title}>فیلترهای انتخاب‌شده</div>

        <button type="button" onClick={removeAllButtonClickHandler}>
          حذف همه
        </button>

        <ul className={styles.filters}>
          {filters.query && (
            <li onClick={() => filterClickHandler("query")}>{filters.query}</li>
          )}
          {filters.model && (
            <li onClick={() => filterClickHandler("model")}>{filters.model}</li>
          )}
          {filters.transmission && (
            <li onClick={() => filterClickHandler("transmission")}>
              {filters.transmission}
            </li>
          )}
          {filters.location && (
            <li onClick={() => filterClickHandler("location")}>
              {filters.location}
            </li>
          )}
          {filters.with_driver && (
            <li onClick={() => filterClickHandler("with_driver")}>
              {filters.with_driver}
            </li>
          )}
        </ul>
      </div>
    </CardComponent>
  );
}
