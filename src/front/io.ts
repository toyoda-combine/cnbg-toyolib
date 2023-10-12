import { BaseError, handleUnknownError } from "@/common/errors";
import {
  ConvertToCsvStringOptions,
  CsvObject,
  chunkArray,
  convertToCsvBuffer,
} from "..";

/**
 * Error related to front-end I/O operations.
 */
export class FrontIOError extends BaseError {}

/**
 * Download binary data as a file.
 * @public
 * @param filename The file name
 * @param blob The binary data to be downloaded
 * @throws {FrontIOError} If the download fails
 */
export function downloadBlob(filename: string, blob: Blob): void {
  try {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = filename;
    link.href = url;
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    throw new FrontIOError(
      `failed to download blob: ${filename}`,
      handleUnknownError(error)
    );
  }
}

/**
 * Download CSV data as a file.
 *
 * @param filename - The desired filename for the downloaded file.
 * @param csv - The CSV data to be downloaded.
 * @param [options] - Optional CSV conversion settings.
 * @throws {FrontIOError} Throws a FrontIOError if the download fails.
 */
export function downloadCsv(
  filename: string,
  csv: CsvObject,
  options?: ConvertToCsvStringOptions
): void {
  try {
    const buffer = convertToCsvBuffer(csv, options);
    const blob = new Blob([buffer], { type: "text/plain" });
    downloadBlob(filename, blob);
  } catch (error) {
    throw new FrontIOError(
      `failed to download csv: ${filename}`,
      handleUnknownError(error)
    );
  }
}
