/**
 * Calculates the sum of an array of numbers.
 *
 * @param array - The array of numbers to sum.
 * @returns The sum of the array of numbers.
 */
export function sum(array: number[]): number {
  return array.reduce((acc, curr) => acc + curr, 0);
}

/**
 * Calculates the average of an array of numbers.
 * @param array - The array of numbers to calculate the average for.
 * @returns The average of the array of numbers. Returns null if the array is empty.
 */
export function average(array: number[]): number | null {
  if (array.length === 0) {
    return null;
  }
  return sum(array) / array.length;
}
