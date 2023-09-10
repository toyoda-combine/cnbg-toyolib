import { BaseError } from "./errors";

/**
 * Error related to string operations.
 */
export class StringError extends BaseError {}

/**
 * Check if a value is a string.
 * @param value - The value to check.
 * @returns True if the value is a string, false otherwise.
 */
export function isString(value: unknown): value is string {
  return typeof value === "string";
}

/**
 * Check if a string is empty.
 * @param str - The string to check.
 * @returns True if the string is empty, false otherwise.
 */
export function isEmptyString(str: string): boolean {
  return str.trim() === "";
}

/**
 * Pad a string with a character for a specified number of digits.
 * @param str - The target string or null/undefined.
 * @param length - The number of digits to fill.
 * @param fillChar - The character to fill with (default is space).
 * @param alignment - The alignment option: "start" (default) for left-aligned, "end" for right-aligned.
 * @throws {StringError} If it fails to pad a string.
 */
export function padString(
  str: string | null | undefined,
  length: number,
  fillChar = " ",
  alignment: "start" | "end" = "start"
): string {
  try {
    if (str === null || str === undefined || isEmptyString(str)) {
      return fillChar.repeat(length);
    } else {
      return alignment === "end"
        ? str.padEnd(length, fillChar)
        : str.padStart(length, fillChar);
    }
  } catch (error) {
    throw new StringError(
      `failed to pad a string: ${str}`,
      error instanceof Error ? error : undefined
    );
  }
}
