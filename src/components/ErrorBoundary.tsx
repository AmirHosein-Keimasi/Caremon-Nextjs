"use client";

/**
 * Error Boundary Component
 * کامپوننت برای ثبت و نمایش خطاهای React
 */

import React, { type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { isApiException } from "@/lib/exceptions";
import type { ApiException } from "@/lib/exceptions";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: (error: Error, reset: () => void) => ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary for catching React errors
 */
export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("[ErrorBoundary] Caught error:", error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  reset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.reset);
      }

      return (
        <DefaultErrorFallback error={this.state.error} reset={this.reset} />
      );
    }

    return this.props.children;
  }
}

/**
 * Default error fallback UI
 */
function DefaultErrorFallback({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const isApi = isApiException(error);
  const apiError = isApi ? (error as ApiException) : null;

  return (
    <div className="flex h-screen items-center justify-center bg-red-50 p-4">
      <div className="w-full max-w-md rounded-lg border border-red-200 bg-white p-6 shadow-sm">
        <h2 className="mb-2 text-lg font-semibold text-red-900">خطا</h2>
        <p className="mb-4 text-sm text-red-700">
          {apiError?.message || error.message || "خطایی پیش آمد"}
        </p>
        {apiError?.details && Object.keys(apiError.details).length > 0 && (
          <div className="mb-4 rounded bg-red-100 p-3 text-xs text-red-800">
            <pre>{JSON.stringify(apiError.details, null, 2)}</pre>
          </div>
        )}
        <Button onClick={reset} variant="destructive" className="w-full">
          تلاش دوباره
        </Button>
      </div>
    </div>
  );
}
