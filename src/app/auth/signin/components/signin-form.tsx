"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Spinner from "@/components/Spinner/Spinner";
import { useUserProfileStore } from "@/store/userProfileStore";
import { tokenUtils } from "@/lib/api-client";
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
import { signinSchema, type SigninInput } from "@/lib/schemas";

export default function SigninForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/dashboard";
  const updateProfile = useUserProfileStore((state) => state.updateProfile);
  const [error, setError] = useState("");

  const form = useForm<SigninInput>({
    resolver: zodResolver(signinSchema),
    defaultValues: { email: "", password: "" },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: SigninInput) => {
    setError("");
    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok) {
        form.setError("root", { message: data.error || "خطا در ورود" });
        setError(data.error || "خطا در ورود");
        return;
      }

      const fullName = String(data?.user?.name || "").trim();
      const [firstName = "", ...lastNameParts] = fullName
        .split(/\s+/)
        .filter(Boolean);
      const lastName = lastNameParts.join(" ");

      updateProfile({
        ...(firstName ? { firstName } : {}),
        ...(lastName ? { lastName } : {}),
        email: String(data?.user?.email || values.email).trim(),
      });

      const token =
        (data?.accessToken as string | undefined) || "dummy-token";
      const expiresIn =
        (data?.expiresIn as number | undefined) ?? 7 * 24 * 60 * 60;
      tokenUtils.setToken(token, expiresIn);

      router.push(redirect.startsWith("/") ? redirect : "/dashboard");
    } catch {
      setError("خطا در ارتباط با سرور");
    }
  };

  return (
    <Form {...form}>
      <form className="flex flex-col gap-3" onSubmit={form.handleSubmit(onSubmit)}>
        {(error || form.formState.errors.root?.message) && (
          <Alert variant="destructive">
            <AlertDescription>
              {error || form.formState.errors.root?.message}
            </AlertDescription>
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

        <div className="text-right -mt-2 mb-2">
          <Link
            href="/auth/forgot-password"
            className="text-sm text-primary transition-colors duration-300 ease-in-out hover:underline hover:text-primary-400"
          >
            رمز عبور را فراموش کرده‌اید؟
          </Link>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Spinner size={18} className="shrink-0" />
              <span>در حال ورود...</span>
            </>
          ) : (
            "ورود"
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
          ورود با گوگل (به زودی)
        </Button>

        <p className="text-center text-sm text-foreground">
          حساب کاربری ندارید؟{" "}
          <Link
            href="/auth/signup"
            className="text-primary font-medium transition-colors duration-300 ease-in-out hover:underline hover:text-primary-400"
          >
            ثبت نام
          </Link>
        </p>
      </form>
    </Form>
  );
}
