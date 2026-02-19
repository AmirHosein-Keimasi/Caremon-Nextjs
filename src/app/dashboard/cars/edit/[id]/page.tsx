"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { BreadcrumbNav } from "@/components/breadcrumb-nav/breadcrumb-nav";
import { AddCarForm } from "@/components/add-car-form/add-car-form";
import type { CarsModel } from "@/models/cars.model";
import { carToAddCarInput } from "@/lib/car-form-mapper";
import Loading from "@/app/loading";

export default function DashboardEditCarPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [car, setCar] = useState<CarsModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    fetch(`/api/cars/${id}`, { credentials: "include" })
      .then(async (res) => {
        const data = await res.json();
        if (res.status === 401) setError("ورود به حساب الزامی است.");
        else if (res.status === 403 || res.status === 404)
          setError(data?.error ?? "خودرو یافت نشد یا اجازهٔ ویرایش ندارید.");
        else if (data?.success && data?.data) {
          setCar(data.data);
          setError(null);
        } else setError(data?.error ?? "خودرو یافت نشد.");
      })
      .catch(() => setError("خطا در بارگذاری خودرو."))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loading />;
  if (error || !car) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-5 lg:px-8 lg:py-8">
        <BreadcrumbNav
          items={[
            { label: "خانه", href: "/" },
            { label: "پنل کاربری", href: "/dashboard" },
            { label: "خودروهای من", href: "/dashboard/my-cars" },
            { label: "ویرایش خودرو" },
          ]}
          className="mb-4 lg:mb-6"
        />
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-destructive">
          <p className="m-0">{error ?? "خودرو یافت نشد."}</p>
          <button
            type="button"
            className="mt-2 text-sm underline"
            onClick={() => router.push("/dashboard/my-cars")}
          >
            بازگشت به خودروهای من
          </button>
        </div>
      </div>
    );
  }

  const initialData = carToAddCarInput(car);

  return (
    <div className="mx-auto max-w-2xl px-4 py-5 rtl lg:px-8 lg:py-8">
      <BreadcrumbNav
        items={[
          { label: "خانه", href: "/" },
          { label: "پنل کاربری", href: "/dashboard" },
          { label: "خودروهای من", href: "/dashboard/my-cars" },
          { label: "ویرایش خودرو" },
        ]}
        className="mb-4 lg:mb-6"
      />
      <h1 className="mb-1.5 text-xl font-bold text-foreground lg:mb-2 lg:text-2xl">
        ویرایش خودرو
      </h1>
      <p className="mb-6 text-sm text-muted-foreground">
        تغییرات را اعمال کنید و «ذخیره تغییرات» را بزنید.
      </p>

      <AddCarForm
        carId={id}
        initialData={initialData}
        successRedirect="/dashboard/my-cars"
        cancelHref="/dashboard/my-cars"
        cancelLabel="انصراف و بازگشت به خودروهای من"
      />
    </div>
  );
}
