import update from "immutability-helper"
import CellData from "./cellData"

export type CellStorage = CellData[]

export namespace CellStorage {
  export function create(): CellStorage {
    const items: CellStorage = [
      {
        title: "Аперо",
        imageSrc: "./items/apero.png",
      },
      {
        title: "Гильдия авторов",
        imageSrc: "./items/authors-guild.png",
      },
      {
        title: "Axma",
        imageSrc: "./items/axma.png",
      },
      {
        title: "Choices",
        imageSrc: "./items/choices.png",
      },
      {
        title: "FireURQ",
        imageSrc: "./items/furq.png",
      },
      {
        title: "Книги-игры",
        imageSrc: "./items/gamebook.png",
      },
      {
        title: "Instead",
        imageSrc: "./items/instead.png",
      },
      {
        title: "Instory",
        imageSrc: "./items/instory.png",
      },
      {
        title: "Meander",
        imageSrc: "./items/meander.png",
      },
      {
        title: "MUD'ы",
        imageSrc: "./items/mud.png",
      },
      {
        title: "MURQ",
        imageSrc: "./items/murq.png",
      },
      {
        title: "Парсеры",
        imageSrc: "./items/parsers.png",
      },
      {
        title: "QSP",
        imageSrc: "./items/qsp.png",
      },
      {
        title: "Квестбук",
        imageSrc: "./items/questbook.png",
      },
      {
        title: "RenPy",
        imageSrc: "./items/renpy.png",
      },
      {
        title: "Rinform",
        imageSrc: "./items/rinform.png",
      },
      {
        title: "Rtads",
        imageSrc: "./items/rtads.png",
      },
      {
        title: "Storymaze2.0",
        imageSrc: "./items/storymaze2.0.png",
      },
      {
        title: "ТК: играй, пиши",
        imageSrc: "./items/tk.png",
      },
      {
        title: "Twine",
        imageSrc: "./items/twine.png",
      },
      {
        title: "Визуальные новеллы",
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
