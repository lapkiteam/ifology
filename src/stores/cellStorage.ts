import update from "immutability-helper"
import CellData from "./cellData"

export type CellIndex = number

export type CellStorage = CellData[]

export namespace CellStorage {
  export function create(): CellStorage {
    const items: CellStorage = [
      {
        title: "Аперо",
        imageSrc: "./items/apero.png",
        description: "apero",
      },
      {
        title: "Гильдия авторов",
        imageSrc: "./items/authors-guild.png",
        description: undefined,
      },
      {
        title: "Axma",
        imageSrc: "./items/axma.png",
        description: undefined,
      },
      {
        title: "Choices",
        imageSrc: "./items/choices.png",
        description: undefined,
      },
      {
        title: "FireURQ",
        imageSrc: "./items/furq.png",
        description: undefined,
      },
      {
        title: "Книги-игры",
        imageSrc: "./items/gamebook.png",
        description: undefined,
      },
      {
        title: "Instead",
        imageSrc: "./items/instead.png",
        description: undefined,
      },
      {
        title: "Instory",
        imageSrc: "./items/instory.png",
        description: undefined,
      },
      {
        title: "Meander",
        imageSrc: "./items/meander.png",
        description: undefined,
      },
      {
        title: "MUD'ы",
        imageSrc: "./items/mud.png",
        description: undefined,
      },
      {
        title: "MURQ",
        imageSrc: "./items/murq.png",
        description: undefined,
      },
      {
        title: "Парсеры",
        imageSrc: "./items/parsers.png",
        description: undefined,
      },
      {
        title: "QSP",
        imageSrc: "./items/qsp.png",
        description: undefined,
      },
      {
        title: "Квестбук",
        imageSrc: "./items/questbook.png",
        description: undefined,
      },
      {
        title: "RenPy",
        imageSrc: "./items/renpy.png",
        description: undefined,
      },
      {
        title: "Rinform",
        imageSrc: "./items/rinform.png",
        description: undefined,
      },
      {
        title: "Rtads",
        imageSrc: "./items/rtads.png",
        description: undefined,
      },
      {
        title: "Storymaze2.0",
        imageSrc: "./items/storymaze2.0.png",
        description: undefined,
      },
      {
        title: "ТК: играй, пиши",
        imageSrc: "./items/tk.png",
        description: undefined,
      },
      {
        title: "Twine",
        imageSrc: "./items/twine.png",
        description: undefined,
      },
      {
        title: "Визуальные новеллы",
        imageSrc: "./items/vn.png",
        description: undefined,
      }
    ]
    return items
  }

  export function updateCell(
    cellStorage: CellStorage,
    cellIndex: CellIndex,
    updateCell: (cell: CellData) => CellData,
  ) : CellStorage {
    return update(cellStorage, {
      [cellIndex]: { $apply: (cell) => {
        return updateCell(cell)
      }}
    })
  }
}

export default CellStorage
