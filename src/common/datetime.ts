import { BaseError, handleUnknownError } from "./errors";

export class DatetimeError extends BaseError {}

/**
 * Determines if the given ISO 8601 date string is before another ISO 8601 date string.
 *
 * @param dateStr1 The date string to evaluate.
 * @param dateStr2 The reference date string to compare against.
 * @returns True if dateStr1 is before dateStr2, otherwise false.
 * @throws {DatetimeError} Throws a DatetimeError if an error occurs during the comparison.
 */
export function isBeforeISO(dateStr1: string, dateStr2: string): boolean {
  try {
    const date1 = new Date(dateStr1);
    const date2 = new Date(dateStr2);
    if (isNaN(date1.getTime()) || isNaN(date2.getTime())) {
      throw new Error("Invalid date string provided");
    }
    return date1.getTime() < date2.getTime();
  } catch (error) {
    throw new DatetimeError(
      "failed to compare provided date strings",
      handleUnknownError(error)
    );
  }
}

/**
 * Determines if the given ISO 8601 date string is after another ISO 8601 date string.
 *
 * @param dateStr1 The date string to evaluate.
 * @param dateStr2 The reference date string to compare against.
 * @returns True if dateStr1 is after dateStr2, otherwise false.
 * @throws {DatetimeError} Throws a DatetimeError if an error occurs during the comparison.
 */
export function isAfterISO(dateStr1: string, dateStr2: string): boolean {
  try {
    const date1 = new Date(dateStr1);
    const date2 = new Date(dateStr2);
    if (isNaN(date1.getTime()) || isNaN(date2.getTime())) {
      throw new Error("Invalid date string provided");
    }
    return date1.getTime() > date2.getTime();
  } catch (error) {
    throw new DatetimeError(
      "Unable to compare provided date strings",
      handleUnknownError(error)
    );
  }
}

/**
 * Determines if the given ISO 8601 date strings are equal.
 *
 * @param dateStr1 The first date string to compare.
 * @param dateStr2 The second date string to compare.
 * @returns True if dateStr1 is equal to dateStr2, otherwise false.
 * @throws {DatetimeError} Throws a DatetimeError if an error occurs during the comparison.
 */
export function isEqualISO(dateStr1: string, dateStr2: string): boolean {
  try {
    const date1 = new Date(dateStr1);
    const date2 = new Date(dateStr2);
    if (isNaN(date1.getTime()) || isNaN(date2.getTime())) {
      throw new Error("Invalid date string provided");
    }
    return date1.getTime() === date2.getTime();
  } catch (error) {
    throw new DatetimeError(
      "Unable to compare provided date strings",
      handleUnknownError(error)
    );
  }
}

/**
 * Determines if the given ISO 8601 date string is between two other ISO 8601 date strings.
 *
 * @param target The date string to evaluate.
 * @param start The start of the date range.
 * @param end The end of the date range.
 * @returns True if target is between start and end (exclusive), otherwise false.
 * @throws {DatetimeError} Throws a DatetimeError if an error occurs during the comparison.
 */
export function isBetweenISO(
  target: string,
  start: string,
  end: string
): boolean {
  try {
    const targetDate = new Date(target);
    const startDate = new Date(start);
    const endDate = new Date(end);

    if (
      [targetDate, startDate, endDate].some((date) => isNaN(date.getTime()))
    ) {
      throw new Error("Invalid date string provided");
    }

    return (
      targetDate.getTime() > startDate.getTime() &&
      targetDate.getTime() < endDate.getTime()
    );
  } catch (error) {
    throw new DatetimeError(
      "Unable to evaluate if provided date string is between the range",
      handleUnknownError(error)
    );
  }
}
