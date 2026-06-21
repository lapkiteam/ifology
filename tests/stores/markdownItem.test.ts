import { Result } from "@fering-org/functional-helper"
import { describe, expect, it } from "vitest"

import { MarkdownItemParser } from "../../src/stores/markdownItem"

describe("MarkdownItemParser.parseRawFrontmatter", () => {
  it("empty", () => {
    expect(MarkdownItemParser.parseRawFrontmatter(
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
    expect(MarkdownItemParser.parseRawFrontmatter(
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
    expect(MarkdownItemParser.parseRawFrontmatter(
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
    expect(MarkdownItemParser.parseRawFrontmatter(
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

describe("MarkdownItemParser.parse", () => {
  it("empty", () => {
    expect(MarkdownItemParser.parse(
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
