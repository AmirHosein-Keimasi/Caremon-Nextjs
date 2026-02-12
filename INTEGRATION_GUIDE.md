# 🚀 Quick Integration Guide

## Step 1: Update Layout (Global Error Handling)

Edit `src/app/layout.tsx` to add ErrorBoundary and ToastContainer:

```tsx
"use client";

import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa">
      <body>
        <ErrorBoundary>
          {children}
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={true}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </ErrorBoundary>
      </body>
    </html>
  );
}
```

---

## Step 2: Create Cart Page

Create `src/app/cart/page.tsx`:

```tsx
"use client";

import ShoppingCart from "@/components/ShoppingCart/ShoppingCart";

export default function CartPage() {
  return (
    <div>
      <ShoppingCart />
    </div>
  );
}
```

---

## Step 3: Add to Car Detail Pages

In any car detail/product page, import and use ReservationOptions:

```tsx
"use client";

import ReservationOptions from "@/components/ReservationOptions/ReservationOptions";
import { carData } from "@/db/cars";

export default function CarDetailPage() {
  const car = carData[0]; // Get from URL params or props

  return (
    <div>
      <h1>{car.name}</h1>
      <ReservationOptions car={car} />
    </div>
  );
}
```

---

## Step 4: Add Links to Navigation

Update your header/navigation to include links:

```tsx
<nav>
  <Link href="/dashboard">داشبورد</Link>
  <Link href="/cart">سبد خرید</Link>
  <Link href="/reservations">رزروها</Link>
</nav>
```

---

## Step 5: Test the Flow

1. Go to any car detail page
2. Fill in ReservationOptions form
3. Click "اضافه به سبد خرید" (Add to Cart)
4. Check localStorage to verify persistence
5. Go to `/cart` to see ShoppingCart component
6. Click "تکمیل سفارش" (Complete Order)
7. Check `/dashboard` to see the reservation

---

## File Checklist

- ✅ `src/store/cartStore.ts`
- ✅ `src/store/reservationStore.ts`
- ✅ `src/store/dashboardStore.ts`
- ✅ `src/hooks/useAddToCart.ts`
- ✅ `src/components/ShoppingCart/ShoppingCart.tsx`
- ✅ `src/components/ShoppingCart/ShoppingCart.module.css`
- ✅ `src/components/Invoice/Invoice.tsx`
- ✅ `src/components/Invoice/Invoice.module.css`
- ✅ `src/components/ReservationOptions/ReservationOptions.tsx`
- ✅ `src/components/ReservationOptions/ReservationOptions.module.css`
- ✅ `src/app/dashboard/page.tsx` (Updated)
- ✅ `src/app/dashboard/page.module.css`

---

## Environment Variables (Optional)

If you want to use API endpoints, add to `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

---

## Testing Tips

### Test Cart Persistence

```typescript
// In browser console
localStorage.getItem("caremon-cart");
// Should show JSON with items
```

### Test Store Access

```typescript
// Create a test component
import { useCartStore } from '@/store/cartStore';

export default function DebugCart() {
  const { items, totalPrice } = useCartStore();
  return <pre>{JSON.stringify({ items, totalPrice }, null, 2)}</pre>;
}
```

### Test Notifications

```typescript
import {
  showSuccessNotification,
  showErrorNotification,
} from "@/lib/error-notifications";

// Trigger success
showSuccessNotification("تست موفق!");

// Trigger error
showErrorNotification("تست خطا!");
```

---

## Common Issues & Solutions

### Issue: Cart not persisting

**Solution**: Check if localStorage is enabled in browser

### Issue: Styles not applying

**Solution**: Verify CSS modules are imported correctly (`.module.css` files)

### Issue: Notifications not showing

**Solution**: Ensure ErrorBoundary and ToastContainer are in layout.tsx

### Issue: Date picker not working

**Solution**: Use HTML5 date input (already configured)

---

## Performance Optimization

All stores use Zustand's built-in optimizations:

- Shallow compare by default
- Auto-subscriptions
- Minimal re-renders

---

## Future Enhancements

1. **Payment Integration**

   - Stripe/PayPal
   - Payment status updates

2. **Email Notifications**

   - Confirmation emails
   - Invoice PDFs

3. **Analytics**

   - Track cart abandonment
   - Popular cars/options

4. **Admin Dashboard**
   - Manage reservations
   - View all statistics
   - Export reports

---

**Status**: ✅ Ready to Integrate!
