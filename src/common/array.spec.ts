import { ArrayError, chunkArray, getSequence } from "./array";

describe("chunkArray", () => {
  it.each`
    array                          | chunkSize | expected
    ${[1, 2, 3, 4, 5, 6, 7, 8, 9]} | ${3}      | ${[[1, 2, 3], [4, 5, 6], [7, 8, 9]]}
    ${[1, 2, 3, 4, 5, 6, 7, 8, 9]} | ${2}      | ${[[1, 2], [3, 4], [5, 6], [7, 8], [9]]}
    ${[1, 2, 3, 4, 5, 6, 7, 8, 9]} | ${1}      | ${[[1], [2], [3], [4], [5], [6], [7], [8], [9]]}
    ${[1]}                         | ${2}      | ${[[1]]}
    ${[]}                          | ${1}      | ${[]}
  `("$array / $chunkSize -> $expected", ({ array, chunkSize, expected }) => {
    const actual = chunkArray(array, chunkSize);
    expect(actual).toEqual(expected);
  });

  it("Zero chunk size should throw an ArrayError", () => {
    expect(() => chunkArray([1, 2, 3], 0)).toThrowError(ArrayError);
  });

  it("Negative chunk size should throw an ArrayError", () => {
    expect(() => chunkArray([1, 2, 3], -1)).toThrowError(ArrayError);
  });

  it("Float seqSize should throw an ArrayError", () => {
    expect(() => chunkArray([1, 2, 3], 1.5)).toThrowError(ArrayError);
  });

  it("Null array should throw an ArrayError", () => {
    expect(() => chunkArray(null as any, 3)).toThrowError(ArrayError);
  });

  it("Undefined array should throw an ArrayError", () => {
    expect(() => chunkArray(undefined as any, 3)).toThrowError(ArrayError);
  });

  it("Null chunk size should throw an ArrayError", () => {
    expect(() => chunkArray([1, 2, 3], null as any)).toThrowError(ArrayError);
  });

  it("Undefined chunk size should throw an ArrayError", () => {
    expect(() => chunkArray([1, 2, 3], undefined as any)).toThrowError(
      ArrayError
    );
  });
});

describe("getSequence", () => {
  it.each`
    seqSize | expected
    ${0}    | ${[]}
    ${1}    | ${[0]}
    ${2}    | ${[0, 1]}
    ${5}    | ${[0, 1, 2, 3, 4]}
    ${10}   | ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
  `("$seqSize -> $expected", ({ seqSize, expected }) => {
    const actual = getSequence(seqSize);
    expect(actual).toEqual(expected);
  });

  it("Negative sequence size should throw an ArrayError", () => {
    expect(() => getSequence(-1)).toThrowError(ArrayError);
  });

  it("Float sequence size should throw an ArrayError", () => {
    expect(() => getSequence(1.5)).toThrowError(ArrayError);
  });

  it("String sequence size should throw an ArrayError", () => {
    expect(() => getSequence("3" as any)).toThrowError(ArrayError);
  });

  it("Null sequence size should throw an ArrayError", () => {
    expect(() => chunkArray([1, 2, 3], null as any)).toThrowError(ArrayError);
  });

  it("Undefined sequence size should throw an ArrayError", () => {
    expect(() => chunkArray([1, 2, 3], undefined as any)).toThrowError(
      ArrayError
    );
  });
});
