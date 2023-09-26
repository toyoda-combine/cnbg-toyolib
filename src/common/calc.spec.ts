import { sum } from "./calc";

describe("Tests for sum function", () => {
  it.each`
    array                                   | expected                               | description
    ${[1, 2, 3, 4, 5]}                      | ${15}                                  | ${"Sum of positive integers"}
    ${[0, 0, 0, 0, 0]}                      | ${0}                                   | ${"Sum of zeros"}
    ${[1]}                                  | ${1}                                   | ${"Sum of a single element"}
    ${[]}                                   | ${0}                                   | ${"Sum of an empty array"}
    ${[-1, -2, -3, -4, -5]}                 | ${-15}                                 | ${"Sum of negative integers"}
    ${[-1, 1]}                              | ${0}                                   | ${"Sum of negative and positive integers resulting in zero"}
    ${[1.5, 2.5, 3.5]}                      | ${7.5}                                 | ${"Sum of floating-point numbers"}
    ${[Number.MAX_VALUE, Number.MIN_VALUE]} | ${Number.MAX_VALUE + Number.MIN_VALUE} | ${"Sum of max and min floating-point numbers"}
  `("$description", ({ array, expected }) => {
    const actual = sum(array);
    expect(actual).toBe(expected);
  });
});
