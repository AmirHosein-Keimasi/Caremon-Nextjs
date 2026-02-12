"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useCartStore, CartItem } from "@/store/cartStore";
import {
  useReservationStore,
  ReservationStatus,
} from "@/store/reservationStore";
import {
  showSuccessNotification,
  showErrorNotification,
} from "@/lib/error-notifications";
import { useRouter } from "next/navigation";
import styles from "./ShoppingCart.module.css";

interface CheckoutData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

/**
 * Shopping Cart Component
 * کامپوننت سبد خرید
 */
export default function ShoppingCart() {
  const router = useRouter();
  const {
    items,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalPrice,
    totalItems,
  } = useCartStore();
  const { createReservation } = useReservationStore();

  const [showCheckout, setShowCheckout] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkoutData, setCheckoutData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const handleRemoveItem = (itemId: string) => {
    removeFromCart(itemId);
    showSuccessNotification("محصول از سبد خرید حذف شد");
  };

  const handleQuantityChange = (itemId: string, quantity: number) => {
    if (quantity > 0) {
      updateQuantity(itemId, quantity);
    }
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (items.length === 0) {
        showErrorNotification("سبد خرید خالی است");
        return;
      }

      // Validate form
      if (
        !checkoutData.firstName ||
        !checkoutData.lastName ||
        !checkoutData.email ||
        !checkoutData.phone
      ) {
        showErrorNotification("لطفا تمام فیلدها را پر کنید");
        return;
      }

      // Create reservation
      const reservationId = createReservation({
        userId: "current-user-id", // TODO: Get from auth
        items,
        status: ReservationStatus.PENDING,
        totalPrice,
        totalItems,
        firstName: checkoutData.firstName,
        lastName: checkoutData.lastName,
        email: checkoutData.email,
        phone: checkoutData.phone,
        reservationStartDate: items[0]?.startDate || "",
        reservationEndDate: items[0]?.endDate || "",
        paymentStatus: "pending",
        paidAmount: 0,
      });

      showSuccessNotification("رزرو با موفقیت ایجاد شد");
      clearCart();
      setCheckoutData({ firstName: "", lastName: "", email: "", phone: "" });
      setShowCheckout(false);

      // Redirect to reservation details
      router.push(`/reservations/${reservationId}`);
    } catch (error) {
      showErrorNotification("خطا در ایجاد رزرو");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className={styles.emptyCart}>
        <p>سبد خرید خالی است</p>
        <button
          onClick={() => router.push("/search")}
          className={styles.continueShoppingBtn}
        >
          ادامه خرید
        </button>
      </div>
    );
  }

  return (
    <div className={styles.cartContainer}>
      <h2>سبد خرید ({totalItems})</h2>

      <div className={styles.cartItems}>
        {items.map((item) => (
          <CartItemRow
            key={item.id}
            item={item}
            onRemove={handleRemoveItem}
            onQuantityChange={handleQuantityChange}
          />
        ))}
      </div>

      <div className={styles.cartSummary}>
        <div className={styles.summaryRow}>
          <span>تعداد محصولات:</span>
          <span>{totalItems}</span>
        </div>
        <div className={styles.summaryRow}>
          <span>روزهای اجاره:</span>
          <span>{items[0]?.rentalDays || 0}</span>
        </div>
        <div className={styles.summaryRow + " " + styles.totalRow}>
          <span>مجموع:</span>
          <span>{totalPrice.toLocaleString("fa-IR")} تومان</span>
        </div>
      </div>

      {showCheckout ? (
        <CheckoutForm
          data={checkoutData}
          onChange={setCheckoutData}
          onSubmit={handleCheckout}
          loading={loading}
          onCancel={() => setShowCheckout(false)}
        />
      ) : (
        <div className={styles.cartActions}>
          <button
            onClick={() => router.push("/search")}
            className={styles.continueShoppingBtn}
          >
            ادامه خرید
          </button>
          <button
            onClick={() => setShowCheckout(true)}
            className={styles.checkoutBtn}
          >
            تکمیل سفارش
          </button>
          <button onClick={() => clearCart()} className={styles.clearCartBtn}>
            حذف سبد
          </button>
        </div>
      )}
    </div>
  );
}

/**
 * Cart Item Row Component
 */
function CartItemRow({
  item,
  onRemove,
  onQuantityChange,
}: {
  item: CartItem;
  onRemove: (itemId: string) => void;
  onQuantityChange: (itemId: string, quantity: number) => void;
}) {
  return (
    <div className={styles.cartItem}>
      <div className={styles.itemImage}>
        <Image
          src={item.car.img}
          alt={item.car.name}
          width={150}
          height={100}
        />
      </div>

      <div className={styles.itemDetails}>
        <h3>{item.car.name}</h3>
        <p className={styles.model}>{item.car.model}</p>
        <div className={styles.dates}>
          <span>{new Date(item.startDate).toLocaleDateString("fa-IR")}</span>
          <span>تا</span>
          <span>{new Date(item.endDate).toLocaleDateString("fa-IR")}</span>
        </div>
        {item.withDriver && (
          <span className={styles.driverBadge}>راننده شامل</span>
        )}
        {item.selectedOptions.length > 0 && (
          <div className={styles.options}>
            <span>اپشن‌ها:</span>
            {item.selectedOptions.map((opt) => (
              <span key={opt} className={styles.option}>
                {opt}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className={styles.itemPrice}>
        <div className={styles.priceRow}>
          <span>قیمت روزانه:</span>
          <span>{item.pricePerDay.toLocaleString("fa-IR")} تومان</span>
        </div>
        <div className={styles.priceRow}>
          <span>روزها:</span>
          <span>{item.rentalDays}</span>
        </div>
        <div className={styles.priceRow + " " + styles.total}>
          <span>مجموع:</span>
          <span>{item.totalPrice.toLocaleString("fa-IR")} تومان</span>
        </div>
      </div>

      <div className={styles.itemQuantity}>
        <button onClick={() => onQuantityChange(item.id, item.quantity - 1)}>
          -
        </button>
        <input
          type="number"
          min="1"
          value={item.quantity}
          onChange={(e) => onQuantityChange(item.id, parseInt(e.target.value))}
        />
        <button onClick={() => onQuantityChange(item.id, item.quantity + 1)}>
          +
        </button>
      </div>

      <button className={styles.removeBtn} onClick={() => onRemove(item.id)}>
        ✕
      </button>
    </div>
  );
}

/**
 * Checkout Form Component
 */
function CheckoutForm({
  data,
  onChange,
  onSubmit,
  loading,
  onCancel,
}: {
  data: CheckoutData;
  onChange: (data: CheckoutData) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  onCancel: () => void;
}) {
  return (
    <form onSubmit={onSubmit} className={styles.checkoutForm}>
      <h3>اطلاعات ثبت نام</h3>
      <div className={styles.formRow}>
        <input
          type="text"
          placeholder="نام"
          value={data.firstName}
          onChange={(e) => onChange({ ...data, firstName: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="نام خانوادگی"
          value={data.lastName}
          onChange={(e) => onChange({ ...data, lastName: e.target.value })}
          required
        />
      </div>
      <div className={styles.formRow}>
        <input
          type="email"
          placeholder="ایمیل"
          value={data.email}
          onChange={(e) => onChange({ ...data, email: e.target.value })}
          required
        />
        <input
          type="tel"
          placeholder="تلفن"
          value={data.phone}
          onChange={(e) => onChange({ ...data, phone: e.target.value })}
          required
        />
      </div>
      <div className={styles.formActions}>
        <button type="submit" disabled={loading} className={styles.submitBtn}>
          {loading ? "در حال پردازش..." : "تایید و پرداخت"}
        </button>
        <button type="button" onClick={onCancel} className={styles.cancelBtn}>
          انصراف
        </button>
      </div>
    </form>
  );
}
