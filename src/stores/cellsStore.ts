import { writable } from "svelte/store"

import CellStorage from "./cellStorage"

export const cellsStore = writable<CellStorage>(
  CellStorage.create((index, updatedItem) => {
    cellsStore.update(cellsStore =>
      CellStorage.updateCell(cellsStore, index, _ => updatedItem)
    )
  })
)

export default cellsStore
