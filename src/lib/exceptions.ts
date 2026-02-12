/**
 * Custom Exception Classes
 * سیستم استثناپذیری سفارشی و تایپ‌شده
 */

export enum ApiErrorCode {
  // Network errors
  NETWORK_ERROR = 'NETWORK_ERROR',
  TIMEOUT = 'TIMEOUT',
  NO_INTERNET = 'NO_INTERNET',

  // Authentication errors
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  INVALID_TOKEN = 'INVALID_TOKEN',
  SESSION_EXPIRED = 'SESSION_EXPIRED',

  // Validation errors
  BAD_REQUEST = 'BAD_REQUEST',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  INVALID_INPUT = 'INVALID_INPUT',

  // Server errors
  NOT_FOUND = 'NOT_FOUND',
  CONFLICT = 'CONFLICT',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',

  // Custom errors
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
  RETRY_EXHAUSTED = 'RETRY_EXHAUSTED',
  OPERATION_CANCELLED = 'OPERATION_CANCELLED',
}

/**
 * Base API Exception
 */
export class ApiException extends Error {
  public readonly code: ApiErrorCode;
  public readonly statusCode: number;
  public readonly details?: Record<string, unknown>;
  public readonly isRetryable: boolean;

  constructor(
    code: ApiErrorCode,
    message: string,
    statusCode: number = 500,
    details?: Record<string, unknown>,
    isRetryable: boolean = false,
  ) {
    super(message);
    this.name = 'ApiException';
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;
    this.isRetryable = isRetryable;

    // Set prototype for instanceof checks
    Object.setPrototypeOf(this, ApiException.prototype);
  }
}

/**
 * Network Exception
 */
export class NetworkException extends ApiException {
  constructor(message: string = 'خطای شبکه', details?: Record<string, unknown>) {
    super(ApiErrorCode.NETWORK_ERROR, message, 0, details, true);
    this.name = 'NetworkException';
    Object.setPrototypeOf(this, NetworkException.prototype);
  }
}

/**
 * Timeout Exception
 */
export class TimeoutException extends ApiException {
  constructor(message: string = 'درخواست منقضی شد') {
    super(ApiErrorCode.TIMEOUT, message, 408, undefined, true);
    this.name = 'TimeoutException';
    Object.setPrototypeOf(this, TimeoutException.prototype);
  }
}

/**
 * Authentication Exception
 */
export class AuthenticationException extends ApiException {
  constructor(
    code: ApiErrorCode = ApiErrorCode.UNAUTHORIZED,
    message: string = 'احراز هویت ناموفق',
    details?: Record<string, unknown>,
  ) {
    super(code, message, 401, details, false);
    this.name = 'AuthenticationException';
    Object.setPrototypeOf(this, AuthenticationException.prototype);
  }
}

/**
 * Authorization Exception
 */
export class AuthorizationException extends ApiException {
  constructor(message: string = 'دسترسی رد شد') {
    super(ApiErrorCode.FORBIDDEN, message, 403, undefined, false);
    this.name = 'AuthorizationException';
    Object.setPrototypeOf(this, AuthorizationException.prototype);
  }
}

/**
 * Validation Exception
 */
export class ValidationException extends ApiException {
  constructor(message: string = 'داده‌های ارسالی نامعتبر', details?: Record<string, unknown>) {
    super(ApiErrorCode.VALIDATION_ERROR, message, 400, details, false);
    this.name = 'ValidationException';
    Object.setPrototypeOf(this, ValidationException.prototype);
  }
}

/**
 * Not Found Exception
 */
export class NotFoundException extends ApiException {
  constructor(message: string = 'منبع درخواستی یافت نشد') {
    super(ApiErrorCode.NOT_FOUND, message, 404, undefined, false);
    this.name = 'NotFoundException';
    Object.setPrototypeOf(this, NotFoundException.prototype);
  }
}

/**
 * Conflict Exception
 */
export class ConflictException extends ApiException {
  constructor(message: string = 'تضادی در درخواست', details?: Record<string, unknown>) {
    super(ApiErrorCode.CONFLICT, message, 409, details, false);
    this.name = 'ConflictException';
    Object.setPrototypeOf(this, ConflictException.prototype);
  }
}

/**
 * Server Exception
 */
export class ServerException extends ApiException {
  constructor(message: string = 'خطای سرور', details?: Record<string, unknown>) {
    super(ApiErrorCode.INTERNAL_SERVER_ERROR, message, 500, details, true);
    this.name = 'ServerException';
    Object.setPrototypeOf(this, ServerException.prototype);
  }
}

/**
 * Service Unavailable Exception
 */
export class ServiceUnavailableException extends ApiException {
  constructor(message: string = 'سرویس در دسترس نیست') {
    super(ApiErrorCode.SERVICE_UNAVAILABLE, message, 503, undefined, true);
    this.name = 'ServiceUnavailableException';
    Object.setPrototypeOf(this, ServiceUnavailableException.prototype);
  }
}

/**
 * Retry Exhausted Exception
 */
export class RetryExhaustedException extends ApiException {
  constructor(message: string = 'تلاش‌های مجدد تمام شد', originalError?: ApiException) {
    super(
      ApiErrorCode.RETRY_EXHAUSTED,
      message,
      originalError?.statusCode || 500,
      originalError?.details,
      false,
    );
    this.name = 'RetryExhaustedException';
    Object.setPrototypeOf(this, RetryExhaustedException.prototype);
  }
}

/**
 * Type guard for ApiException
 */
export function isApiException(error: unknown): error is ApiException {
  return error instanceof ApiException;
}

/**
 * Create exception from HTTP status code
 */
export function createExceptionFromStatusCode(
  statusCode: number,
  message: string,
  details?: Record<string, unknown>,
): ApiException {
  switch (statusCode) {
    case 400:
      return new ValidationException(message, details);
    case 401:
      return new AuthenticationException(ApiErrorCode.UNAUTHORIZED, message, details);
    case 403:
      return new AuthorizationException(message);
    case 404:
      return new NotFoundException(message);
    case 409:
      return new ConflictException(message, details);
    case 408:
      return new TimeoutException(message);
    case 500:
      return new ServerException(message, details);
    case 503:
      return new ServiceUnavailableException(message);
    default:
      return new ApiException(
        ApiErrorCode.UNKNOWN_ERROR,
        message,
        statusCode,
        details,
        statusCode >= 500, // Retryable if 5xx
      );
  }
}
