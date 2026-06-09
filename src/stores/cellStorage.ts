import update from "immutability-helper"
import CellData from "./cellData"

export type CellStorage = CellData[]

export namespace CellStorage {
  export function create(): CellStorage {
    const items: [string, string | undefined][] = [
      ["QSP", "https://placehold.co/600x400"],
      ["URQ", undefined],
      ["Instead", "https://placehold.co/400x600"],
      ["QSP", "https://placehold.co/600x400"],
      ["Instead", undefined],
      ["Instead", "https://placehold.co/400x600"],
      ["Гильдия квестов", "https://placehold.co/600x400"],
      ["URQ", undefined],
      ["Instead", "https://placehold.co/400x600"],
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
