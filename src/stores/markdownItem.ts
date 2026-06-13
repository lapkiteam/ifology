import P from "parsimmon"
import { Result, UnionCase } from "@fering-org/functional-helper"

export type MardownItem = {
  Frontmatter: string
  Content: string
}

export type MarkdownItemParserError =
  | UnionCase<"FrontmatterError", P.Failure>

export namespace MardownItemParser {
  const parserRawFrontmatter = (() => {
    const separator = "---"
    const psep = P.string(separator)
    const pline = P.notFollowedBy(psep)
      .then(P.regex(/[^\n]+/))
    const rawYml = P.alt(
        pline.skip(P.newline),
        P.newline.result(''),
    ).many()
    return psep.skip(P.newline)
      .then(rawYml)
      .skip(psep)
  })()

  /** parse a YAML frontmatter block including the leading/trailing separators:
   * ```text
   * ---\n
   * (any text, possibly containing newlines, but stops before "\n---")
   * ---
   * ```
   */
  export function parseRawFrontmatter(
    fileContent: string
  ): Result<{ value: string[], endIndex: P.Index }, P.Failure> {
    const marked = parserRawFrontmatter.mark()
    const result = marked.parse(fileContent)
    if (result.status) {
      return Result.mkOk({
        value: result.value.value,
        endIndex: result.value.end,
      })
    } else {
      return Result.mkError(result)
    }
  }

  export function parse(
    fileContent: string
  ): Result<MardownItem, MarkdownItemParserError> {
    const frontmatterResult = parseRawFrontmatter(fileContent)
    if (frontmatterResult[0] === "Error") {
      return Result.mkError(
        UnionCase.mkUnionCase("FrontmatterError", frontmatterResult[1])
      )
    }
    const frontmatter = frontmatterResult[1]
    const content = fileContent.slice(frontmatter.endIndex.offset)
    return Result.mkOk({
      Frontmatter: frontmatter.value.join("\n"),
      Content: content,
    })
  }
}
