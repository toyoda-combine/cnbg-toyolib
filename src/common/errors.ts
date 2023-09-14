/**
 * Base class for all errors.
 * @public
 */
export class BaseError extends Error {
  /**
   * The cause of the error.
   */
  readonly cause?: Error;

  constructor(message?: string, error?: Error) {
    super(message ?? "unknown error");
    this.name = this.constructor.name;
    this.cause = error;
    Object.setPrototypeOf(this, new.target.prototype); // Necessary for ES6 class inheritance
  }
}

/**
 * Base class for all http errors.
 * @public
 */
export class HttpError extends BaseError {
  statusCode: number;
  response?: Record<string, unknown>;

  constructor(
    statusCode: number,
    message: string,
    params: { response?: Record<string, unknown>; error?: Error }
  ) {
    super(message, params.error);
    this.statusCode = statusCode;
    this.response = params.response;
  }
}

/**
 * Converts an unknown error into an Error instance with a descriptive message.
 *
 * @param error - The unknown error to handle.
 * @returns An Error instance with a descriptive message.
 */
export function handleUnknownError(error: unknown): Error {
  if (error instanceof Error) {
    return error;
  } else if (typeof error === "string") {
    return new Error(`Unknown error: ${error}`);
  } else {
    return new Error("An unexpected error occurred");
  }
}
