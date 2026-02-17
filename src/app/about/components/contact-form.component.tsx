"use client";

import { ReactElement, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ContactForm(): ReactElement {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    // فعلاً فقط UI — ارسال واقعی بعداً با بک‌اند پیاده‌سازی می‌شود
    setTimeout(() => {
      setStatus("success");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
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
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="contact-name">نام و نام خانوادگی</Label>
          <Input
            id="contact-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="نام شما"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact-email">ایمیل</Label>
          <Input
            id="contact-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="contact-subject">موضوع</Label>
        <Input
          id="contact-subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="موضوع پیام"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="contact-message">پیام</Label>
        <Textarea
          id="contact-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="متن پیام خود را بنویسید..."
          rows={5}
          required
        />
      </div>
      <Button type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "در حال ارسال..." : "ارسال پیام"}
      </Button>
    </form>
  );
}
