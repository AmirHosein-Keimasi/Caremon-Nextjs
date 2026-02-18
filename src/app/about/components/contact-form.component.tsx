"use client";

import { ReactElement, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { contactFormSchema, type ContactFormInput } from "@/lib/schemas";

export default function ContactForm(): ReactElement {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const form = useForm<ContactFormInput>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = (values: ContactFormInput) => {
    setStatus("submitting");
    // فعلاً فقط UI — ارسال واقعی بعداً با بک‌اند
    setTimeout(() => {
      setStatus("success");
      form.reset();
    }, 800);
  };

  if (status === "success") {
    return (
      <div className="p-6 rounded-lg bg-primary/10 text-primary text-center">
        <p className="font-medium">پیام شما با موفقیت ثبت شد.</p>
        <p className="text-sm mt-1">
          در اسرع وقت با شما تماس خواهیم گرفت.
        </p>
        <Button
          variant="outline"
          size="sm"
          className="mt-4"
          onClick={() => setStatus("idle")}
        >
          ارسال پیام جدید
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 max-w-xl"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>نام و نام خانوادگی</FormLabel>
                <FormControl>
                  <Input placeholder="نام شما" {...field} />
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
                    placeholder="example@email.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>موضوع</FormLabel>
              <FormControl>
                <Input placeholder="موضوع پیام" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>پیام</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="متن پیام خود را بنویسید..."
                  rows={5}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "در حال ارسال..." : "ارسال پیام"}
        </Button>
      </form>
    </Form>
  );
}
