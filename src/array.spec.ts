import { getSequence } from "@/array";

describe("datetime.getSequence", () => {
  it.each`
    length | expected
    ${0}   | ${[]}
    ${1}   | ${[0]}
    ${2}   | ${[0, 1]}
    ${5}   | ${[0, 1, 2, 3, 4]}
    ${10}  | ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
  `("$length -> $expected", ({ length, expected }) => {
    const actual = getSequence(length);
    expect(actual).toEqual(expected);
  });

  it("Negative length should throw an ArrayError", () => {
    expect(() => getSequence(-1)).toThrowError(
      "length must be a positive integer"
    );
  });

  it("Float length should throw an ArrayError", () => {
    expect(() => getSequence(1.5)).toThrowError(
      "length must be a positive integer"
    );
  });

  it("String length should throw an ArrayError", () => {
    expect(() => getSequence("3" as any)).toThrowError(
      "length must be a positive integer"
    );
  });
});
