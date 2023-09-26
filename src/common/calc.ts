/**
 * Calculates the sum of an array of numbers.
 *
 * @param array - The array of numbers to sum.
 * @returns The sum of the array of numbers.
 */
export function sum(array: number[]): number {
  return array.reduce((acc, curr) => acc + curr, 0);
}
