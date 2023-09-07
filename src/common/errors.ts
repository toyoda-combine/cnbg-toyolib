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
    this.name = new.target.name;
    this.cause = error;
    Object.setPrototypeOf(this, new.target.prototype); // Necessary for ES6 class inheritance
  }
}
