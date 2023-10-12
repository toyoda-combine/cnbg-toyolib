import {
  DatetimeError,
  isBeforeISO,
  isAfterISO,
  isEqualISO,
  isBetweenISO,
  unixTimeToISO8601,
} from "./datetime";

describe("isBeforeISO", () => {
  it.each`
    dateA                          | dateB
    ${"2023-01-01T00:00:00Z"}      | ${"2023-01-01T00:00:01Z"}
    ${"2023-01-01T00:00:00+09:00"} | ${"2023-01-01T00:00:01+09:00"}
    ${"2023-01-01T00:00:00+09:00"} | ${"2023-01-01T00:01:00+09:00"}
    ${"2023-01-01T00:00:00+09:00"} | ${"2023-01-01T01:00:00+09:00"}
    ${"2023-01-01T00:00:00+09:00"} | ${"2023-01-02T00:00:00+09:00"}
    ${"2022-12-31T23:59:59+09:00"} | ${"2023-01-01T00:00:00+09:00"}
  `("should return true if $dateA is before $dateB", ({ dateA, dateB }) => {
    expect(isBeforeISO(dateA, dateB)).toBeTruthy();
  });

  it.each`
    dateA                          | dateB
    ${"2023-01-01T00:00:01Z"}      | ${"2023-01-01T00:00:00Z"}
    ${"2023-01-01T00:00:01+09:00"} | ${"2023-01-01T00:00:00+09:00"}
    ${"2023-01-01T00:01:00+09:00"} | ${"2023-01-01T00:00:00+09:00"}
    ${"2023-01-01T01:00:00+09:00"} | ${"2023-01-01T00:00:00+09:00"}
    ${"2023-01-02T00:00:00+09:00"} | ${"2023-01-01T00:00:00+09:00"}
    ${"2023-01-01T00:00:00+09:00"} | ${"2022-12-31T23:59:59+09:00"}
  `("should return false if $dateA is after $dateB", ({ dateA, dateB }) => {
    expect(isBeforeISO(dateA, dateB)).toBeFalsy();
  });

  it("should return false if the two dates are equal", () => {
    const dateA = "2023-01-02T00:00:00Z";
    const dateB = "2023-01-02T00:00:00Z";
    expect(isBeforeISO(dateA, dateB)).toBeFalsy();
  });

  it("should throw an error for invalid date strings", () => {
    expect(() => isBeforeISO("invalid-date", "2023-09-20")).toThrowError(
      DatetimeError
    );
  });
});

describe("isAfterISO", () => {
  it.each`
    dateA                          | dateB
    ${"2023-01-01T00:00:00Z"}      | ${"2023-01-01T00:00:01Z"}
    ${"2023-01-01T00:00:00+09:00"} | ${"2023-01-01T00:00:01+09:00"}
    ${"2023-01-01T00:00:00+09:00"} | ${"2023-01-01T00:01:00+09:00"}
    ${"2023-01-01T00:00:00+09:00"} | ${"2023-01-01T01:00:00+09:00"}
    ${"2023-01-01T00:00:00+09:00"} | ${"2023-01-02T00:00:00+09:00"}
    ${"2022-12-31T23:59:59+09:00"} | ${"2023-01-01T00:00:00+09:00"}
  `("should return false if $dateA is before $dateB", ({ dateA, dateB }) => {
    expect(isAfterISO(dateA, dateB)).toBeFalsy();
  });

  it.each`
    dateA                          | dateB
    ${"2023-01-01T00:00:01Z"}      | ${"2023-01-01T00:00:00Z"}
    ${"2023-01-01T00:00:01+09:00"} | ${"2023-01-01T00:00:00+09:00"}
    ${"2023-01-01T00:01:00+09:00"} | ${"2023-01-01T00:00:00+09:00"}
    ${"2023-01-01T01:00:00+09:00"} | ${"2023-01-01T00:00:00+09:00"}
    ${"2023-01-02T00:00:00+09:00"} | ${"2023-01-01T00:00:00+09:00"}
    ${"2023-01-01T00:00:00+09:00"} | ${"2022-12-31T23:59:59+09:00"}
  `("should return true if $dateA is after $dateB", ({ dateA, dateB }) => {
    expect(isAfterISO(dateA, dateB)).toBeTruthy();
  });

  it("should return false if the two dates are equal", () => {
    const dateA = "2023-01-02T00:00:00Z";
    const dateB = "2023-01-02T00:00:00Z";
    expect(isAfterISO(dateA, dateB)).toBeFalsy();
  });

  it("should throw an error for invalid date strings", () => {
    expect(() => isAfterISO("invalid-date", "2023-09-20")).toThrowError(
      DatetimeError
    );
  });
});

describe("isEqualISO", () => {
  it.each`
    dateA                          | dateB
    ${"2023-01-01T00:00:00Z"}      | ${"2023-01-01T00:00:00Z"}
    ${"2023-01-01T00:00:00+09:00"} | ${"2023-01-01T00:00:00+09:00"}
    ${"2023-01-01T00:01:00+09:00"} | ${"2023-01-01T00:01:00+09:00"}
    ${"2023-01-01T01:00:00+09:00"} | ${"2023-01-01T01:00:00+09:00"}
    ${"2023-01-02T00:00:00+09:00"} | ${"2023-01-02T00:00:00+09:00"}
  `(
    "should return true if two ISO 8601 date strings are equal",
    ({ dateA, dateB }) => {
      expect(isEqualISO(dateA, dateB)).toBeTruthy();
    }
  );

  it.each`
    dateA                          | dateB
    ${"2023-01-01T00:00:00Z"}      | ${"2023-01-01T00:00:01Z"}
    ${"2023-01-01T00:00:00+09:00"} | ${"2023-01-01T00:00:01+09:00"}
    ${"2023-01-01T00:00:00+09:00"} | ${"2023-01-01T00:01:00+09:00"}
    ${"2023-01-01T00:00:00+09:00"} | ${"2023-01-01T01:00:00+09:00"}
    ${"2023-01-01T00:00:00+09:00"} | ${"2023-01-02T00:00:00+09:00"}
  `(
    "should return false if two ISO 8601 date strings are not equal",
    ({ dateA, dateB }) => {
      expect(isEqualISO(dateA, dateB)).toBeFalsy();
    }
  );

  it("should throw an error for invalid date strings", () => {
    expect(() =>
      isEqualISO("invalid-date", "2023-01-01T00:00:00Z")
    ).toThrowError(DatetimeError);
    expect(() =>
      isEqualISO("2023-01-01T00:00:00Z", "invalid-date")
    ).toThrowError(DatetimeError);
  });
});

describe("isBetweenISO", () => {
  it.each`
    target                         | start                          | end
    ${"2023-01-01T00:00:02+09:00"} | ${"2023-01-01T00:00:01+09:00"} | ${"2023-01-01T00:00:03+09:00"}
    ${"2023-01-01T00:02:00+09:00"} | ${"2023-01-01T00:01:00+09:00"} | ${"2023-01-01T00:03:00+09:00"}
    ${"2023-01-01T02:00:00+09:00"} | ${"2023-01-01T01:00:00+09:00"} | ${"2023-01-01T03:00:00+09:00"}
    ${"2023-01-02T00:00:00+09:00"} | ${"2023-01-01T00:00:00+09:00"} | ${"2023-01-03T00:00:00+09:00"}
  `(
    "should return true if target is between start and end",
    ({ target, start, end }) => {
      expect(isBetweenISO(target, start, end)).toBeTruthy();
    }
  );

  it.each`
    target                         | start                          | end
    ${"2023-01-01T00:00:01+09:00"} | ${"2023-01-01T00:00:01+09:00"} | ${"2023-01-01T00:00:03+09:00"}
    ${"2023-01-01T00:00:03+09:00"} | ${"2023-01-01T00:00:01+09:00"} | ${"2023-01-01T00:00:03+09:00"}
  `(
    "should return false if target is not between start and end",
    ({ target, start, end }) => {
      expect(isBetweenISO(target, start, end)).toBeFalsy();
    }
  );

  it("should throw an error for invalid date strings", () => {
    expect(() =>
      isBetweenISO(
        "invalid-date",
        "2023-01-01T00:00:00Z",
        "2023-01-03T00:00:00Z"
      )
    ).toThrowError(DatetimeError);
    expect(() =>
      isBetweenISO(
        "2023-01-02T00:00:00Z",
        "invalid-date",
        "2023-01-03T00:00:00Z"
      )
    ).toThrowError(DatetimeError);
    expect(() =>
      isBetweenISO(
        "2023-01-02T00:00:00Z",
        "2023-01-01T00:00:00Z",
        "invalid-date"
      )
    ).toThrowError(DatetimeError);
  });
});

describe("unixTimeToISO8601", () => {
  it("should correctly convert a Unix timestamp to an ISO8601 string", () => {
    expect(unixTimeToISO8601(1697086573)).toBe("2023-10-12T13:56:13+09:00");
  });

  it("should handle the epoch time correctly", () => {
    const result = unixTimeToISO8601(0);
    expect(result).toBe("1970-01-01T09:00:00+09:00");
  });

  it("should handle a very large Unix Timestamp", () => {
    const result = unixTimeToISO8601(4102444800);
    expect(result).toBe("2100-01-01T09:00:00+09:00");
  });

  it("should throw a DateTimeError on negative Unix Timestamps", () => {
    expect(() => {
      unixTimeToISO8601(-1);
    }).toThrow(DatetimeError);
  });

  it("should throw a DatetimeError on invalid input", () => {
    expect(() => {
      unixTimeToISO8601(NaN);
    }).toThrow(DatetimeError);
  });
});
