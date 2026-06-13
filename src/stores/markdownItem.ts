import P from "parsimmon"
import { Result } from "@fering-org/functional-helper"

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

  export function parse(fileContent: string) {

  }
}
