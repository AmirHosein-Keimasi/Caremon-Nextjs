"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { addCarSchema, type AddCarInput } from "@/lib/schemas";

const defaultValues: AddCarInput = {
  name: "",
  model: "",
  location: "",
  img: "default-car.png",
  withDriver: "بدون راننده",
  transmission: "دستی",
  days_3_to_14: 0,
  more_than_14_days: 0,
  deposit: 0,
  minimum_rental: 1,
  passengers: 5,
  luggage: 2,
  door: 4,
  chassis_type: "سدان",
  option_type: "استاندارد",
  cruise_control: false,
  hill_start_assist: false,
  apple_carplay: false,
  seat_heating: false,
  seat_cooling: false,
  air_conditioning: true,
  rear_sensor: false,
  audio_system: "استاندارد",
  monitor: "—",
  driver_seat_adjustment: "دستی",
  panoramic_roof: false,
  gps: false,
  auto_park: false,
  auto_drive: false,
  connectivity: [],
  braking_system: [],
  engine_type: "بنزینی",
  engine_capacity: 0,
  engine_cylinders: 0,
  engine_acceleration: 0,
  engine_fuel_consumption: 0,
  driver_hourly_10: 0,
  driver_intercity_per_km: 0,
  driver_airport_transfer: 0,
};

type AddCarFormProps = {
  successRedirect?: string;
  cancelHref?: string;
  cancelLabel?: string;
};

export function AddCarForm({
  successRedirect = "/dashboard/my-cars",
  cancelHref = "/dashboard",
  cancelLabel = "انصراف و بازگشت به داشبورد",
}: AddCarFormProps) {
  const router = useRouter();
  const [error, setError] = useState("");

  const form = useForm<AddCarInput>({
    resolver: zodResolver(addCarSchema) as Resolver<AddCarInput>,
    defaultValues,
  });

  const isSubmitting = form.formState.isSubmitting;

  const onSubmit = async (values: AddCarInput) => {
    setError("");
    try {
      const moreThan14 = values.more_than_14_days ?? Math.round((values.days_3_to_14 || 0) * 0.9);
      const body = {
        name: values.name,
        model: values.model,
        location: values.location,
        img: values.img || "default-car.png",
        withDriver: values.withDriver,
        rental: {
          days_3_to_14: values.days_3_to_14,
          more_than_14_days: moreThan14,
          minimum_rental: values.minimum_rental,
          deposit: values.deposit,
        },
        capacity: {
          passengers: values.passengers,
          luggage: values.luggage,
          door: values.door,
        },
        features: {
          transmission: values.transmission,
          chassis_type: values.chassis_type,
          option_type: values.option_type,
          cruise_control: values.cruise_control,
          hill_start_assist: values.hill_start_assist,
          apple_carplay: values.apple_carplay,
          seat_heating: values.seat_heating,
          seat_cooling: values.seat_cooling,
          air_conditioning: values.air_conditioning,
          rear_sensor: values.rear_sensor,
          audio_system: values.audio_system,
          monitor: values.monitor,
          driver_seat_adjustment: values.driver_seat_adjustment,
          panoramic_roof: values.panoramic_roof,
          gps: values.gps,
          auto_park: values.auto_park,
          auto_drive: values.auto_drive,
          connectivity: values.connectivity ?? [],
          braking_system: values.braking_system ?? [],
        },
        engine: {
          type: values.engine_type,
          capacity: values.engine_capacity,
          cylinders: values.engine_cylinders,
          acceleration: values.engine_acceleration,
          fuel_consumption: values.engine_fuel_consumption,
        },
        driverRental: {
          hourly_10: values.driver_hourly_10,
          intercity_per_km: values.driver_intercity_per_km,
          airport_transfer: values.driver_airport_transfer,
        },
      };

      const res = await fetch("/api/cars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) {
        const msg =
          res.status === 401
            ? "ورود به حساب الزامی است. اگر قبلاً وارد شده‌اید، یک بار از حساب خارج شوید و دوباره وارد شوید."
            : data.error || "خطا در ثبت خودرو";
        setError(msg);
        return;
      }
      router.push(successRedirect);
      router.refresh();
    } catch {
      setError("خطا در ارتباط با سرور");
    }
  };

  return (
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
                <Select onValueChange={field.onChange} value={field.value}>
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
        </div>

        {/* قیمت و ظرفیت */}
        <div className="border-t pt-4">
          <h3 className="mb-3 font-semibold text-foreground">قیمت و ظرفیت</h3>
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
                      onChange={(e) =>
                        field.onChange(e.target.valueAsNumber || 0)
                      }
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
                      onChange={(e) =>
                        field.onChange(e.target.valueAsNumber || 0)
                      }
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
                      onChange={(e) =>
                        field.onChange(e.target.valueAsNumber || 1)
                      }
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
                      onChange={(e) =>
                        field.onChange(e.target.valueAsNumber || 1)
                      }
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
                      onChange={(e) =>
                        field.onChange(e.target.valueAsNumber || 0)
                      }
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
                      onChange={(e) =>
                        field.onChange(e.target.valueAsNumber || 2)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* امکانات و ویژگی‌ها */}
        <Collapsible defaultOpen>
          <CollapsibleTrigger asChild>
            <Button type="button" variant="outline" className="w-full justify-between border-t pt-4">
              <span className="font-semibold text-foreground">امکانات و ویژگی‌ها</span>
              <span className="text-muted-foreground">کلیک برای باز/بسته</span>
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="grid gap-4 pt-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="transmission"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>نوع دنده</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="دستی">دستی</SelectItem>
                        <SelectItem value="اتوماتیک">اتوماتیک</SelectItem>
                        <SelectItem value="سی‌ویتی">سی‌ویتی</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="chassis_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>نوع شاسی</FormLabel>
                    <FormControl>
                      <Input placeholder="مثال: سدان، شاسی بلند" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="option_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>نوع آپشن</FormLabel>
                    <FormControl>
                      <Input placeholder="مثال: فول آپشن، استاندارد" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="audio_system"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>سیستم صوتی</FormLabel>
                    <FormControl>
                      <Input placeholder="مثال: ۶ اسپیکر" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="monitor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>مانیتور</FormLabel>
                    <FormControl>
                      <Input placeholder="مثال: ۸ اینچی لمسی" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="driver_seat_adjustment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>تنظیم صندوق راننده</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="دستی">دستی</SelectItem>
                        <SelectItem value="الکتریکی">الکتریکی</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mt-4 flex flex-wrap gap-6">
              <FormField
                control={form.control}
                name="cruise_control"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center gap-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="mt-0!">کروز کنترل</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="hill_start_assist"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center gap-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="mt-0!">کمک راننده سربالایی</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="apple_carplay"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center gap-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="mt-0!">اپل کارپلی</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="seat_heating"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center gap-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="mt-0!">گرمکن صندلی</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="seat_cooling"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center gap-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="mt-0!">سرمایش صندلی</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="air_conditioning"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center gap-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="mt-0!">کولر</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rear_sensor"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center gap-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="mt-0!">سنسور عقب</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="panoramic_roof"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center gap-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="mt-0!">سقف پانوراما</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gps"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center gap-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="mt-0!">جی‌پی‌اس</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="auto_park"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center gap-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="mt-0!">پارک خودکار</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="auto_drive"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center gap-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="mt-0!">رانندگی خودکار</FormLabel>
                  </FormItem>
                )}
              />
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* مشخصات موتور */}
        <Collapsible>
          <CollapsibleTrigger asChild>
            <Button type="button" variant="outline" className="w-full justify-between border-t pt-4">
              <span className="font-semibold text-foreground">مشخصات موتور</span>
              <span className="text-muted-foreground">کلیک برای باز/بسته</span>
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="grid gap-4 pt-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="engine_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>نوع موتور</FormLabel>
                    <FormControl>
                      <Input placeholder="مثال: بنزینی، هیبرید" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="engine_capacity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>حجم موتور (لیتر)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        step={0.1}
                        placeholder="مثال: 2.0"
                        {...field}
                        onChange={(e) =>
                          field.onChange(e.target.valueAsNumber || 0)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="engine_cylinders"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>تعداد سیلندر</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        {...field}
                        onChange={(e) =>
                          field.onChange(e.target.valueAsNumber || 0)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="engine_acceleration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>شتاب ۰ تا ۱۰۰ (ثانیه)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        step={0.1}
                        {...field}
                        onChange={(e) =>
                          field.onChange(e.target.valueAsNumber || 0)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="engine_fuel_consumption"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>مصرف سوخت (لیتر در ۱۰۰ کیلومتر)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        step={0.1}
                        {...field}
                        onChange={(e) =>
                          field.onChange(e.target.valueAsNumber || 0)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* قیمت با راننده */}
        <Collapsible>
          <CollapsibleTrigger asChild>
            <Button type="button" variant="outline" className="w-full justify-between border-t pt-4">
              <span className="font-semibold text-foreground">قیمت با راننده (اختیاری)</span>
              <span className="text-muted-foreground">کلیک برای باز/بسته</span>
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="grid gap-4 pt-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="driver_hourly_10"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ساعتی ۱۰ ساعت (تومان)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        {...field}
                        onChange={(e) =>
                          field.onChange(e.target.valueAsNumber || 0)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="driver_intercity_per_km"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>برون‌شهری هر کیلومتر (تومان)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        {...field}
                        onChange={(e) =>
                          field.onChange(e.target.valueAsNumber || 0)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="driver_airport_transfer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>انتقال فرودگاهی (تومان)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        {...field}
                        onChange={(e) =>
                          field.onChange(e.target.valueAsNumber || 0)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CollapsibleContent>
        </Collapsible>

        <div className="flex flex-wrap gap-3 border-t pt-6">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "در حال ثبت..." : "ثبت خودرو در مارکت‌پلیس"}
          </Button>
          <Button type="button" variant="outline" asChild>
            <Link href={cancelHref}>{cancelLabel}</Link>
          </Button>
          <Button type="button" variant="ghost" asChild>
            <Link href="/search" className="text-muted-foreground">
              مشاهده لیست خودروها
            </Link>
          </Button>
        </div>
      </form>
    </Form>
  );
}
