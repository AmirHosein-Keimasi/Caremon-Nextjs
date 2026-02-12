/**
 * Axios Instance Configuration with Interceptors
 * تنظیم و کانفیگ Axios با Interceptor ها برای مدیریت درخواست‌ها و خطاها
 */

import axios from "axios";
import type { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
import {
  AuthenticationException,
  TimeoutException,
  NetworkException,
  createExceptionFromStatusCode,
  ApiErrorCode,
} from "./exceptions";

// API Base URL
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

// Token cookie names
const TOKEN_COOKIE_NAME = "caremon_token";
const REFRESH_TOKEN_COOKIE_NAME = "caremon_refresh_token";

// Type for request metadata
interface RequestMetadata {
  retryCount: number;
  startTime: number;
}

// Type for error response
interface ErrorResponse {
  code?: string;
  message?: string;
  details?: Record<string, unknown>;
  statusCode?: number;
}

/**
 * Create and configure Axios instance with interceptors
 */
export function createAxiosInstance(): AxiosInstance {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 30000,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    withCredentials: true,
  });

  // Store request metadata for retry logic
  const requestMetadata = new WeakMap<
    InternalAxiosRequestConfig,
    RequestMetadata
  >();

  /**
   * REQUEST INTERCEPTOR - افزودن توکن و هدرهای اضافی
   */
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // Initialize metadata
      requestMetadata.set(config, {
        retryCount: 0,
        startTime: Date.now(),
      });

      // Add auth token
      const token = Cookies.get(TOKEN_COOKIE_NAME);
      if (token && !config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      // Add custom headers
      config.headers["X-Client-Version"] = "1.0.0";
      config.headers["X-Requested-With"] = "XMLHttpRequest";

      if (process.env.NODE_ENV === "development") {
        console.debug(
          `[API Request] ${config.method?.toUpperCase()} ${config.url}`,
          config,
        );
      }

      return config;
    },
    (error: unknown) => {
      console.error("[Request Interceptor Error]", error);
      return Promise.reject(new NetworkException("خطا در درخواست"));
    },
  );

  /**
   * RESPONSE INTERCEPTOR - پردازش پاسخ‌ها
   */
  instance.interceptors.response.use(
    (response) => {
      const metadata = requestMetadata.get(response.config);
      const elapsed = metadata ? Date.now() - metadata.startTime : 0;

      if (process.env.NODE_ENV === "development") {
        console.debug(
          `[API Response] ${response.status} ${response.config.method?.toUpperCase()} ${response.config.url} (${elapsed}ms)`,
          response.data,
        );
      }

      // Handle wrapped API responses
      if (response.data?.success !== undefined) {
        if (!response.data.success) {
          const error = response.data.error as ErrorResponse | undefined;
          return Promise.reject(
            createExceptionFromStatusCode(
              error?.statusCode || 400,
              error?.message || "خطای نامشخص",
              error?.details,
            ),
          );
        }
      }

      return response.data;
    },
    async (error: unknown) => {
      if (!axios.isAxiosError(error)) {
        return Promise.reject(new NetworkException("خطای نامشخص"));
      }

      const { config, response } = error;
      const metadata = config ? requestMetadata.get(config) : undefined;
      const retryCount = metadata?.retryCount ?? 0;

      if (process.env.NODE_ENV === "development") {
        console.error(
          `[API Error] ${response?.status} ${config?.method?.toUpperCase()} ${config?.url}`,
          error.message,
        );
      }

      // No network response
      if (!response) {
        if (error.code === "ECONNABORTED") {
          return Promise.reject(new TimeoutException());
        }
        return Promise.reject(new NetworkException(error.message));
      }

      const { status, data } = response;
      const errorData = data as ErrorResponse | undefined;

      // Handle 401 Unauthorized
      if (status === 401) {
        const errorCode = errorData?.code as string | undefined;

        // Try refresh token
        if (
          errorCode === ApiErrorCode.TOKEN_EXPIRED ||
          errorCode === "TOKEN_EXPIRED"
        ) {
          if (retryCount < 1 && config) {
            try {
              const refreshed = await refreshAccessToken();
              if (refreshed) {
                // Retry original request
                const newToken = Cookies.get(TOKEN_COOKIE_NAME);
                if (newToken) {
                  config.headers.Authorization = `Bearer ${newToken}`;
                  return instance.request(config);
                }
              }
            } catch {
              // Refresh failed
              handleAuthenticationFailure();
              return Promise.reject(
                new AuthenticationException(
                  ApiErrorCode.SESSION_EXPIRED,
                  "جلسه شما منقضی شده است",
                ),
              );
            }
          }
        }

        handleAuthenticationFailure();
        return Promise.reject(
          new AuthenticationException(
            ApiErrorCode.UNAUTHORIZED,
            errorData?.message || "احراز هویت ناموفق",
          ),
        );
      }

      // Retry for 5xx and 429 errors
      if ((status >= 500 || status === 429) && retryCount < 3 && config) {
        const delay = Math.min(1000 * Math.pow(2, retryCount), 10000);
        console.warn(`[API Retry] Attempt ${retryCount + 1} after ${delay}ms`);

        await new Promise((resolve) => setTimeout(resolve, delay));

        if (metadata) {
          metadata.retryCount += 1;
        }
        return instance.request(config);
      }

      // Return standardized exception
      return Promise.reject(
        createExceptionFromStatusCode(
          status,
          errorData?.message || error.message || "خطای نامشخص",
          errorData?.details,
        ),
      );
    },
  );

  return instance;
}

/**
 * Attempt to refresh access token
 */
async function refreshAccessToken(): Promise<boolean> {
  try {
    const refreshToken = Cookies.get(REFRESH_TOKEN_COOKIE_NAME);
    if (!refreshToken) {
      return false;
    }

    const response = await axios.post(
      `${API_BASE_URL}/auth/refresh`,
      { refreshToken },
      { timeout: 5000 },
    );

    const { accessToken, refreshToken: newRefreshToken } = response.data;

    if (accessToken) {
      Cookies.set(TOKEN_COOKIE_NAME, accessToken, {
        secure: true,
        sameSite: "lax",
        expires: 3,
      });

      if (newRefreshToken) {
        Cookies.set(REFRESH_TOKEN_COOKIE_NAME, newRefreshToken, {
          secure: true,
          sameSite: "lax",
          expires: 7,
        });
      }

      return true;
    }

    return false;
  } catch (error) {
    console.error("[Token Refresh Failed]", error);
    return false;
  }
}

/**
 * Handle authentication failure - redirect to login
 */
function handleAuthenticationFailure(): void {
  // Clear tokens
  Cookies.remove(TOKEN_COOKIE_NAME);
  Cookies.remove(REFRESH_TOKEN_COOKIE_NAME);

  // Redirect to login (if not already there)
  if (
    typeof window !== "undefined" &&
    !window.location.pathname.includes("/auth/signin")
  ) {
    window.location.href = `/auth/signin?redirect=${encodeURIComponent(window.location.pathname)}`;
  }
}

// Create default instance
export const apiClient = createAxiosInstance();

/**
 * Export token utilities
 */
export const tokenUtils = {
  getToken: () => Cookies.get(TOKEN_COOKIE_NAME),
  setToken: (token: string, expiresIn?: number) => {
    Cookies.set(TOKEN_COOKIE_NAME, token, {
      secure: true,
      sameSite: "lax",
      expires: expiresIn ? expiresIn / (24 * 60 * 60) : 3, // Convert seconds to days
    });
  },
  removeToken: () => Cookies.remove(TOKEN_COOKIE_NAME),
  hasToken: () => !!Cookies.get(TOKEN_COOKIE_NAME),
};
