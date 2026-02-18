"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BreadcrumbNav } from "@/components/breadcrumb-nav/breadcrumb-nav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useAuth from "@/utils/useAuth";
import { addCarSchema, type AddCarInput } from "@/lib/schemas";

const defaultValues: AddCarInput = {
  name: "",
  model: "",
  location: "",
  img: "default-car.png",
  withDriver: "بدون راننده",
  transmission: "دستی",
  days_3_to_14: 0,
  deposit: 0,
  minimum_rental: 1,
  passengers: 5,
  luggage: 2,
  door: 4,
};

export default function AddCarPage() {
  const router = useRouter();
  const { isLoggedIn, isLoading } = useAuth();
  const [error, setError] = useState("");

  const form = useForm<AddCarInput>({
    resolver: zodResolver(addCarSchema),
    defaultValues,
  });

  const isSubmitting = form.formState.isSubmitting;

  const onSubmit = async (values: AddCarInput) => {
    setError("");
    try {
      const res = await fetch("/api/cars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name: values.name,
          model: values.model,
          location: values.location,
          img: values.img || "default-car.png",
          withDriver: values.withDriver,
          rental: {
            days_3_to_14: values.days_3_to_14,
            more_than_14_days: Math.round((values.days_3_to_14 || 0) * 0.9),
            minimum_rental: values.minimum_rental,
            deposit: values.deposit,
          },
          capacity: {
            passengers: values.passengers,
            luggage: values.luggage,
            door: values.door,
          },
          features: { transmission: values.transmission },
          engine: {},
          driverRental: {},
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        const msg =
          res.status === 401
            ? "ورود به حساب الزامی است. اگر قبلاً وارد شده‌اید، یک بار از حساب خارج شوید و دوباره وارد شوید، سپس این صفحه را دوباره امتحان کنید."
            : (data.error || "خطا در ثبت خودرو");
        setError(msg);
        return;
      }
      router.push("/dashboard?tab=my-cars");
      router.refresh();
    } catch {
      setError("خطا در ارتباط با سرور");
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 text-center text-muted-foreground">
        در حال بارگذاری...
      </div>
    );
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
        <strong className="text-foreground">خودروی خود را برای اجاره قرار دهید</strong> و هم از خودروهای دیگران{" "}
        <strong className="text-foreground">اجاره بگیرید</strong>. با پر کردن فرم زیر، خودروی شما در لیست جستجو نمایش داده می‌شود و متقاضیان می‌توانند با شما هماهنگ شوند.
      </p>
      <p className="text-sm text-muted-foreground mb-6">
        فیلدهای دارای ستاره (*) الزامی هستند. پس از ثبت، خودرو در تب «خودروهای من» در داشبورد قابل مشاهده است.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>نام خودرو *</FormLabel>
                  <FormControl>
                    <Input placeholder="مثال: پژو ۲۰۶" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="model"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>مدل (سال) *</FormLabel>
                  <FormControl>
                    <Input placeholder="مثال: ۱۴۰۱" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>شهر / محل تحویل *</FormLabel>
                <FormControl>
                  <Input placeholder="مثال: تهران" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="img"
            render={({ field }) => (
              <FormItem>
                <FormLabel>آدرس تصویر (اختیاری)</FormLabel>
                <FormControl>
                  <Input placeholder="مثال: peugeot206.png" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="withDriver"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>نوع تحویل</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="بدون راننده">بدون راننده</SelectItem>
                      <SelectItem value="با راننده">با راننده</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="transmission"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>نوع دنده</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="دستی">دستی</SelectItem>
                      <SelectItem value="اتوماتیک">اتوماتیک</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold text-foreground mb-3">قیمت و ظرفیت</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="days_3_to_14"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>قیمت روزانه (تومان)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        placeholder="مثال: 1500000"
                        {...field}
                        onChange={(e) => field.onChange(e.target.valueAsNumber || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="deposit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ودیعه (تومان)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        placeholder="مثال: 20000000"
                        {...field}
                        onChange={(e) => field.onChange(e.target.valueAsNumber || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="minimum_rental"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>حداقل روز اجاره</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        {...field}
                        onChange={(e) => field.onChange(e.target.valueAsNumber || 1)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="passengers"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>تعداد سرنشین</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        {...field}
                        onChange={(e) => field.onChange(e.target.valueAsNumber || 1)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="luggage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>تعداد چمدان</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        {...field}
                        onChange={(e) => field.onChange(e.target.valueAsNumber || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="door"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>تعداد درب</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={2}
                        {...field}
                        onChange={(e) => field.onChange(e.target.valueAsNumber || 2)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3 border-t pt-6">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "در حال ثبت..." : "ثبت خودرو در مارکت‌پلیس"}
            </Button>
            <Button type="button" variant="outline" asChild>
              <Link href="/dashboard">انصراف و بازگشت به داشبورد</Link>
            </Button>
            <Button type="button" variant="ghost" asChild>
              <Link href="/search" className="text-muted-foreground">
                مشاهده لیست خودروها
              </Link>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
