"use client";

import { useEffect, useState, useCallback } from "react";
import Cookies from "js-cookie";

const AUTH_CHANGE_EVENT = "auth-change";
const AUTH_COOKIE_NAMES = ["token", "caremon_token"];

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const readToken = useCallback((): string | null => {
    for (const name of AUTH_COOKIE_NAMES) {
      const value = Cookies.get(name);
      if (value) return value;
    }
    return null;
  }, []);

  // ØªØ§Ø¨Ø¹ Ø¨Ù‡ÛŒÙ†Ù‡â€ŒØ´Ø¯Ù‡ Ø¨Ø±Ø§ÛŒ Ø¨Ø±Ø±Ø³ÛŒ ØªÙˆÚ©Ù†
  const verifyToken = useCallback(() => {
    setIsLoading(true);
    const authToken = readToken();

    if (authToken !== token) {
      setToken(authToken);
      setIsLoggedIn(!!authToken);
    }

    setIsLoading(false);
  }, [token, readToken]);

  useEffect(() => {
    // Ø¨Ø±Ø±Ø³ÛŒ Ø§ÙˆÙ„ÛŒÙ‡ Ø¨Ù„Ø§ÙØ§ØµÙ„Ù‡ Ù¾Ø³ Ø§Ø² mount
    verifyToken();

    const handleAuthChange = () => verifyToken();
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        verifyToken();
      }
    };

    window.addEventListener("focus", handleAuthChange);
    window.addEventListener(
      AUTH_CHANGE_EVENT,
      handleAuthChange as EventListener,
    );
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("focus", handleAuthChange);
      window.removeEventListener(
        AUTH_CHANGE_EVENT,
        handleAuthChange as EventListener,
      );
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [verifyToken]);

  return {
    isLoggedIn,
    token,
    isLoading,
  };
};

export default useAuth;
