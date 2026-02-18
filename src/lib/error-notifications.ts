"use client";

/**
 * Error Notification System
 * سیستم اعلان خطاهای API
 */

import { useCallback } from "react";
import { toast } from "sonner";
import { isApiException, ApiErrorCode } from "@/lib/exceptions";
import type { ApiException } from "@/lib/exceptions";

/**
 * Get user-friendly error message
 */
function getErrorMessage(error: ApiException): string {
  switch (error.code) {
    case ApiErrorCode.NETWORK_ERROR:
      return "خطای شبکه - اتصال انترنت را بررسی کنید";
    case ApiErrorCode.TIMEOUT:
      return "درخواست منقضی شد - دوباره تلاش کنید";
    case ApiErrorCode.UNAUTHORIZED:
      return "احراز هویت ناموفق";
    case ApiErrorCode.FORBIDDEN:
      return "دسترسی رد شد";
    case ApiErrorCode.TOKEN_EXPIRED:
      return "جلسه شما منقضی شده است";
    case ApiErrorCode.SESSION_EXPIRED:
      return "جلسه شما به پایان رسیده است";
    case ApiErrorCode.VALIDATION_ERROR:
      return "داده‌های ارسالی نامعتبر است";
    case ApiErrorCode.NOT_FOUND:
      return "منبع درخواستی یافت نشد";
    case ApiErrorCode.CONFLICT:
      return "تضادی در درخواست";
    case ApiErrorCode.INTERNAL_SERVER_ERROR:
      return "خطای سرور - بعداً تلاش کنید";
    case ApiErrorCode.SERVICE_UNAVAILABLE:
      return "سرویس در دسترس نیست";
    case ApiErrorCode.RETRY_EXHAUSTED:
      return "تلاش‌های مجدد تمام شد";
    default:
      return error.message || "خطایی پیش آمد";
  }
}

/**
 * Show error notification
 */
export function showErrorNotification(error: unknown): void {
  if (!isApiException(error)) {
    toast.error("خطایی پیش آمد");
    return;
  }

  const message = getErrorMessage(error);
  toast.error(message, {
    position: "top-right",
    duration: 5000,
  });
}

/**
 * Show success notification
 */
export function showSuccessNotification(message: string): void {
  toast.success(message, {
    position: "top-right",
    duration: 3000,
  });
}

/**
 * Show info notification
 */
export function showInfoNotification(message: string): void {
  toast.info(message, {
    position: "top-right",
    duration: 4000,
  });
}

/**
 * Show warning notification
 */
export function showWarningNotification(message: string): void {
  toast.warning(message, {
    position: "top-right",
    duration: 4000,
  });
}

/**
 * Hook for error handling
 */
export function useErrorHandler() {
  const handleError = useCallback((error: unknown, showNotification = true) => {
    if (isApiException(error)) {
      console.error("[API Error]", error.code, error.message, error.details);
      if (showNotification) {
        showErrorNotification(error);
      }
    } else if (error instanceof Error) {
      console.error("[Error]", error.message);
      if (showNotification) {
        toast.error(error.message);
      }
    } else {
      console.error("[Unknown Error]", error);
      if (showNotification) {
        toast.error("خطایی پیش آمد");
      }
    }
  }, []);

  return { handleError };
}
