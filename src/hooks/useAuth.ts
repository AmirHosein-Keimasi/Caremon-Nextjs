"use client";

/**
 * Authentication API Client
 * مثال عملی برای استفاده از سیستم Axios Interceptor
 */

import { usePost } from "@/hooks/useApi";
import { tokenUtils } from "@/lib/api-client";
import {
  showSuccessNotification,
  useErrorHandler,
} from "@/lib/error-notifications";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import type { AuthUser, TokenRefreshResponse } from "@/types/api.types";

/**
 * Sign Up Hook
 */
export function useSignUp() {
  const { mutate, loading } = usePost<SignUpData, SignUpResponse>(
    "/api/auth/signup",
  );
  const { handleError } = useErrorHandler();

  const signUp = useCallback(
    async (email: string, username: string, password: string, name: string) => {
      try {
        const response = await mutate({ email, username, password, name });
        showSuccessNotification("ثبت‌نام موفق بود");
        return response;
      } catch (error) {
        handleError(error);
        throw error;
      }
    },
    [mutate, handleError],
  );

  return { signUp, loading };
}

/**
 * Sign In Hook
 */
export function useSignIn() {
  const { mutate, loading } = usePost<SignInData, SignInResponse>(
    "/api/auth/signin",
  );
  const { handleError } = useErrorHandler();

  const signIn = useCallback(
    async (email: string, password: string) => {
      try {
        const response = await mutate({ email, password });

        // Store tokens
        tokenUtils.setToken(response.accessToken, response.expiresIn);
        // Note: setRefreshToken can be added to tokenUtils when needed

        showSuccessNotification("خوش آمدید");
        return response;
      } catch (error) {
        handleError(error);
        throw error;
      }
    },
    [mutate, handleError],
  );

  return { signIn, loading };
}

/**
 * Sign Out Hook
 */
export function useSignOut() {
  const router = useRouter();
  const { mutate: logout, loading } = usePost("/api/auth/logout");
  const { handleError } = useErrorHandler();

  const signOut = useCallback(async () => {
    try {
      await logout();
      tokenUtils.removeToken();
      showSuccessNotification("خروج موفق");
      router.push("/auth/signin");
    } catch (error) {
      // Even if logout fails on server, clear client tokens
      tokenUtils.removeToken();
      handleError(error, false); // Don't show error toast for logout
      router.push("/auth/signin");
    }
  }, [logout, router, handleError]);

  return { signOut, loading };
}

/**
 * Check Auth Status Hook
 */
export function useCheckAuth() {
  const {
    data: user,
    loading,
    mutate: checkAuthMutation,
  } = usePost<void, AuthUser>("/api/auth/me");

  const checkAuth = useCallback(async () => {
    try {
      const userData = await checkAuthMutation();
      return userData;
    } catch {
      tokenUtils.removeToken();
      return null;
    }
  }, [checkAuthMutation]);

  return { user, loading, checkAuth };
}

// Types
interface SignUpData {
  email: string;
  username: string;
  password: string;
  name: string;
}

interface SignUpResponse {
  id: string;
  email: string;
  username: string;
  name: string;
}

interface SignInData {
  email: string;
  password: string;
}

interface SignInResponse extends TokenRefreshResponse {
  user: AuthUser;
}
