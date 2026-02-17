import { ReactElement } from "react";
import type { Metadata } from "next";

import CarmonLogo from "@/logo/CarmonLogo";
import StatsComponents from "@/components/stats/stats.component";
import SearchFormComponent from "@/components/searchFormComponent/search-form.component";
import { SITE_URL, DEFAULT_DESCRIPTION, defaultOpenGraph } from "@/lib/site";

import HomeSearchBox from "./HomeSearchBox";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "خانه",
  description: DEFAULT_DESCRIPTION,
  openGraph: {
    ...defaultOpenGraph,
    title: "کارِمون | اجاره خودرو و رزرو آنلاین",
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "کارِمون | اجاره خودرو و رزرو آنلاین",
    description: DEFAULT_DESCRIPTION,
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function Home(): ReactElement {
  return (
    <div className="grid justify-items-center content-center min-h-full">
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
