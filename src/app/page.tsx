import { ReactElement } from "react";

import CarmonLogo from "@/logo/CarmonLogo";

import StatsComponents from "@/components/stats/stats.component";
import SearchFormComponent from "@/components/searchFormComponent/search-form.component";

import styles from "./page.module.css";
import HomeSearchBox from "./HomeSearchBox";

export default function Home(): ReactElement {
  return (
    <div className={styles.home}>
      <h1>
        <CarmonLogo />
        کا‌‌‌‌رِمون{" "}
      </h1>
      <HomeSearchBox />
      <SearchFormComponent />
      <StatsComponents />
    </div>
  );
}
