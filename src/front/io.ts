import JSZip from "jszip";
import { BaseError } from "@/common/errors";
import { chunkArray } from "..";

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
      error instanceof Error ? error : undefined
    );
  }
}

/**
 * Generate a zip file containing the provided binary data arrays.
 * By default, each zip file is limited to a maximum of 100 files.
 *
 * @param filename The name of the zip file to generate.
 * @param blobs An array of binary data to be included in the zip.
 * @param options Optional configuration options.
 * @param options.maxSize The maximum number of files to include in a single zip (default is 100).
 * @returns A Promise that resolves to an array of Blob objects, each representing a generated zip file.
 * @throws {FrontIOError} If the generation fails.
 */
export async function generateZip(
  filename: string,
  blobs: Blob[],
  options?: { maxSize?: number }
): Promise<Blob[]> {
  try {
    const result: Blob[] = [];
    const zip = new JSZip();
    const chunked = chunkArray(blobs, options?.maxSize ?? 100);
    for (const chunk of chunked) {
      chunk.forEach((blob) => zip.file(filename, blob));
      const blob = await zip.generateAsync({ type: "blob" });
      result.push(blob);
    }
    return result;
  } catch (error) {
    throw new FrontIOError(
      `failed to generate zip: ${filename}`,
      error instanceof Error ? error : undefined
    );
  }
}
