/**
 * API Response Types
 * تمام تایپ‌های API در اینجا تعریف می‌شوند
 */

// Generic API Response wrapper
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: ApiError;
  message?: string;
  timestamp?: string;
}

// API Error structure
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
  statusCode: number;
}

// Pagination wrapper
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// Request configuration with retry
export interface ApiRequestConfig {
  timeout?: number;
  retryAttempts?: number;
  retryDelay?: number;
  excludeFromAuth?: boolean;
  showErrorToast?: boolean;
}

// Token refresh response
export interface TokenRefreshResponse {
  accessToken: string;
  refreshToken?: string;
  expiresIn: number;
}

// Auth user response
export interface AuthUser {
  id: string;
  name: string;
  email: string;
  username: string;
  role?: string;
}

// Car data type
export interface Car {
  id: string;
  name: string;
  model: string;
  img: string;
  location: string;
  reviewCount: number;
  ratingNumber: number;
  withDriver: string;
  rental: unknown; // JSON type from DB
  capacity: unknown;
  features: unknown;
  engine: unknown;
  driverRental: unknown;
}

// Reservation type
export interface Reservation {
  id: string;
  carId: string;
  carName: string;
  name: string;
  phone: string;
  email: string;
  startDate: string;
  endDate: string;
  createdAt: string;
}
