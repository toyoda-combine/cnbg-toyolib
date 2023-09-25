import * as iconv from "iconv-lite";
import { BaseError, handleUnknownError } from "./errors";

/**
 * Error related to encoding operations.
 */
class EncodingError extends BaseError {}

type EncodingOptions = { encoding?: "utf8" | "Shift_JIS" | "cp932" };

const DEFAULT_ENCODING = "utf8" as const;

/**
 * Decodes a buffer into a string using the given encoding.
 *
 * @param buffer - The buffer to decode.
 * @param options - Optional settings for encoding.
 * @returns The decoded string.
 * @throws {EncodingError} Throws an error if the decoding operation fails.
 * @deprecated
 */
export function decode(buffer: Buffer, options?: EncodingOptions): string {
  try {
    return iconv.decode(buffer, options?.encoding ?? DEFAULT_ENCODING);
  } catch (error) {
    throw new EncodingError("failed to decode", handleUnknownError(error));
  }
}

/**
 * Encodes a string into a buffer using the given encoding.
 *
 * @param content - The string to encode.
 * @param options - Optional settings for encoding.
 * @returns The encoded buffer.
 * @throws {EncodingError} Throws an error if the encoding operation fails.
 * @deprecated
 */
export function encode(content: string, options?: EncodingOptions): Buffer {
  try {
    return iconv.encode(content, options?.encoding ?? DEFAULT_ENCODING);
  } catch (error) {
    throw new EncodingError("failed to decode", handleUnknownError(error));
  }
}
