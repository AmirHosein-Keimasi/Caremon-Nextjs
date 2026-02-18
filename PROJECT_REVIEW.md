# 📋 گزارش بررسی جامع پروژه Caremon

**تاریخ بررسی:** ۱۷ فوریه ۲۰۲۶  
**نسخه پروژه:** 0.2.0

---

## 🎯 مسیر و ساختار پروژه

### ساختار کلی

```
maincaremon/
├── src/
│   ├── app/                    # صفحات Next.js (App Router)
│   │   ├── auth/               # احراز هویت (ورود، ثبت‌نام، فراموشی رمز)
│   │   ├── cars/[id]/          # جزئیات خودرو
│   │   ├── checkout/           # تایید و پرداخت رزرو
│   │   ├── dashboard/          # داشبورد کاربر
│   │   ├── profile/            # پروفایل کاربر
│   │   ├── reserve/[id]/       # فرم رزرو خودرو
│   │   ├── search/             # جستجوی خودرو
│   │   └── Rules/              # قوانین
│   ├── components/             # کامپوننت‌های مشترک
│   │   ├── header/             # هدر، UserPanel
│   │   ├── dark-mode-toggle/   # سوئیچ تم تاریک
│   │   ├── ShoppingCart/       # سبد خرید
│   │   ├── Invoice/            # فاکتور
│   │   ├── ReservationOptions/ # گزینه‌های رزرو
│   │   └── ui/                 # کامپوننت‌های shadcn/ui
│   ├── store/                  # Zustand stores
│   │   ├── cartStore.ts        # رزرو فعلی (Single Rental)
│   │   ├── reservationStore.ts  # رزروهای ثبت‌شده
│   │   ├── dashboardStore.ts   # آمار داشبورد
│   │   ├── userProfileStore.ts  # پروفایل مشتری
│   │   └── searchPresetsStore.ts
│   ├── lib/                    # ابزارها و کلاینت API
│   ├── models/                 # مدل‌های داده
│   └── utils/                  # توابع کمکی
├── prisma/                     # اسکیمای دیتابیس
└── public/
```

### فلو اصلی کاربر

```
جستجو → جزئیات خودرو → رزرو (reserve/[id]) → سبد خرید → checkout → داشبورد
```

---

## ⚠️ مشکلات و نقاط ضعف

### ۱. ناسازگاری مستندات با کد فعلی

| مورد         | مستندات                                | واقعیت کد                                   |
| ------------ | -------------------------------------- | ------------------------------------------- |
| Cart API     | `addToCart`, `removeFromCart`, `items` | `setRental`, `clearRental`, `currentRental` |
| LocalStorage | `caremon-cart`                         | `caremon-rental`                            |
| مدل داده     | `CartItem` با quantity                 | `RentalItem` (تک رزرو)                      |
| Toast        | `ToastContainer` (react-toastify)      | `Toaster` (sonner)                          |
| Layout       | ErrorBoundary + ToastContainer         | فقط Toaster، بدون ErrorBoundary             |

### ۲. Dark Mode

- **next-themes** نصب شده ولی استفاده نمی‌شود
- `DarkModeToggleComponent` خودش state و localStorage جدا دارد
- احتمال **flash** در hydration (چون مقدار اولیه از localStorage خوانده می‌شود)
- **پیشنهاد:** استفاده از `ThemeProvider` از next-themes برای هماهنگی با SSR

### ۳. UserPanel

- `userName` همیشه `"کاربر"` است
- نام کاربر از API پروفایل یا auth خوانده نمی‌شود

### ۴. Checkout

- **TODO:** ارسال به بک‌اند برای پردازش پرداخت انجام نشده
- فعلاً فقط: `toast.success` + `clearRental` + redirect به dashboard
- هیچ درخواست API واقعی نیست

### ۵. Prisma Schema

- مدل `Reservation` ساده است و با ساختار `reservationStore` هماهنگ نیست
- فیلدهای اضافی مثل `status`, `paymentStatus`, `selectedOptions` در دیتابیس نیستند
- نیاز به migration یا تطبیق مدل‌ها

### ۶. Dashboard

- `refreshStats("current-user-id")` — userId از auth واقعی نمی‌آید
- TODO در کد: `// TODO: Get from auth`

### ۷. امنیت

- پرداخت و validation سمت سرور پیاده‌سازی نشده
- CSRF، رمزنگاری و authorization در بک‌اند نیاز به پیاده‌سازی دارد

### ۸. تست

- تست واحد یا E2E در پروژه دیده نمی‌شود
- ساختار تست (مثلاً Jest/Vitest) تعریف نشده

---

## ✅ نقاط قوت

- **TypeScript** بدون خطا
- **ESLint** بدون warning
- **RTL و فارسی** به‌درستی پشتیبانی می‌شود
- **Responsive** با breakpointهای مناسب
- **Zustand** با persist برای state پایدار
- **Tailwind v4** با design tokens
- **shadcn/ui** برای UI یکپارچه
- **Sonner** برای نوتیفیکیشن

---

## 📁 فایل‌های LocalStorage

| کلید                   | توضیح            |
| ---------------------- | ---------------- |
| `caremon-rental`       | رزرو فعلی در سبد |
| `caremon-reservations` | رزروهای ثبت‌شده  |
| `caremon-user-profile` | پروفایل مشتری    |
| `dark-mode`            | تم تاریک/روشن    |

---

## 🔧 پیشنهادات بهبود

1. **مستندات:** به‌روزرسانی QUICK_REFERENCE و INTEGRATION_GUIDE با API فعلی
2. **Dark Mode:** استفاده از next-themes و ThemeProvider
3. **UserPanel:** اتصال به API پروفایل برای نام کاربر
4. **Checkout:** اتصال به API رزرو و پرداخت
5. **Prisma:** هماهنگ‌سازی مدل Reservation با نیازهای فرانت
6. **Auth:** استفاده از userId واقعی در dashboard و refreshStats
7. **تست:** اضافه کردن حداقل تست‌های حیاتی

---

## 📊 خلاصه وضعیت

| بخش              | وضعیت                      |
| ---------------- | -------------------------- |
| UI/UX            | ✅ خوب                     |
| State Management | ✅ خوب                     |
| Routing          | ✅ خوب                     |
| احراز هویت       | ⚠️ نیاز به اتصال به بک‌اند |
| پرداخت           | ❌ پیاده‌سازی نشده         |
| مستندات          | ⚠️ قدیمی و ناسازگار        |
| تست              | ❌ وجود ندارد              |
