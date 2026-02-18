"use client";

import { ReactElement, useState } from "react";
import { UserRound, CalendarRange, Send, CheckCircle2 } from "lucide-react";
import Spinner from "@/components/Spinner/Spinner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { reserveFormSchema, type ReserveFormInput } from "@/lib/schemas";

type Props = {
  carId: string;
  carName: string;
  carImage?: string;
};

export default function ReserveForm({ carId, carName }: Props): ReactElement {
  const [isSuccess, setIsSuccess] = useState(false);
  const form = useForm<ReserveFormInput>({
    resolver: zodResolver(reserveFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      startDate: "",
      endDate: "",
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  const onSubmit = async (values: ReserveFormInput) => {
    try {
      const res = await fetch("/api/reserve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          carId,
          carName,
          name: values.name,
          phone: values.phone,
          email: values.email,
          startDate: values.startDate,
          endDate: values.endDate,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        form.setError("root", {
          message:
            (data?.error as string) ||
            "خطا در ثبت رزرو، لطفاً بعداً دوباره تلاش کنید.",
        });
        return;
      }
      setIsSuccess(true);
    } catch {
      form.setError("root", {
        message: "خطا در ارتباط با سرور، لطفاً بعداً دوباره تلاش کنید.",
      });
    }
  };

  if (isSuccess) {
    return (
      <div className="rounded-2xl border-2 border-primary/20 bg-card shadow-xl overflow-hidden">
        <div className="bg-gradient-to-br from-primary/15 to-primary/5 px-6 py-8 sm:p-8 text-center">
          <div className="inline-flex items-center justify-center size-16 rounded-full bg-primary/20 text-primary mb-4">
            <CheckCircle2 className="size-9" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-foreground m-0">
            درخواست رزرو ثبت شد
          </h2>
          <p className="text-muted-foreground mt-2 mb-0 max-w-sm mx-auto">
            کارشناسان ما به‌زودی با شما تماس خواهند گرفت.
          </p>
        </div>
        <div className="p-6 border-t border-border/50">
          <a
            href={`/cars/${carId}`}
            className="block w-full py-3 text-center rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
          >
            بازگشت به صفحه خودرو
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border-2 border-border/60 bg-card shadow-xl overflow-hidden">
      <div className="bg-gradient-to-br from-primary/10 to-primary/5 px-6 py-5 border-b border-border/50">
        <h2 className="text-lg sm:text-xl font-bold text-foreground m-0">
          تکمیل رزرو
        </h2>
        <p className="text-sm text-muted-foreground mt-1 m-0">{carName}</p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="p-6 sm:p-7 flex flex-col gap-6"
        >
          {form.formState.errors.root?.message && (
            <Alert variant="destructive" className="rounded-xl">
              <AlertDescription>
                {form.formState.errors.root.message}
              </AlertDescription>
            </Alert>
          )}

          <section className="space-y-4" aria-labelledby="contact-heading">
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center size-8 rounded-lg bg-primary/15 text-primary">
                <UserRound className="size-4" />
              </span>
              <h3
                id="contact-heading"
                className="font-semibold text-foreground m-0"
              >
                اطلاعات تماس
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="sm:col-span-2">
                    <FormLabel>نام و نام خانوادگی</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="نام کامل"
                        className="rounded-xl h-11"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>شماره تماس</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                        className="rounded-xl h-11"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ایمیل</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="example@mail.com"
                        className="rounded-xl h-11"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </section>

          <section className="space-y-4" aria-labelledby="dates-heading">
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center size-8 rounded-lg bg-primary/15 text-primary">
                <CalendarRange className="size-4" />
              </span>
              <h3
                id="dates-heading"
                className="font-semibold text-foreground m-0"
              >
                تاریخ سفر
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>تحویل خودرو</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        className="rounded-xl h-11"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>بازگرداندن</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        className="rounded-xl h-11"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </section>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 rounded-xl text-base font-semibold gap-2"
          >
            {isSubmitting ? (
              <>
                <Spinner size={20} className="shrink-0" />
                در حال ثبت درخواست...
              </>
            ) : (
              <>
                <Send className="size-5" />
                ثبت درخواست رزرو
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
