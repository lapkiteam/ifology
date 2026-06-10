import update from "immutability-helper"
import CellData from "./cellData"

export type CellStorage = CellData[]

export namespace CellStorage {
  export function create(): CellStorage {
    const items: CellStorage = [
      {
        description: "Аперо",
        imageSrc: "./items/apero.png",
      },
      {
        description: "Гильдия авторов",
        imageSrc: "./items/authors-guild.png",
      },
      {
        description: "Axma",
        imageSrc: "./items/axma.png",
      },
      {
        description: "Choices",
        imageSrc: "./items/choices.png",
      },
      {
        description: "FireURQ",
        imageSrc: "./items/furq.png",
      },
      {
        description: "Книги-игры",
        imageSrc: "./items/gamebook.png",
      },
      {
        description: "Instead",
        imageSrc: "./items/instead.png",
      },
      {
        description: "Instory",
        imageSrc: "./items/instory.png",
      },
      {
        description: "Meander",
        imageSrc: "./items/meander.png",
      },
      {
        description: "MUD'ы",
        imageSrc: "./items/mud.png",
      },
      {
        description: "MURQ",
        imageSrc: "./items/murq.png",
      },
      {
        description: "Парсеры",
        imageSrc: "./items/parsers.png",
      },
      {
        description: "QSP",
        imageSrc: "./items/qsp.png",
      },
      {
        description: "Квестбук",
        imageSrc: "./items/questbook.png",
      },
      {
        description: "RenPy",
        imageSrc: "./items/renpy.png",
      },
      {
        description: "Rinform",
        imageSrc: "./items/rinform.png",
      },
      {
        description: "Rtads",
        imageSrc: "./items/rtads.png",
      },
      {
        description: "Storymaze2.0",
        imageSrc: "./items/storymaze2.0.png",
      },
      {
        description: "ТК: играй, пиши",
        imageSrc: "./items/tk.png",
      },
      {
        description: "Twine",
        imageSrc: "./items/twine.png",
      },
      {
        description: "Визуальные новеллы",
        imageSrc: "./items/vn.png",
      }
    ]
    return items
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
