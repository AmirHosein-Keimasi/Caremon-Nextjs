'use client';

/**
 * API Hooks - React hooks for API consumption
 * هوک‌های React برای مصرف API با مدیریت state، loading، error
 */

import { useCallback, useRef, useState } from 'react';
import { apiClient } from '@/lib/api-client';
import { isApiException, type ApiException } from '@/lib/exceptions';
import type { AxiosRequestConfig } from 'axios';

/**
 * Hook for API queries (GET requests)
 * برای درخواست‌های GET و دریافت داده
 */
export function useApi<T>(
  url: string,
  options?: AxiosRequestConfig,
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiException | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetch = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      abortControllerRef.current = new AbortController();

      const response = await apiClient.get<T>(url, {
        ...options,
        signal: abortControllerRef.current.signal,
      });

      setData(response.data as T);
      return response.data as T;
    } catch (err) {
      const apiError = isApiException(err) ? err : new Error(String(err)) as unknown as ApiException;
      setError(apiError as ApiException);
      throw apiError;
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  const cancel = useCallback(() => {
    abortControllerRef.current?.abort();
  }, []);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return { data, loading, error, fetch, cancel, reset };
}

/**
 * Hook for API mutations (POST, PUT, DELETE requests)
 * برای درخواست‌های تغیییری (POST، PUT، DELETE)
 */
export function useMutation<TData, TResponse>(
  method: 'post' | 'put' | 'delete' | 'patch',
  url?: string,
  options?: AxiosRequestConfig,
) {
  const [data, setData] = useState<TResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiException | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const mutate = useCallback(
    async (payload?: TData, customUrl?: string, customOptions?: AxiosRequestConfig) => {
      try {
        setLoading(true);
        setError(null);

        abortControllerRef.current = new AbortController();

        const finalUrl = customUrl || url;
        if (!finalUrl) {
          throw new Error('URL must be provided to useMutation');
        }

        const finalOptions = { ...options, ...customOptions };
        
        let response;
        if (method === 'delete') {
          response = await apiClient[method]<TResponse>(finalUrl, finalOptions);
        } else {
          response = await apiClient[method]<TResponse>(finalUrl, payload, finalOptions);
        }

        setData(response.data as TResponse);
        return response.data as TResponse;
      } catch (err) {
        const apiError = isApiException(err) ? err : (new Error(String(err)) as unknown as ApiException);
        setError(apiError as ApiException);
        throw apiError;
      } finally {
        setLoading(false);
      }
    },
    [url, method, options],
  );

  const cancel = useCallback(() => {
    abortControllerRef.current?.abort();
  }, []);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return { data, loading, error, mutate, cancel, reset };
}

/**
 * Hook for POST requests
 */
export function usePost<TData, TResponse>(
  url: string,
  options?: AxiosRequestConfig,
) {
  return useMutation<TData, TResponse>('post', url, options);
}

/**
 * Hook for PUT requests
 */
export function usePut<TData, TResponse>(
  url: string,
  options?: AxiosRequestConfig,
) {
  return useMutation<TData, TResponse>('put', url, options);
}

/**
 * Hook for DELETE requests
 */
export function useDelete<TResponse>(
  url: string,
  options?: AxiosRequestConfig,
) {
  return useMutation<void, TResponse>('delete', url, options);
}

/**
 * Hook for PATCH requests
 */
export function usePatch<TData, TResponse>(
  url: string,
  options?: AxiosRequestConfig,
) {
  return useMutation<TData, TResponse>('patch', url, options);
}
