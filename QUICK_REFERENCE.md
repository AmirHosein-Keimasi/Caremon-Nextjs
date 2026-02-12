# 🎯 Quick Reference Card

## 📁 Files at a Glance

### Stores

```typescript
// src/store/cartStore.ts
useCartStore() → items, totalPrice, totalItems, addToCart, removeFromCart, clearCart

// src/store/reservationStore.ts
useReservationStore() → reservations, createReservation, updateStatus, cancelReservation

// src/store/dashboardStore.ts
useDashboardStore() → stats, refreshStats
```

### Components

```typescript
// src/components/ShoppingCart/ShoppingCart.tsx
<ShoppingCart /> → Full cart display + checkout

// src/components/Invoice/Invoice.tsx
<Invoice reservation={res} /> → Invoice display + print

// src/components/ReservationOptions/ReservationOptions.tsx
<ReservationOptions car={car} onSuccess={() => {}} /> → Date/location/options selection
```

### Hooks

```typescript
// src/hooks/useAddToCart.ts
const { addItem } = useAddToCart()
addItem({ car, startDate, endDate, pickupLocation, dropoffLocation, pricePerDay, ... })
```

---

## 🚀 Common Tasks

### Add Item to Cart

```typescript
import { useAddToCart } from "@/hooks/useAddToCart";

const { addItem } = useAddToCart();

addItem({
  car: carData,
  startDate: "2026-02-15",
  endDate: "2026-02-20",
  pickupLocation: "تهران-مرکز",
  dropoffLocation: "تهران-فرودگاه",
  pricePerDay: 500000,
});
```

### Access Cart

```typescript
import { useCartStore } from "@/store/cartStore";

const { items, totalPrice, totalItems } = useCartStore();
```

### Create Reservation

```typescript
import { useReservationStore } from "@/store/reservationStore";

const { createReservation } = useReservationStore();

const id = createReservation({
  userId: "user123",
  items: cartItems,
  status: ReservationStatus.PENDING,
  totalPrice: 5000000,
  // ... other fields
});
```

### Show Invoice

```typescript
import Invoice from '@/components/Invoice/Invoice';

<Invoice reservation={reservation} showPrintButton={true} />
```

### Get Dashboard Stats

```typescript
import { useDashboardStore } from "@/store/dashboardStore";

const { stats, refreshStats } = useDashboardStore();

useEffect(() => {
  refreshStats("userId");
}, []);

// Access: stats.totalRevenue, stats.activeReservations, etc
```

---

## 🎨 Styling Classes

### Available CSS Modules

```
ShoppingCart.module.css
├─ .cartContainer
├─ .cartItem
├─ .cartSummary
├─ .checkoutBtn
└─ ... (40+ classes)

Invoice.module.css
├─ .invoiceContainer
├─ .header
├─ .itemsTable
├─ .summary
└─ ... (50+ classes)

ReservationOptions.module.css
├─ .reservationOptions
├─ .dateRow
├─ .locationRow
├─ .summary
└─ ... (35+ classes)

dashboard/page.module.css
├─ .dashboardPage
├─ .statsGrid
├─ .tabs
├─ .table
└─ ... (60+ classes)
```

---

## 💾 LocalStorage Keys

```javascript
// Cart data (auto-saved)
localStorage.getItem("caremon-cart");

// Reservations (auto-saved)
localStorage.getItem("caremon-reservations");

// Clear all
localStorage.clear();
```

---

## 🔄 Data Models

### CartItem

```typescript
{
  id: string;
  car: CarsModel;
  rentalDays: number;
  startDate: string;
  endDate: string;
  pickupLocation: string;
  dropoffLocation: string;
  withDriver: boolean;
  driverDays?: number;
  selectedOptions: string[];
  pricePerDay: number;
  totalPrice: number;
  quantity: number;
  addedAt: number;
}
```

### Reservation

```typescript
{
  id: string;
  userId: string;
  items: CartItem[];
  status: 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled';
  totalPrice: number;
  totalItems: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  createdAt: number;
  reservationStartDate: string;
  reservationEndDate: string;
  paymentStatus: 'pending' | 'completed' | 'failed';
  paidAmount: number;
}
```

---

## 📊 Store Methods

### cartStore

```typescript
addToCart(item: CartItem)
removeFromCart(id: string)
updateQuantity(id: string, qty: number)
updateCartItem(id: string, updates: Partial<CartItem>)
clearCart()
getCartItem(id: string) → CartItem | undefined
getTotal() → number
getItemCount() → number
```

### reservationStore

```typescript
createReservation(data) → id: string
updateReservation(id, updates)
deleteReservation(id)
getReservation(id) → Reservation | undefined
getReservationsByUserId(userId) → Reservation[]
getReservationsByStatus(status) → Reservation[]
updatePaymentStatus(id, status, amount)
updateStatus(id, status)
cancelReservation(id, reason)
setCurrentReservation(res)
```

### dashboardStore

```typescript
refreshStats(userId?: string)
getStats() → DashboardStats
```

---

## 🛠️ TypeScript Imports

```typescript
// Stores
import { useCartStore, CartItem } from "@/store/cartStore";
import {
  useReservationStore,
  Reservation,
  ReservationStatus,
} from "@/store/reservationStore";
import { useDashboardStore, DashboardStats } from "@/store/dashboardStore";

// Components
import ShoppingCart from "@/components/ShoppingCart/ShoppingCart";
import Invoice from "@/components/Invoice/Invoice";
import ReservationOptions from "@/components/ReservationOptions/ReservationOptions";

// Hooks
import { useAddToCart } from "@/hooks/useAddToCart";

// Models
import { CarsModel } from "@/models/cars.model";

// Notifications
import {
  showSuccessNotification,
  showErrorNotification,
} from "@/lib/error-notifications";
```

---

## 📱 Component Props

### ShoppingCart

No props required (uses Zustand directly)

### Invoice

```typescript
interface InvoiceProps {
  reservation: Reservation;
  showPrintButton?: boolean; // default: true
}
```

### ReservationOptions

```typescript
interface ReservationOptionsProps {
  car: CarsModel;
  onSuccess?: () => void;
}
```

---

## 🎯 Integration Steps

1. **Update layout.tsx**

   ```tsx
   import { ErrorBoundary } from "@/components/ErrorBoundary";
   import { ToastContainer } from "react-toastify";
   // Wrap children with ErrorBoundary
   // Add ToastContainer
   ```

2. **Create cart page** (`src/app/cart/page.tsx`)

   ```tsx
   import ShoppingCart from "@/components/ShoppingCart/ShoppingCart";
   export default () => <ShoppingCart />;
   ```

3. **Add to car pages**

   ```tsx
   import ReservationOptions from "@/components/ReservationOptions/ReservationOptions";
   export default ({ car }) => <ReservationOptions car={car} />;
   ```

4. **Use in dashboard**
   ```tsx
   // Already enhanced in dashboard/page.tsx
   ```

---

## 🔗 Links & References

### Documentation

- 📖 `SHOPPING_CART_SYSTEM.md` - Complete guide
- 📖 `ARCHITECTURE.md` - System design
- 📖 `INTEGRATION_GUIDE.md` - Setup guide
- 📖 `CHANGELOG.md` - What changed
- 📖 `PROJECT_SUMMARY.md` - Overview

### External

- 🔗 Zustand Docs: https://github.com/pmndrs/zustand
- 🔗 React Docs: https://react.dev
- 🔗 Next.js Docs: https://nextjs.org/docs

---

## ⚡ Performance Tips

```typescript
// Selector to prevent unnecessary re-renders
const items = useCartStore((state) => state.items);
const totalPrice = useCartStore((state) => state.totalPrice);

// Instead of:
const { items, totalPrice } = useCartStore();
```

---

## 🐛 Debug Tips

```javascript
// View full cart state
console.log(useCartStore.getState());

// View full reservations
console.log(useReservationStore.getState());

// View dashboard stats
console.log(useDashboardStore.getState());

// Watch store changes
useCartStore.subscribe(
  (state) => state.items,
  (items) => console.log("Cart items changed:", items),
);
```

---

## 📞 Error Messages

### Common Validation Errors

- "تاریخ پایان باید بعد از تاریخ شروع باشد" → Invalid date range
- "مدت اجاره باید حداقل 1 روز باشد" → Minimum 1 day
- "سبد خرید خالی است" → Empty cart
- "لطفا تمام فیلدها را پر کنید" → Missing fields

---

## ✅ Verification Checklist

```
Before deploying:
☐ Update layout.tsx with ErrorBoundary
☐ Create cart page
☐ Add ReservationOptions to car pages
☐ Update navigation links
☐ Test add to cart flow
☐ Test checkout flow
☐ Check localStorage persistence
☐ Test on mobile
☐ Test print invoice
☐ Test all notifications
```

---

**All files ready to use! Start integrating now!** 🚀

**Questions?** Check the documentation files or read the code comments!
