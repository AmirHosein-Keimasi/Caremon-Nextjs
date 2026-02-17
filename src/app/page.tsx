import { ReactElement } from "react";

import CarmonLogo from "@/logo/CarmonLogo";

import StatsComponents from "@/components/stats/stats.component";
import SearchFormComponent from "@/components/searchFormComponent/search-form.component";

import HomeSearchBox from "./HomeSearchBox";

export default function Home(): ReactElement {
  return (
    <div className="grid justify-items-center content-center gap-8 min-h-full">
      <h1 className="inline-flex items-center text-2xl">
        <CarmonLogo />
        کا‌‌‌‌رِمون{" "}
      </h1>
      <HomeSearchBox />
      <SearchFormComponent />
      <StatsComponents />
    </div>
  );
}
