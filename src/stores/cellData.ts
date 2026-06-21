import update from "immutability-helper"
import { Option } from "@fering-org/functional-helper"

import { type MarkdownItem } from "./markdownItem"
import { pipeInto } from "ts-functional-pipe"

export type CellData = {
  title: Option<string>
  imageSrc: Option<string>
  description: Option<string>
}

export namespace CellData {
  export function create(): CellData {
    return {
      title: Option.mkNone(),
      imageSrc: Option.mkNone(),
      description: Option.mkNone(),
    }
  }
}

export namespace OptionExt {
  // refactor: use function from functional-helper (see: https://github.com/gretmn102/functional-helper/issues/10)
  export function ofUnknown<T>(value: unknown): Option<T> {
    if (!value) {
      return Option.mkNone()
    }
    return Option.mkSome(value as T)
  }
}

export namespace CellData {
  export function updateImageSrc(
    cell: CellData,
    updateImageSrc: (initSrc: CellData["imageSrc"]) => CellData["imageSrc"]
  ) : CellData {
    return update(cell, {
      imageSrc: { $apply: initSrc => updateImageSrc(initSrc) }
    })
  }

  export function ofMarkdownItem(markdownItem: MarkdownItem): CellData {
    return pipeInto(
      CellData.create(),
      cellData => {
        if (markdownItem.Frontmatter[0] === "Error") {
          return cellData
        }
        const frontmatter = markdownItem.Frontmatter[1]
        return update(cellData, {
          title: {
            $set: OptionExt.ofUnknown<string>(frontmatter.title)
          },
          imageSrc: {
            $set: OptionExt.ofUnknown<string>(frontmatter.image)
          },
        })
      },
      cellData => update(cellData, {
        description: { $set: markdownItem.Content }
      })
    )
  }
}

export default CellData
