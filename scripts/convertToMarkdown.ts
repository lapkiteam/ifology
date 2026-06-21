import { pipeInto } from "ts-functional-pipe"
import fs from "node:fs"
import sanitize from "sanitize-filename"

import CellData from "../src/stores/cellData"
import CellStorage from "../src/stores/cellStorage"
import { MarkdownItemPrinter } from "../src/stores/markdownItem"

pipeInto(
  CellStorage.predefinedItems,
  cellDatas => cellDatas.map(cellData => ({
    title: cellData.title,
    markdownItem: CellData.toMarkdownItem(cellData),
  })),
  markdownItems => markdownItems.map(({ title, markdownItem }) => ({
    title,
    content: MarkdownItemPrinter.print(markdownItem),
  })),
  results => {
    results.forEach(result => {
      const title = result.title
      if (!title) { return }
      const fileName = sanitize(title.toLowerCase())
      const path = `public/items/${fileName}.md`
      try {
        fs.writeFileSync(path, result.content)
      } catch (err) {
        if (err) {
          console.error(err)
          return
        }
      }
    })
  }
)
