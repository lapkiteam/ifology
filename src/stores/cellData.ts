import update from "immutability-helper"
import { type Option } from "@fering-org/functional-helper"

import { MardownItem } from "./markdownItem"

export type CellData = {
  title: string
  imageSrc: Option<string>
  description: Option<string>
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

  export function ofMarkdownItem(markdownItem: MardownItem) {
    const titleAndImageSrc = (() => {
      if (markdownItem.Frontmatter[0] === "Error") {
        return {
          todo
        }
      }
    })
  }
}

export default CellData
