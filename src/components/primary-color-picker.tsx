"use client";

import { usePrimaryTheme } from "@/contexts/primary-theme-context";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

/** hue و برچسب برای هر گزینه */
const PRESETS: { hue: number; label: string }[] = [
  { hue: 235, label: "آبی" },
  { hue: 195, label: "فیروزه" },
  { hue: 150, label: "سبز" },
  { hue: 85, label: "زرد-سبز" },
  { hue: 35, label: "نارنجی" },
  { hue: 25, label: "قرمز" },
  { hue: 320, label: "صورتی" },
  { hue: 280, label: "بنفش" },
];

/** رنگ نمایشی برای هر hue (با HSL برای سواچ) */
function hueToStyle(hue: number) {
  return { backgroundColor: `hsl(${hue}, 65%, 50%)` };
}

export function PrimaryColorPicker() {
  const { primaryHue, setPrimaryHue, defaultHue } = usePrimaryTheme();

  const currentHue = primaryHue ?? defaultHue;

  return (
    <div className="space-y-3">
      <Label className="text-base">رنگ تم (پرایمری)</Label>
      <p className="text-sm text-muted-foreground">
        رنگ دکمه‌ها و لینک‌های اصلی سایت را انتخاب کنید. تغییر بلافاصله اعمال
        می‌شود.
      </p>
      <div className="flex flex-wrap items-center gap-2">
        {PRESETS.map(({ hue, label }) => {
          const isActive = Math.round(currentHue) === Math.round(hue);
          return (
            <button
              key={hue}
              type="button"
              onClick={() => setPrimaryHue(hue)}
              className={cn(
                "size-10 rounded-full border-2 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                isActive
                  ? "border-foreground scale-110 ring-2 ring-primary ring-offset-2 ring-offset-background"
                  : "border-transparent hover:scale-105",
              )}
              style={hueToStyle(hue)}
              title={label}
              aria-label={`رنگ ${label}`}
              aria-pressed={isActive}
            />
          );
        })}
      </div>
      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setPrimaryHue(null)}
          className="min-h-[36px]"
        >
          بازگشت به پیش‌فرض (آبی)
        </Button>
      </div>
    </div>
  );
}
