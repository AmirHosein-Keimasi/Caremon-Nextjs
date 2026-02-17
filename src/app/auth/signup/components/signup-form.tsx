"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

import InputField from "../../components/normal-input/normal-input.component";
import PasswordInput from "../../components/password-input/password-input.component";

export default function SignupForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const password = formData.get("password") as string;
    const username = email.split("@")[0];

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, username, email, password, phone }),
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
      setIsLoading(false);
    }
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <InputField
        type="email"
        id="email"
        name="email"
        label="ایمیل"
        placeholder="مثال@example.com"
        required
      />

      <InputField
        type="text"
        id="name"
        name="name"
        label="نام کامل"
        placeholder="نام و نام خانوادگی"
        required
      />

      <InputField
        id="phone"
        name="phone"
        type="tel"
        label="شماره تلفن"
        placeholder="09123456789"
        required
      />

      <PasswordInput
        label="رمز عبور"
        name="password"
        placeholder="رمز عبور خود را وارد کنید"
        required
      />

      <Button
        type="submit"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2Icon className="size-4 animate-spin" />
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
  );
}
