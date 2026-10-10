/**
 * Application error codes and AppError class.
 * Errors should never include user message content, SDP, or sensitive data.
 */

export type ErrorCode =
  | 'INTERNAL_ERROR'
  | 'INVALID_INPUT'
  | 'NOT_FOUND'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'RATE_LIMITED'
  | 'INVALID_PLAN'
  | 'BAD_SIGNATURE'
  | 'ALREADY_IN_QUEUE'
  | 'ROOM_NOT_FOUND'
  | 'SESSION_EXPIRED';

export class AppError extends Error {
  constructor(
    public readonly code: ErrorCode,
    public readonly statusCode: number,
    message?: string,
  ) {
    super(message ?? code);
    this.name = 'AppError';
  }
}

/**
 * Standard response envelope — all REST responses use this shape.
 */
export function ok<T>(data: T, requestId?: string) {
  return { success: true, data, requestId: requestId ?? null, error: null };
}

export function fail(code: ErrorCode, message: string, requestId?: string) {
  return { success: false, data: null, requestId: requestId ?? null, error: { code, message } };
}
