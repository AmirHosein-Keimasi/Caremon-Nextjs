"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BreadcrumbNav } from "@/components/breadcrumb-nav/breadcrumb-nav";
import { Button } from "@/components/ui/button";
import type { CarsModel } from "@/models/cars.model";
import Loading from "@/app/loading";

export default function MyCarsPage() {
  const [myCars, setMyCars] = useState<CarsModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch("/api/cars?my=1", { credentials: "include" })
      .then((res) => {
        if (res.status === 401) {
          setError("ورود به حساب الزامی است.");
          return res.json().then(() => ({ data: null }));
        }
        return res.json();
      })
      .then((data) => {
        if (data?.data) setMyCars(data.data);
        else setMyCars([]);
      })
      .catch(() => setMyCars([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto max-w-3xl px-4 py-5 lg:max-w-5xl lg:px-8 lg:py-8">
      <BreadcrumbNav
        items={[
          { label: "خانه", href: "/" },
          { label: "پنل کاربری", href: "/dashboard" },
          { label: "خودروهای من" },
        ]}
        className="mb-4 lg:mb-6"
      />
      <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between lg:mb-6">
        <div>
          <h1 className="text-xl font-bold text-foreground m-0 lg:text-2xl">
            خودروهای من
          </h1>
          <p className="text-sm text-muted-foreground mt-1 m-0 lg:mt-2">
            خودروهایی که برای اجاره در مارکت‌پلیس ثبت کرده‌اید.
          </p>
        </div>
        <Button asChild className="min-h-[44px] shrink-0">
          <Link href="/dashboard/cars/add">ثبت خودرو جدید</Link>
        </Button>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-destructive">
          <p className="m-0 text-sm font-medium">{error}</p>
          <Link
            href="/auth/signin"
            className="mt-2 inline-block text-sm underline"
          >
            ورود مجدد
          </Link>
        </div>
      )}

      {loading ? (
        <Loading />
      ) : myCars.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-muted/50 py-12 px-6 text-center text-muted-foreground">
          <p className="text-lg font-medium text-foreground m-0 mb-2">
            هنوز خودرویی ثبت نکرده‌اید
          </p>
          <p className="m-0 mb-4 max-w-md mx-auto text-sm">
            با ثبت خودرو در مارکت‌پلیس، آن را در لیست جستجو قرار می‌دهید و
            دیگران می‌توانند برای اجاره درخواست دهند.
          </p>
          <Button asChild className="min-h-[44px]">
            <Link href="/dashboard/cars/add">ثبت اولین خودرو</Link>
          </Button>
        </div>
      ) : (
        <ul className="grid list-none gap-4 p-0 m-0 sm:grid-cols-2 lg:grid-cols-3">
          {myCars.map((car) => (
            <li key={car.id}>
              <Link
                href={`/cars/${car.id}`}
                className="block rounded-xl border border-border bg-card p-4 shadow-sm transition-all hover:border-primary hover:shadow-md active:scale-[0.99]"
              >
                <span className="mb-2 inline-block rounded-full bg-primary/15 px-2.5 py-0.5 text-xs font-medium text-primary">
                  مالک خصوصی
                </span>
                <p className="font-semibold text-foreground m-0">{car.name}</p>
                <p className="text-sm text-muted-foreground m-0 mt-1">
                  {car.model} · {car.location}
                </p>
                <p className="text-sm font-medium text-primary mt-2 m-0">
                  {(car.rental?.days_3_to_14 ?? 0).toLocaleString("fa-IR")}{" "}
                  تومان/روز
                </p>
                <p className="text-xs text-muted-foreground mt-1 m-0">
                  حداقل {car.rental?.minimum_rental ?? 1} روز
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
