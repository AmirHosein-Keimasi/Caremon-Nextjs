"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Spinner from "@/components/Spinner/Spinner";
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
import InputField from "../../components/normal-input/normal-input.component";
import PasswordInput from "../../components/password-input/password-input.component";
import { signupSchema, type SignupInput } from "@/lib/schemas";

export default function SignupForm() {
  const router = useRouter();
  const [error, setError] = useState("");

  const form = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: SignupInput) => {
    setError("");
    const username = values.email.split("@")[0];
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          username,
          email: values.email,
          password: values.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "خطا در ثبت نام");
        return;
      }

      router.push("/dashboard");
    } catch {
      setError("خطا در ارتباط با سرور");
    } finally {
      form.reset();
    }
  };

  return (
    <Form {...form}>
      <form className="flex flex-col gap-3" onSubmit={form.handleSubmit(onSubmit)}>
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

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
                  placeholder="مثال@example.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نام کامل</FormLabel>
              <FormControl>
                <InputField
                  type="text"
                  id="name"
                  placeholder="نام و نام خانوادگی"
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
              <FormLabel>شماره تلفن (اختیاری)</FormLabel>
              <FormControl>
                <InputField
                  type="tel"
                  id="phone"
                  placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <PasswordInput
                  label="رمز عبور"
                  placeholder="رمز عبور خود را وارد کنید"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Spinner size={18} className="shrink-0" />
              <span>در حال ثبت...</span>
            </>
          ) : (
            "ثبت نام"
          )}
        </Button>

        <div className="flex items-center my-4 text-muted-foreground before:content-[''] before:flex-1 before:border-t before:border-border before:mx-2 after:content-[''] after:flex-1 after:border-t after:border-border after:mx-2">
          <span className="px-2 font-semibold">یا</span>
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full bg-[#4285f4] text-white hover:bg-[#357ae8] hover:text-white"
          disabled
        >
          ثبت نام با گوگل (به زودی)
        </Button>

        <p className="text-right text-foreground text-sm">
          قبلاً حساب کاربری دارید؟{" "}
          <Link
            href="/auth/signin"
            className="text-primary font-medium text-sm transition-colors duration-300 ease-in-out hover:underline hover:text-primary-400"
          >
            ورود
          </Link>
        </p>
      </form>
    </Form>
  );
}
