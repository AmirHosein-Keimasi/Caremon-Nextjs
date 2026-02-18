import { ReactElement } from "react";
import type { Metadata } from "next";
import { getCars } from "@/lib/cars";
import MapViewClient from "./components/MapViewClient";
import { SITE_URL, defaultOpenGraph } from "@/lib/site";

/** ISR: هر ۶۰ ثانیه کش نقشه و لیست خودروها به‌روز می‌شود */
export const revalidate = 60;

const title = "نقشه خودروها";
const description =
  "مشاهده موقعیت خودروهای اجاره‌ای روی نقشه. انتخاب محل تحویل و مقایسه گزینه‌ها در کارِمون.";

export const metadata: Metadata = {
  title,
  description,
  keywords: ["نقشه اجاره خودرو", "موقعیت خودرو", "تحویل خودرو"],
  openGraph: {
    ...defaultOpenGraph,
    title: `${title} | کارِمون`,
    description,
    url: `${SITE_URL}/map`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | کارِمون`,
    description,
  },
  alternates: {
    canonical: `${SITE_URL}/map`,
  },
};

export default async function MapPage(): Promise<ReactElement> {
  const cars = await getCars();
  return <MapViewClient cars={cars} />;
}
