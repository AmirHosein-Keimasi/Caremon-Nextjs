import { ReactElement } from "react";

import CarmonLogo from "@/logo/CarmonLogo";

import SearchFormComponent from "@/components/searchFormComponent/search-form.component";

import StatsComponents from "@/components/stats/stats.component";

import styles from "./page.module.css";

export default function Home(): ReactElement {
  return (
    <div className={styles.home}>
      <h1>
        <CarmonLogo />
        کا‌‌‌‌رِمون{" "}
      </h1>
      <SearchFormComponent />

      <StatsComponents />
    </div>
  );
}
