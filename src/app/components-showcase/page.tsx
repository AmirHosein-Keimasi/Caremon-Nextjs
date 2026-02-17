"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

export default function ComponentsShowcasePage() {
  return (
    <div className="container mx-auto max-w-4xl space-y-12 py-12">
      <div>
        <h1 className="mb-2 text-3xl font-bold">نمایشگاه کامپوننت‌های UI</h1>
        <p className="text-muted-foreground">
          همه کامپوننت‌های shadcn/ui نصب شده در پروژه
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">دکمه‌ها (Button)</h2>
        <div className="flex flex-wrap gap-2">
          <Button>پیش‌فرض</Button>
          <Button variant="secondary">ثانویه</Button>
          <Button variant="destructive">مخرب</Button>
          <Button variant="outline">حاشیه‌دار</Button>
          <Button variant="ghost">شبح</Button>
          <Button variant="link">لینک</Button>
        </div>
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">کارت (Card)</h2>
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>عنوان کارت</CardTitle>
            <CardDescription>توضیحات کارت</CardDescription>
          </CardHeader>
          <CardContent>
            <p>محتوای کارت اینجا قرار می‌گیرد.</p>
          </CardContent>
          <CardFooter>
            <Button>اقدام</Button>
          </CardFooter>
        </Card>
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">برچسب‌ها (Badge)</h2>
        <div className="flex flex-wrap gap-2">
          <Badge>پیش‌فرض</Badge>
          <Badge variant="secondary">ثانویه</Badge>
          <Badge variant="destructive">مخرب</Badge>
          <Badge variant="outline">حاشیه‌دار</Badge>
        </div>
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">ورودی‌ها (Input)</h2>
        <div className="max-w-md space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">ایمیل</Label>
            <Input id="email" type="email" placeholder="example@email.com" />
          </div>
          <div className="flex items-center space-x-2 space-x-reverse">
            <Checkbox id="terms" />
            <Label htmlFor="terms">قوانین را می‌پذیرم</Label>
          </div>
          <div className="flex items-center space-x-2 space-x-reverse">
            <Switch id="notify" />
            <Label htmlFor="notify">اعلان‌ها</Label>
          </div>
        </div>
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">انتخابگر (Select)</h2>
        <Select>
          <SelectTrigger className="max-w-[200px]">
            <SelectValue placeholder="انتخاب کنید" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">گزینه ۱</SelectItem>
            <SelectItem value="2">گزینه ۲</SelectItem>
            <SelectItem value="3">گزینه ۳</SelectItem>
          </SelectContent>
        </Select>
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">اسلایدر و پیشرفت</h2>
        <div className="max-w-md space-y-6">
          <div className="space-y-2">
            <Label>اسلایدر</Label>
            <Slider defaultValue={[50]} max={100} step={1} />
          </div>
          <div className="space-y-2">
            <Label>نوار پیشرفت</Label>
            <Progress value={66} />
          </div>
        </div>
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">تب‌ها (Tabs)</h2>
        <Tabs defaultValue="tab1" className="max-w-md">
          <TabsList>
            <TabsTrigger value="tab1">تب ۱</TabsTrigger>
            <TabsTrigger value="tab2">تب ۲</TabsTrigger>
            <TabsTrigger value="tab3">تب ۳</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">محتوای تب اول</TabsContent>
          <TabsContent value="tab2">محتوای تب دوم</TabsContent>
          <TabsContent value="tab3">محتوای تب سوم</TabsContent>
        </Tabs>
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">آکاردئون</h2>
        <Accordion type="single" collapsible className="max-w-md">
          <AccordionItem value="item-1">
            <AccordionTrigger>آیا سوال اول؟</AccordionTrigger>
            <AccordionContent>پاسخ سوال اول.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>آیا سوال دوم؟</AccordionTrigger>
            <AccordionContent>پاسخ سوال دوم.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">هشدار (Alert)</h2>
        <div className="max-w-md space-y-4">
          <Alert>
            <AlertTitle>هشدار</AlertTitle>
            <AlertDescription>
              این یک پیام هشدار است.
            </AlertDescription>
          </Alert>
        </div>
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">اسکلتون</h2>
        <div className="max-w-md space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-12 w-1/2" />
        </div>
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">اعلان‌ها (Toast)</h2>
        <div className="flex gap-2">
          <Button
            onClick={() => toast.success("عملیات موفق بود!")}
            variant="outline"
          >
            موفقیت
          </Button>
          <Button
            onClick={() => toast.error("خطا رخ داد!")}
            variant="outline"
          >
            خطا
          </Button>
          <Button
            onClick={() => toast.info("اطلاعات")}
            variant="outline"
          >
            اطلاعات
          </Button>
        </div>
      </section>
    </div>
  );
}
