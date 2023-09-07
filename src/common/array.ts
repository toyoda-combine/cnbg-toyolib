import { BaseError } from "@/common/errors";

/**
 * Error related to array operations.
 */
export class ArrayError extends BaseError {}

/**
 * Splits an array into chunks of a specified size.
 *
 * @param array The array to split.
 * @param chunkSize The size of each chunk (a positive integer).
 * @throws {ArrayError} If the `chunkSize` is not a positive integer.
 * @returns An array of arrays, each containing `chunkSize` or fewer elements.
 * @template T The type of elements in the input array.
 */
export function chunkArray<T>(array: T[], chunkSize: number): T[][] {
  if (chunkSize <= 0 || !Number.isInteger(chunkSize)) {
    throw new ArrayError("Chunk size must be a positive integer");
  }
  try {
    const chunkedArray: T[][] = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunkedArray.push(array.slice(i, i + chunkSize));
    }
    return chunkedArray;
  } catch (error) {
    throw new ArrayError(
      `failed to chunk array: array=${array}, chunkSize=${chunkSize}`,
      error instanceof Error ? error : undefined
    );
  }
}

/**
 * Returns a sequence of numbers starting from 0 up to the specified size.
 *
 * @param seqSize The size of the array (a non-negative integer).
 * @throws {ArrayError} If the `seqSize` is not a non-negative integer.
 * @returns The sequence of numbers.
 */
export function getSequence(seqSize: number): number[] {
  if (seqSize < 0 || !Number.isInteger(seqSize)) {
    throw new ArrayError("Sequence size must be a non-negative integer");
  }
  return Array.from({ length: seqSize }, (_, i) => i);
}
