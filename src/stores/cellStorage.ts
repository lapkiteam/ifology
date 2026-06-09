import update from "immutability-helper"
import CellData from "./cellData"

export type CellStorage = CellData[]

export namespace CellStorage {
  export function create(): CellStorage {
    const items: [string, string | undefined][] = [
      ["Аперо", "./items/apero.png"],
      ["Гильдия авторов", "./items/authors-guild.png"],
      ["Axma", "./items/axma.png"],
      ["Choices", "./items/choices.png"],
      ["FireURQ", "./items/furq.png"],
      ["Книги-игры", "./items/gamebook.png"],
      ["Instead", "./items/instead.png"],
      ["Instory", "./items/instory.png"],
      ["Meander", "./items/meander.png"],
      ["MUD'ы", "./items/mud.png"],
      ["MURQ", "./items/murq.png"],
      ["Парсеры", "./items/parsers.png"],
      ["QSP", "./items/qsp.png"],
      ["Квестбук", "./items/questbook.png"],
      ["RenPy", "./items/renpy.png"],
      ["Rinform", "./items/rinform.png"],
      ["Rtads", "./items/rtads.png"],
      ["Storymaze2.0", "./items/storymaze2.0.png"],
      ["ТК: играй, пиши", "./items/tk.png"],
      ["Twine", "./items/twine.png"],
      ["Визуальные новеллы", "./items/vn.png"],
    ]
    return items.map(([description, imageSrc]) => ({
      description,
      imageSrc,
    }))
  }

  export function updateCell(
    cellStorage: CellStorage,
    cellIndex: number,
    updateCell: (cell: CellData) => CellData
  ) : CellStorage {
    return update(cellStorage, {
      [cellIndex]: { $apply: (cell) => {
        return updateCell(cell)
      }}
    })
  }
}

export default CellStorage
