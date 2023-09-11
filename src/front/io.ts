import JSZip from "jszip";
import { BaseError, handleUnknownError } from "@/common/errors";
import {
  ConvertToCsvStringOptions,
  CsvObject,
  chunkArray,
  convertToCsvString,
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
    const csvString = convertToCsvString(csv, options);
    const blob = new Blob([csvString], { type: "text/plain" });
    downloadBlob(filename, blob);
  } catch (error) {
    throw new FrontIOError(
      `failed to download csv: ${filename}`,
      handleUnknownError(error)
    );
  }
}

/**
 * Generate multiple ZIP files, each containing binary data arrays.
 * By default, each individual ZIP file is limited to a maximum of 100 files.
 *
 * @param files An array of objects representing file entries, each with a filename and a Blob.
 * @param options Optional configuration options.
 * @param options.maxSize The maximum number of files to include in a single ZIP file (default is 100).
 * @returns A Promise that resolves to an array of Blob objects, each representing a generated ZIP file.
 * @throws {FrontIOError} If the generation fails.
 */
export async function generateMultipleZips(
  files: { filename: string; blob: Blob }[],
  options?: { maxSize?: number }
): Promise<Blob[]> {
  try {
    const result: Blob[] = [];
    for (const chunk of chunkArray(files, options?.maxSize ?? 100)) {
      result.push(await generateZip(chunk));
    }
    return result;
  } catch (error) {
    throw new FrontIOError(
      `failed to generate multiple zip files`,
      handleUnknownError(error)
    );
  }
}

/**
 * Generate a ZIP file from an array of binary data entries.
 *
 * @param files An array of objects representing file entries, each with a filename and a Blob.
 * @returns A Promise that resolves to a Blob representing the generated ZIP file.
 * @throws {FrontIOError} If the generation fails.
 */
export async function generateZip(
  files: { filename: string; blob: Blob }[]
): Promise<Blob> {
  try {
    const zip = new JSZip();
    for (const file of files) {
      zip.file(file.filename, file.blob);
    }
    return await zip.generateAsync({ type: "blob" });
  } catch (error) {
    throw new FrontIOError(
      `failed to generate zip file`,
      handleUnknownError(error)
    );
  }
}
