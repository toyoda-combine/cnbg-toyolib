import * as iconv from "iconv-lite";
import { convertToCsvString } from "./csv";

describe("convertToCsvString", () => {
  it("converts CSV data to CSV formatted string", () => {
    const csvData = {
      header: ["Name", "Age", "Country"],
      rows: [
        ["Alice", "30", "USA"],
        ["Bob", "25", "Canada"],
      ],
    };

    const csvString = convertToCsvString(csvData);

    expect(csvString).toMatch(`Name,Age,Country\nAlice,30,USA\nBob,25,Canada`);
  });

  it("converts CSV data with custom EOL and encoding", () => {
    const csvData = {
      header: ["Name", "Age", "Country"],
      rows: [
        ["Alice", "30", "USA"],
        ["Bob", "25", "Canada"],
      ],
    };

    const options = {
      eol: "\r\n",
      encoding: "utf8",
    } as const;

    const csvString = convertToCsvString(csvData, options);

    expect(csvString).toMatch(
      `Name,Age,Country\r\nAlice,30,USA\r\nBob,25,Canada`
    );
  });
});
