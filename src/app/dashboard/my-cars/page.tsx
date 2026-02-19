"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BreadcrumbNav } from "@/components/breadcrumb-nav/breadcrumb-nav";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { getCarImageUrl } from "@/lib/cars";
import type { CarsModel } from "@/models/cars.model";
import Loading from "@/app/loading";
import { Pencil, Trash2, Car } from "lucide-react";

export default function MyCarsPage() {
  const [myCars, setMyCars] = useState<CarsModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchCars = () => {
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
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      const res = await fetch(`/api/cars/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok && data?.success) {
        setMyCars((prev) => prev.filter((c) => c.id !== id));
      }
    } finally {
      setDeletingId(null);
    }
  };

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
          <h1 className="m-0 text-xl font-bold text-foreground lg:text-2xl">
            خودروهای من
          </h1>
          <p className="m-0 mt-1 text-sm text-muted-foreground lg:mt-2">
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
        <div className="rounded-xl border border-dashed border-border bg-muted/50 px-6 py-12 text-center text-muted-foreground">
          <p className="m-0 mb-2 text-lg font-medium text-foreground">
            هنوز خودرویی ثبت نکرده‌اید
          </p>
          <p className="mx-auto mb-4 max-w-md text-sm">
            با ثبت خودرو در مارکت‌پلیس، آن را در لیست جستجو قرار می‌دهید و
            دیگران می‌توانند برای اجاره درخواست دهند.
          </p>
          <Button asChild className="min-h-[44px]">
            <Link href="/dashboard/cars/add">ثبت اولین خودرو</Link>
          </Button>
        </div>
      ) : (
        <ul className="m-0 grid list-none gap-5 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {myCars.map((car) => (
            <li key={car.id}>
              <article className="flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:border-primary/50 hover:shadow-md">
                <Link
                  href={`/cars/${car.id}`}
                  className="relative block aspect-16/10 w-full overflow-hidden bg-muted"
                >
                  <img
                    src={getCarImageUrl(car.img)}
                    alt={car.name}
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute start-2 top-2 rounded-full bg-primary/90 px-2.5 py-0.5 text-xs font-medium text-primary-foreground">
                    مالک خصوصی
                  </span>
                </Link>
                <div className="flex flex-1 flex-col p-4">
                  <Link
                    href={`/cars/${car.id}`}
                    className="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                  >
                    <h2 className="m-0 font-semibold text-foreground line-clamp-1">
                      {car.name}
                    </h2>
                  </Link>
                  <p className="m-0 mt-1 text-sm text-muted-foreground">
                    {car.model} · {car.location}
                  </p>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="text-sm font-medium text-primary">
                      {(car.rental?.days_3_to_14 ?? 0).toLocaleString("fa-IR")}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      تومان/روز
                    </span>
                  </div>
                  <p className="m-0 mt-0.5 text-xs text-muted-foreground">
                    حداقل {car.rental?.minimum_rental ?? 1} روز اجاره
                  </p>
                  <div className="mt-4 flex items-center gap-2 border-t border-border pt-3">
                    <Button variant="ghost" size="sm" asChild className="flex-1">
                      <Link href={`/cars/${car.id}`}>
                        <Car className="ml-1 h-4 w-4" />
                        مشاهده
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon" asChild title="ویرایش">
                      <Link href={`/dashboard/cars/edit/${car.id}`}>
                        <Pencil className="h-4 w-4" />
                      </Link>
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          title="حذف"
                          className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                          disabled={deletingId === car.id}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>حذف خودرو</AlertDialogTitle>
                          <AlertDialogDescription>
                            آیا از حذف «{car.name}» اطمینان دارید؟ این عمل قابل
                            بازگشت نیست.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>انصراف</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(car.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            حذف
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
