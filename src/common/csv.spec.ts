import * as iconv from "iconv-lite";
import { convertToCsvBuffer } from "./csv";

describe("convertToCsvBuffer", () => {
  it("converts CSV data to a Buffer", () => {
    const csvData = {
      header: ["Name", "Age", "Country"],
      rows: [
        ["Alice", "30", "USA"],
        ["Bob", "25", "Canada"],
      ],
    };

    const buffer = convertToCsvBuffer(csvData);

    // BufferデータをUTF-8エンコードで文字列に変換して検証
    const csvString = buffer.toString("utf8");
    expect(csvString).toMatch(`Name,Age,Country\nAlice,30,USA\nBob,25,Canada`);
  });

  it("converts CSV data with object rows to a Buffer", () => {
    const csvData = {
      header: ["Name", "Age", "Country"],
      rows: [
        { Name: "Alice", Age: "30", Country: "USA" },
        { Name: "Bob", Age: "25", Country: "Canada" },
      ],
    };

    const buffer = convertToCsvBuffer(csvData);

    // BufferデータをUTF-8エンコードで文字列に変換して検証
    const csvString = buffer.toString("utf8");
    expect(csvString).toMatch(`Name,Age,Country\nAlice,30,USA\nBob,25,Canada`);
  });

  it("converts CSV data with custom EOL and encoding", () => {
    const csvData = {
      header: ["名前", "年齢", "出身"],
      rows: [
        ["アリス", "30", "アメリカ"],
        ["ボブ", "25", "カナダ"],
      ],
    };

    const options = {
      eol: "\r\n",
      encoding: "Shift_JIS",
    } as const;

    const buffer = convertToCsvBuffer(csvData, options);

    const csvString = iconv.decode(buffer, "Shift_JIS");
    expect(csvString).toMatch(
      `名前,年齢,出身\r\nアリス,30,アメリカ\r\nボブ,25,カナダ`
    );
  });
});
