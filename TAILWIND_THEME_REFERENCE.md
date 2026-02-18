# راهنمای تم Tailwind - کلاس‌های آماده

## کلاس‌های Semantic (تغییر با Light/Dark)

| کلاس                        | کاربرد               |
| --------------------------- | -------------------- |
| `bg-background`             | پس‌زمینه اصلی        |
| `text-foreground`           | متن اصلی             |
| `bg-card`                   | کارت‌ها              |
| `text-card-foreground`      | متن روی کارت         |
| `bg-primary`                | دکمه اصلی، لینک فعال |
| `text-primary`              | متن پررنگ، لینک      |
| `text-primary-foreground`   | متن روی primary      |
| `bg-secondary`              | پس‌زمینه ثانویه      |
| `text-secondary-foreground` | متن روی secondary    |
| `bg-muted`                  | پس‌زمینه کم‌رنگ      |
| `text-muted-foreground`     | متن کم‌رنگ           |
| `bg-accent`                 | هاور، هایلایت        |
| `text-accent-foreground`    | متن روی accent       |
| `bg-destructive`            | خطا، حذف             |
| `text-destructive`          | متن قرمز             |
| `border-border`             | بوردر                |
| `bg-input`                  | اینپوت‌ها            |
| `ring-ring`                 | فوکوس                |

## کلاس‌های Primary (۵۰ تا ۹۵۰)

```
bg-primary-50 ... bg-primary-950
text-primary-50 ... text-primary-950
border-primary-500
ring-primary-500
```

## کلاس‌های Secondary

```
bg-secondary-50 ... bg-secondary-950
text-secondary-500
```

## کلاس‌های وضعیت

| وضعیت   | کلاس                                |
| ------- | ----------------------------------- |
| موفق    | `bg-success` `text-success`         |
| هشدار   | `bg-warning` `text-warning`         |
| خطا     | `bg-destructive` `text-destructive` |
| اطلاعات | `bg-info` `text-info`               |

## Dark Mode

```html
<!-- با کلاس dark: -->
<div class="bg-background dark:bg-gray-900"></div>
```

تم با `data-theme="dark"` یا کلاس `.dark` روی `html` فعال می‌شود.

## Radius

```
rounded-sm  rounded-md  rounded-lg  rounded-xl  rounded-2xl  rounded-full
```

## مثال‌ها

```tsx
// دکمه اصلی
<button className="bg-primary text-primary-foreground hover:bg-primary/90">

// کارت
<div className="bg-card text-card-foreground border border-border rounded-lg">

// متن کم‌رنگ
<span className="text-muted-foreground">

// لینک
<a className="text-primary hover:underline">

// بج موفق
<span className="bg-success text-success-foreground rounded-md px-2 py-1">
```
