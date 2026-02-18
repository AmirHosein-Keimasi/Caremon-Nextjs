"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import InputField from "../components/normal-input/normal-input.component";
import { forgotPasswordSchema, type ForgotPasswordInput } from "@/lib/schemas";

export default function ForgotPasswordPage() {
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const form = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = (values: ForgotPasswordInput) => {
    setStatus("submitting");
    // فعلاً بدون بک‌اند فقط یک پیام نمایشی
    setTimeout(() => setStatus("success"), 500);
  };

  if (status === "success") {
    return (
      <div className="w-full min-w-0 max-w-full px-4 py-6 lg:max-w-7xl flex justify-between lg:px-6 lg:py-8 lg:mx-auto">
        <div className="w-full max-w-[28rem]">
          <div className="mt-20 flex flex-col gap-3">
            <Alert className="bg-success text-success-foreground border-0">
              <AlertDescription>
                اگر حساب فعالی با این ایمیل وجود داشته باشد، لینک بازیابی برای
                شما ارسال خواهد شد. این بخش فعلاً به بک‌اند متصل نیست و در
                نسخه‌های بعدی تکمیل می‌شود.
              </AlertDescription>
            </Alert>
            <Button variant="outline" asChild>
              <Link href="/auth/signin">بازگشت به ورود</Link>
            </Button>
          </div>
        </div>
        <div className="hidden lg:block lg:w-1/2 lg:max-w-[600px]">
          <Image
            src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
            className="w-full h-auto object-contain"
            width={500}
            height={400}
            alt="بازیابی رمز عبور"
            priority
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-w-0 max-w-full px-4 py-6 lg:max-w-7xl flex justify-between lg:px-6 lg:py-8 lg:mx-auto">
      <div className="w-full max-w-[28rem]">
        <Form {...form}>
          <form
            className="flex mt-20 flex-col gap-3"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <h2 className="text-xl font-semibold mb-2 text-foreground">
              بازیابی رمز عبور
            </h2>
            <p className="text-sm text-foreground mb-4 leading-relaxed">
              ایمیل خود را وارد کنید تا لینک بازیابی رمز عبور برایتان ارسال شود.
            </p>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ایمیل</FormLabel>
                  <FormControl>
                    <InputField
                      type="email"
                      id="email"
                      placeholder="example@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={status === "submitting"}
            >
              {status === "submitting"
                ? "در حال ارسال..."
                : "ارسال لینک بازیابی"}
            </Button>

            <p className="text-right text-foreground text-sm">
              رمز عبور را به یاد آوردید؟{" "}
              <Link
                href="/auth/signin"
                className="text-primary font-medium text-sm transition-colors duration-300 ease-in-out hover:underline hover:text-primary-400"
              >
                ورود
              </Link>
            </p>
          </form>
        </Form>
      </div>

      <div className="hidden lg:block lg:w-1/2 lg:max-w-[600px]">
        <Image
          src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
          className="w-full h-auto object-contain"
          width={500}
          height={400}
          alt="بازیابی رمز عبور"
          priority
        />
      </div>
    </div>
  );
}
