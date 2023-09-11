import * as iconv from "iconv-lite";
import { BaseError, handleUnknownError } from "./errors";

/**
 * Error related to csv operations.
 */
export class CsvError extends BaseError {}

export interface CsvObject {
  header: string[];
  rows: string[][] | Record<string, unknown>[];
}

export interface ConvertToCsvStringOptions {
  eol?: "\n" | "\r\n";
  encoding?: "utf8" | "Shift_JIS" | "cp932";
}

/**
 * Converts CSV data to a CSV formatted string.
 * @param csv - CSV data object
 * @param options - Optional settings
 * @returns CSV formatted string
 * @throws {CsvError} Throws a CsvError if an error occurs during the conversion.
 */
export function convertToCsvBuffer(
  csv: CsvObject,
  options?: ConvertToCsvStringOptions
): Buffer {
  try {
    const eol = options?.eol ?? "\n";
    const encoding = options?.encoding ?? "utf8";
    let result = csv.header.join(",") + eol;
    for (const row of csv.rows) {
      if (Array.isArray(row)) {
        result += row.join(",") + eol;
      } else {
        result += csv.header.map((h) => row[h]).join(",") + eol;
      }
    }
    return iconv.encode(result, encoding);
  } catch (error) {
    throw new CsvError(
      "failed to convert to csv string",
      handleUnknownError(error)
    );
  }
}
