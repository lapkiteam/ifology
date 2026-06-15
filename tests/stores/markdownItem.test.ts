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
      rest: "",
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
      rest: "",
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
      rest: "",
    }))
  })

  it("eof", () => {
    expect(MardownItemParser.parseRawFrontmatter(
      [
        "---",
        "---",
        "   content"
      ].join("\n")
    )).toStrictEqual(Result.mkOk({
      value: [],
      rest: "content",
    }))
  })
})

describe("MardownItemParser.parse", () => {
  it("empty", () => {
    expect(MardownItemParser.parse(
      [
        "---",
        "authors:",
        "  - iam",
        "tags:",
        "  - hello",
        "---",
        "Content"
      ].join("\n")
    )).toStrictEqual(Result.mkOk({
      Frontmatter: Result.mkOk({
        authors: ["iam"],
        tags: ["hello"],
      }),
      Content: "Content",
    }))
  })
})
