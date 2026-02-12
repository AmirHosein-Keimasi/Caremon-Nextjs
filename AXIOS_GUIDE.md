# Axios Interceptor System - راهنمای استفاده

## مقدمه

این سیستم یک راه‌حل جامع برای مدیریت درخواست‌های API در فرانت‌اند است با ویژگی‌های:

- ✅ **Automatic Token Management** - مدیریت خودکار توکن‌ها
- ✅ **Retry Logic** - تلاش مجدد خودکار برای خطاهای موقتی
- ✅ **Error Handling** - مدیریت متمرکز خطاها
- ✅ **Request/Response Logging** - لاگ‌کردن درخواست‌ها و پاسخ‌ها
- ✅ **TypeScript Support** - پشتیبانی کامل TypeScript
- ✅ **Future-Proof** - آماده برای Edge Events و سیستم‌های آینده

---

## ساختار

```
src/
├── lib/
│   ├── api-client.ts           # Axios instance + interceptors
│   ├── exceptions.ts           # Custom error classes
│   └── error-notifications.ts  # Toast notifications
├── hooks/
│   └── useApi.ts              # React hooks برای API
├── types/
│   └── api.types.ts           # TypeScript types
└── components/
    └── ErrorBoundary.tsx      # Error boundary component
```

---

## استفاده

### 1. Setup در `layout.tsx` یا `_app.tsx`

```typescript
'use client';

import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      {children}
      <ToastContainer />
    </ErrorBoundary>
  );
}
```

### 2. استفاده از `useApi` برای GET requests

```typescript
'use client';

import { useApi } from '@/hooks/useApi';
import { useEffect } from 'react';
import { useErrorHandler } from '@/lib/error-notifications';
import type { Car } from '@/types/api.types';

export function CarList() {
  const { data: cars, loading, error, fetch } = useApi<Car[]>('/api/cars');
  const { handleError } = useErrorHandler();

  useEffect(() => {
    fetch().catch(handleError);
  }, [fetch, handleError]);

  if (loading) return <div>در حال بارگذاری...</div>;
  if (error) return <div>خطا: {error.message}</div>;

  return (
    <ul>
      {cars?.map((car) => (
        <li key={car.id}>{car.name}</li>
      ))}
    </ul>
  );
}
```

### 3. استفاده از `usePost` برای ایجاد داده

```typescript
'use client';

import { usePost } from '@/hooks/useApi';
import { useState } from 'react';
import { useErrorHandler } from '@/lib/error-notifications';
import { showSuccessNotification } from '@/lib/error-notifications';

interface CreateCarData {
  name: string;
  model: string;
  location: string;
}

export function CreateCarForm() {
  const [formData, setFormData] = useState<CreateCarData>({
    name: '',
    model: '',
    location: '',
  });

  const { mutate: createCar, loading } = usePost<CreateCarData, { id: string }>('/api/cars');
  const { handleError } = useErrorHandler();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createCar(formData);
      showSuccessNotification('خودرو ایجاد شد');
      setFormData({ name: '', model: '', location: '' });
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="نام"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <button type="submit" disabled={loading}>
        {loading ? 'درحال ایجاد...' : 'ایجاد'}
      </button>
    </form>
  );
}
```

### 4. استفاده از `useMutation` برای UPDATE/DELETE

```typescript
'use client';

import { usePut, useDelete } from '@/hooks/useApi';
import { useErrorHandler } from '@/lib/error-notifications';
import { showSuccessNotification } from '@/lib/error-notifications';

export function UpdateCarForm({ carId, initialName }: { carId: string; initialName: string }) {
  const { mutate: updateCar, loading: updating } = usePut('/api/cars/' + carId);
  const { mutate: deleteCar, loading: deleting } = useDelete('/api/cars/' + carId);
  const { handleError } = useErrorHandler();

  const handleUpdate = async () => {
    try {
      await updateCar({ name: 'نام جدید' });
      showSuccessNotification('خودرو به‌روز شد');
    } catch (error) {
      handleError(error);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('آیا اطمینان دارید؟')) return;
    try {
      await deleteCar();
      showSuccessNotification('خودرو حذف شد');
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div>
      <button onClick={handleUpdate} disabled={updating}>
        {updating ? 'در حال به‌روزرسانی...' : 'به‌روزرسانی'}
      </button>
      <button onClick={handleDelete} disabled={deleting}>
        {deleting ? 'در حال حذف...' : 'حذف'}
      </button>
    </div>
  );
}
```

### 5. مدیریت خطاهای API مختلف

```typescript
'use client';

import { useApi } from '@/hooks/useApi';
import { isApiException, ApiErrorCode } from '@/lib/exceptions';
import { useEffect, useState } from 'react';

export function CarDetails({ carId }: { carId: string }) {
  const { data: car, loading, error, fetch } = useApi(`/api/cars/${carId}`);
  const [retrying, setRetrying] = useState(false);

  useEffect(() => {
    fetch();
  }, [carId, fetch]);

  const handleRetry = async () => {
    setRetrying(true);
    try {
      await fetch();
    } finally {
      setRetrying(false);
    }
  };

  if (loading) return <div>درحال بارگذاری...</div>;

  if (error) {
    if (isApiException(error)) {
      switch (error.code) {
        case ApiErrorCode.NOT_FOUND:
          return <div>خودرویی یافت نشد</div>;
        case ApiErrorCode.UNAUTHORIZED:
          return <div>ابتدا وارد شوید</div>;
        case ApiErrorCode.NETWORK_ERROR:
          return (
            <div>
              <p>خطای شبکه</p>
              <button onClick={handleRetry} disabled={retrying}>
                تلاش دوباره
              </button>
            </div>
          );
        default:
          return <div>خطا: {error.message}</div>;
      }
    }
  }

  return (
    <div>
      <h1>{car?.name}</h1>
      <p>{car?.model}</p>
    </div>
  );
}
```

---

## Error Codes

```typescript
NETWORK_ERROR; // خطای شبکه
TIMEOUT; // درخواست منقضی شد
NO_INTERNET; // بدون اتصال اینترنت
UNAUTHORIZED; // عدم احراز هویت (401)
FORBIDDEN; // دسترسی رد شد (403)
TOKEN_EXPIRED; // توکن منقضی شده
SESSION_EXPIRED; // جلسه منقضی
BAD_REQUEST; // درخواست نامعتبر (400)
VALIDATION_ERROR; // خطای validation
NOT_FOUND; // یافت نشد (404)
CONFLICT; // تضاد (409)
INTERNAL_SERVER_ERROR; // خطای سرور (500)
SERVICE_UNAVAILABLE; // سرویس غیردسترس (503)
```

---

## Token Management

```typescript
import { tokenUtils } from "@/lib/api-client";

// دریافت توکن
const token = tokenUtils.getToken();

// تنظیم توکن
tokenUtils.setToken("your_token_here", 3600); // expires in 1 hour

// حذف توکن
tokenUtils.removeToken();

// بررسی وجود توکن
if (tokenUtils.hasToken()) {
  // کاربر لاگین کرده
}
```

---

## Custom Error Handling

```typescript
import { ApiException, isApiException } from "@/lib/exceptions";

try {
  await apiClient.get("/api/cars");
} catch (error) {
  if (isApiException(error)) {
    console.log("Error Code:", error.code);
    console.log("Status Code:", error.statusCode);
    console.log("Is Retryable:", error.isRetryable);
    console.log("Details:", error.details);
  }
}
```

---

## Automatic Retry Logic

سیستم خودکار برای این موارد retry انجام می‌دهد:

- **5xx errors** (Server errors) - تا 3 بار
- **429 Too Many Requests** - تا 3 بار
- **401 with TOKEN_EXPIRED** - 1 بار (token refresh)

**Exponential Backoff**: تاخیر بین تلاش‌ها: 1s → 2s → 4s → max 10s

---

## Request Logging (Development)

در development mode، تمام درخواست‌ها و پاسخ‌ها لاگ می‌شوند:

```
[API Request] GET /api/cars
[API Response] 200 GET /api/cars (125ms)
[API Error] 404 GET /api/cars/invalid
```

---

## Integration با Edge Events (آینده)

هنگامی که سیستم جدید آماده شود:

```typescript
// Migrate to new system
import { edgeEventClient } from "@/lib/edge-event-client";

// این کد به‌طور خودکار compatible خواهد شد
const { data } = await edgeEventClient.query("/cars");
```

---

## Best Practices

### ✅ DO:

```typescript
// استفاده از hooks
const { data, loading, error, mutate } = useApi('/api/cars');

// handle error properly
try {
  await mutate(data);
} catch (error) {
  handleError(error);
}

// استفاده از ErrorBoundary
<ErrorBoundary>
  <MyComponent />
</ErrorBoundary>
```

### ❌ DON'T:

```typescript
// Directly using axios
import axios from 'axios';
axios.get('/api/cars'); // ❌ No interceptors!

// نگاه نکردن به error
mutate(data); // ❌ Unhandled promise rejection

// No fallback UI
{loading && <div>Loading...</div>} // بدون error/retry UI
```

---

## Testing

```typescript
import { describe, it, expect, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useApi } from "@/hooks/useApi";

describe("useApi", () => {
  it("should fetch data", async () => {
    const { result } = renderHook(() => useApi("/api/cars"));

    await result.current.fetch();

    await waitFor(() => {
      expect(result.current.data).toBeDefined();
      expect(result.current.loading).toBe(false);
    });
  });
});
```

---

## Troubleshooting

### خطا: "Cannot find token"

```typescript
// افزودن .env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

### خطا: "CORS error"

```typescript
// Backend باید این headers را ارسال کند:
Access-Control-Allow-Origin: http://localhost:3000
Access-Control-Allow-Credentials: true
```

### Request تا ابد pending است

```typescript
// بررسی timeout
const { data, fetch } = useApi("/api/slow-endpoint", { timeout: 60000 });
```

---

## نسخه‌های آینده

- [ ] Request Caching
- [ ] Offline Support (Service Worker)
- [ ] GraphQL Support
- [ ] WebSocket Integration
- [ ] File Upload Handling
