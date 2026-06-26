import update from "immutability-helper"
import { Deferred, UnionCase, Result } from "@fering-org/functional-helper"
import { pipeInto } from "ts-functional-pipe"

import CellData from "./cellData"
import { MarkdownItemParser, type MarkdownItemParserError } from "./markdownItem"

export type CellId = string

export type CellIndex = number

export type CellDataError =
  | UnionCase<"FetchError", any>
  | UnionCase<"FetchNotFound", { statusCode: number }>
  | UnionCase<"MarkdownItemParserError", MarkdownItemParserError>

export type ResultCellStorageItem = Result<CellData, CellDataError>

export type DeferredCellStorageItem = Deferred<ResultCellStorageItem>

export type CellStorage = DeferredCellStorageItem[]

export namespace CellStorage {
  export function loadItem(
    id: CellId,
    callback: (item: ResultCellStorageItem) => void,
  ) {
    const url = `items/${id}.md`
    fetch(url)
      .then(response => {
        if (!response.ok) {
          callback(Result.mkError<CellDataError>(
            UnionCase.create(
              "FetchNotFound", {
                statusCode: response.status,
              }
            )
          ))
          return
        }
        response.text()
          .then(rawMarkdown => {
            callback(pipeInto(
              MarkdownItemParser.parse(rawMarkdown),
              result => Result.reduce(
                result,
                ok => Result.mkOk(
                  CellData.ofMarkdownItem(ok)
                ),
                err => Result.mkError<CellDataError>(
                  UnionCase.create("MarkdownItemParserError", err)
                ) as Result<CellData, CellDataError>
              )
            ))
          })
          .catch(err => {
            callback(
              Result.mkError<CellDataError>(
                UnionCase.create("FetchError", err)
              ) as Result<CellData, CellDataError>,
            )
          })
        })
        .catch(err => {
          callback(
            Result.mkError<CellDataError>(
              UnionCase.create("FetchError", err)
            ) as Result<CellData, CellDataError>,
          )
      })
  }

  export const predefinedItems: CellData[] = []

  export function create(
    updating: (itemIndex: number, updatedItem: DeferredCellStorageItem) => void,
  ): CellStorage {
    type Elem =
      | UnionCase<"Loaded", DeferredCellStorageItem>
      | UnionCase<"ToLoad", string>

    const predefinedItems2: Elem[] =
      predefinedItems.map(item => pipeInto(
          item,
          Result.mkOk,
          Deferred.resolved,
          x => UnionCase.create("Loaded", x)
        )
      )

    const toLoads: Elem[] = pipeInto(
      [
        "apero",
        "authors-guild",
        "axma",
        "choices",
        "furq",
        "gamebook",
        "instead",
        "instory",
        "meander",
        "mud",
        "murq",
        "parsers",
        "qsp",
        "questbook",
        "renpy",
        "rinform",
        "rtads",
        "storymaze2.0",
        "tk",
        "twine",
        "vn",
      ],
      xs => xs.map(fileName =>
        UnionCase.create("ToLoad", fileName)
      )
    )

    const all: CellStorage = pipeInto(
      [
        ...predefinedItems2,
        ...toLoads,
      ],
      items => items.map((item, index) => {
        switch (item.case) {
          case "Loaded":
            return item.fields
          case "ToLoad":
            const url = item.fields
            loadItem(url, updatedItem =>
              updating(index, Deferred.resolved(
                updatedItem
              ))
            )
            return Deferred.inProgress()
        }
      })
    )

    return all
  }

  export function updateCell(
    cellStorage: CellStorage,
    cellIndex: CellIndex,
    updateCell: (cell: DeferredCellStorageItem) => DeferredCellStorageItem,
  ) : CellStorage {
    return update(cellStorage, {
      [cellIndex]: { $apply: (cell) => {
        return updateCell(cell)
      }}
    })
  }
}

export default CellStorage
