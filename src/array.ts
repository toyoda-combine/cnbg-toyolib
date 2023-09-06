import { BaseError } from "@/errors";

/**
 * Error related to array operations.
 */
export class ArrayError extends BaseError {}

/**
 * Returns a sequence of numbers starting from 0 up to the specified size.
 * @param length The length of the array (a non-negative integer).
 * @returns The sequence of numbers.
 */
export function getSequence(length: number): number[] {
  if (length < 0 || !Number.isInteger(length)) {
    throw new ArrayError("length must be a positive integer");
  }
  return Array.from({ length }, (_, i) => i);
}
