"use client";

import { BreadcrumbNav } from "@/components/breadcrumb-nav/breadcrumb-nav";
import { AddCarForm } from "@/components/add-car-form/add-car-form";

export default function DashboardAddCarPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-5 rtl lg:px-8 lg:py-8">
      <BreadcrumbNav
        items={[
          { label: "خانه", href: "/" },
          { label: "پنل کاربری", href: "/dashboard" },
          { label: "ثبت خودرو برای اجاره" },
        ]}
        className="mb-4 lg:mb-6"
      />
      <h1 className="text-xl font-bold text-foreground mb-1.5 lg:text-2xl lg:mb-2">
        خودروی خود را برای اجاره ثبت کنید
      </h1>
      <p className="text-sm text-muted-foreground mb-2">
        در مارکت‌پلیس کارمون شما هم می‌توانید{" "}
        <strong className="text-foreground">خودروی خود را برای اجاره قرار دهید</strong>{" "}
        و هم از خودروهای دیگران{" "}
        <strong className="text-foreground">اجاره بگیرید</strong>.
      </p>
      <p className="text-sm text-muted-foreground mb-6">
        فیلدهای دارای ستاره (*) الزامی هستند. پس از ثبت، خودرو در «خودروهای من»
        قابل مشاهده است.
      </p>

      <AddCarForm
        successRedirect="/dashboard/my-cars"
        cancelHref="/dashboard"
        cancelLabel="انصراف و بازگشت به پنل"
      />
    </div>
  );
}
