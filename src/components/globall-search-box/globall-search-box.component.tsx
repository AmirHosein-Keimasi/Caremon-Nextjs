"use client";

import { ReactElement, useState } from "react";
import { useRouter } from "next/navigation";

import MingcuteLocationLine from "@/icons/MingcuteLocationLine";
import MingcuteSearchLine from "@/icons/MingcuteSearchLine";

import styles from "./globall-search-box.module.css";

type Props = {
  initialQuery?: string;
};

export default function GlobalSearchBoxComponent({
  initialQuery = "",
}: Props): ReactElement {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery ?? "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("query", query.trim());
    router.push(`/search${params.toString() ? `?${params.toString()}` : ""}`);
  };

  return (
    <form
      className={styles["global-search-box"]}
      onSubmit={handleSubmit}
      role="search"
    >
      <div className={styles.prefix}>
        <MingcuteSearchLine />
      </div>
      <input
        type="search"
        placeholder="نوع خودرو ، محل تحویل ، استان و شهرستان و ..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="جستجوی خودرو"
      />
      <div className={styles.divider}></div>
      <div className={styles.suffix}>
        <button type="submit" aria-label="جستجو">
          <MingcuteLocationLine />
          جستجو
        </button>
      </div>
    </form>
  );
}
