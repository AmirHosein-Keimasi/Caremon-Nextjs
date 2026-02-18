"use client";

import Link from "next/link";
import { BreadcrumbNav } from "@/components/breadcrumb-nav/breadcrumb-nav";
import { Alert, AlertDescription } from "@/components/ui/alert";
import useAuth from "@/utils/useAuth";
import { AddCarForm } from "@/components/add-car-form/add-car-form";
import Loading from "@/app/loading";

export default function AddCarPage() {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  if (!isLoggedIn) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Alert>
          <AlertDescription>
            برای ثبت خودرو باید وارد شوید.{" "}
            <Link href="/auth/signin" className="text-primary underline">
              ورود
            </Link>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 rtl">
      <BreadcrumbNav
        items={[
          { label: "خانه", href: "/" },
          { label: "داشبورد", href: "/dashboard" },
          { label: "ثبت خودرو برای اجاره" },
        ]}
        className="mb-6"
      />
      <h1 className="text-2xl font-bold text-foreground mb-2">
        خودروی خود را برای اجاره ثبت کنید
      </h1>
      <p className="text-muted-foreground mb-2">
        در مارکت‌پلیس کارمون شما هم می‌توانید{" "}
        <strong className="text-foreground">
          خودروی خود را برای اجاره قرار دهید
        </strong>{" "}
        و هم از خودروهای دیگران{" "}
        <strong className="text-foreground">اجاره بگیرید</strong>.
      </p>
      <p className="text-sm text-muted-foreground mb-6">
        فیلدهای دارای ستاره (*) الزامی هستند. پس از ثبت، خودرو در «خودروهای من»
        در پنل کاربری قابل مشاهده است.
      </p>

      <AddCarForm
        successRedirect="/dashboard/my-cars"
        cancelHref="/dashboard"
        cancelLabel="انصراف و بازگشت به داشبورد"
      />
    </div>
  );
}
