"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BreadcrumbNav } from "@/components/breadcrumb-nav/breadcrumb-nav";
import { Button } from "@/components/ui/button";
import type { CarsModel } from "@/models/cars.model";

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
    <div className="p-6 lg:p-8 max-w-5xl mx-auto">
      <BreadcrumbNav
        items={[
          { label: "خانه", href: "/" },
          { label: "پنل کاربری", href: "/dashboard" },
          { label: "خودروهای من" },
        ]}
        className="mb-6"
      />
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <h1 className="text-2xl font-bold text-foreground m-0">
          خودروهای من (اجاره داده)
        </h1>
        <Button asChild>
          <Link href="/dashboard/cars/add">ثبت خودرو جدید</Link>
        </Button>
      </div>
      <p className="text-muted-foreground mb-6">
        خودروهایی که برای اجاره در مارکت‌پلیس ثبت کرده‌اید. با کلیک روی هر خودرو می‌توانید صفحهٔ آن را ببینید یا لینک مستقیم رزرو را به متقاضیان بدهید.
      </p>

      {error && (
        <div className="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive">
          <p className="m-0 text-sm font-medium">{error}</p>
          <Link href="/auth/signin" className="text-sm underline mt-2 inline-block">ورود مجدد</Link>
        </div>
      )}

      {loading ? (
        <p className="text-center py-12 text-muted-foreground">در حال بارگذاری...</p>
      ) : myCars.length === 0 ? (
        <div className="text-center py-12 px-8 text-muted-foreground rounded-xl bg-muted/50 border border-dashed border-border">
          <p className="text-lg font-medium text-foreground m-0 mb-2">هنوز خودرویی ثبت نکرده‌اید</p>
          <p className="m-0 mb-4 max-w-md mx-auto">
            با ثبت خودرو در مارکت‌پلیس، آن را در لیست جستجو قرار می‌دهید و دیگران می‌توانند برای اجاره درخواست دهند.
          </p>
<Button asChild>
                  <Link href="/dashboard/cars/add">ثبت اولین خودرو</Link>
                </Button>
        </div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 list-none p-0 m-0">
          {myCars.map((car) => (
            <li key={car.id}>
              <Link
                href={`/cars/${car.id}`}
                className="block p-4 bg-muted border border-border rounded-xl hover:border-primary hover:shadow-md transition-all"
              >
                <span className="inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-primary/15 text-primary mb-2">
                  مالک خصوصی
                </span>
                <p className="font-semibold text-foreground m-0">{car.name}</p>
                <p className="text-sm text-muted-foreground m-0 mt-1">{car.model} · {car.location}</p>
                <p className="text-sm text-primary font-medium mt-2 m-0">
                  {(car.rental?.days_3_to_14 ?? 0).toLocaleString("fa-IR")} تومان/روز
                </p>
                <p className="text-xs text-muted-foreground mt-1 m-0">
                  حداقل {(car.rental?.minimum_rental ?? 1)} روز
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
