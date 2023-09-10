import { padString, isEmptyString, isString, StringError } from "./string";

describe("isString", () => {
  it("should return true if the value is a string", () => {
    expect(isString("Hello")).toBeTruthy();
  });

  it("should return false if the value is not a string", () => {
    expect(isString(42)).toBeFalsy();
    expect(isString(null)).toBeFalsy();
    expect(isString(undefined)).toBeFalsy();
    expect(isString({})).toBeFalsy();
  });
});

describe("isEmptyString", () => {
  it("should return true if the string is empty", () => {
    expect(isEmptyString("")).toBeTruthy();
  });

  it("should return false if the string is not empty", () => {
    expect(isEmptyString("Hello")).toBeFalsy();
  });
});

describe("padString", () => {
  it("should pad the string with spaces by default", () => {
    expect(padString("123", 5, undefined)).toBe("  123");
  });

  it("should pad the string with the specified character", () => {
    expect(padString("123", 5, "0")).toBe("00123");
  });

  it("should left-align the string by default", () => {
    expect(padString("123", 5, "0")).toBe("00123");
  });

  it("should right-align the string if specified", () => {
    expect(padString("123", 5, "0", "end")).toBe("12300");
  });

  it("should handle null or undefined input", () => {
    expect(padString(null, 5, "0")).toBe("00000");
    expect(padString(undefined, 5, "0")).toBe("00000");
  });
});
