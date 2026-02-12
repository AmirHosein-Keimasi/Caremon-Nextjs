"use client";

import { useEffect, useState, useCallback } from "react";
import Cookies from "js-cookie";

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // تابع بهینه‌شده برای بررسی توکن
  const verifyToken = useCallback(() => {
    setIsLoading(true);
    const authToken = Cookies.get("token");

    if (authToken !== token) {
      setToken(authToken || null);
      setIsLoggedIn(!!authToken);
    }

    setIsLoading(false);
  }, [token]);

  useEffect(() => {
    // بررسی اولیه بلافاصله پس از mount
    verifyToken();

    // پولینگ هر 1 ثانیه برای تغییرات (اختیاری)
    const interval = setInterval(verifyToken, 1000);
    return () => clearInterval(interval);
  }, [verifyToken]);

  return {
    isLoggedIn,
    token,
    isLoading,
  };
};

export default useAuth;
