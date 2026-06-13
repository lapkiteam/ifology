import { Result } from "@fering-org/functional-helper"
import { describe, expect, it } from "vitest"

import { MardownItemParser } from "../../src/stores/markdownItem"

describe("MardownItemParser.parseRawFrontmatter", () => {
  it("empty", () => {
    expect(MardownItemParser.parseRawFrontmatter(
      [
        "---",
        "---",
      ].join("\n")
    )).toStrictEqual(Result.mkOk({
      value: [],
      endIndex: {
        column: 4,
        line: 2,
        offset: 7,
      },
    }))
  })

  it("base", () => {
    expect(MardownItemParser.parseRawFrontmatter(
      [
        "---",
        "authors:",
        "  - iam",
        "tags:",
        "  - hello",
        "---",
      ].join("\n")
    )).toStrictEqual(Result.mkOk({
      value: [
        "authors:",
        "  - iam",
        "tags:",
        "  - hello",
      ],
      endIndex: {
        column: 4,
        line: 6,
        offset: 40,
      },
    }))
  })

  it("blank newlines", () => {
    expect(MardownItemParser.parseRawFrontmatter(
      [
        "---",
        "authors:",
        "",
        "tags:",
        "",
        "---",
      ].join("\n")
    )).toStrictEqual(Result.mkOk({
      value: [
        "authors:",
        "",
        "tags:",
        "",
      ],
      endIndex: {
        column: 4,
        line: 6,
        offset: 24,
      },
    }))
  })
})
