import update from "immutability-helper"
import { Deferred, UnionCase, Result } from "@fering-org/functional-helper"
import { pipeInto } from "ts-functional-pipe"

import CellData from "./cellData"
import { MarkdownItemParser, type MarkdownItemParserError } from "./markdownItem"

export type CellIndex = number

export type CellDataError =
  | UnionCase<"FetchError", any>
  | UnionCase<"MarkdownItemParserError", MarkdownItemParserError>

export type ResultCellStorageItem = Result<CellData, CellDataError>

export type DeferredCellStorageItem = Deferred<ResultCellStorageItem>

export type CellStorage = DeferredCellStorageItem[]

export namespace CellStorage {
  export function create(
    updating: (itemIndex: number, updatedItem: DeferredCellStorageItem) => void,
  ): CellStorage {
    const predefinedItems: CellData[] = [
      {
        title: "Гильдия авторов",
        imageSrc: "./items/authors-guild.png",
        description: [
          "Гильдия Авторов Интерактивной Литературы (ГАИЛ). Раньше их ИГИЛом называли."
        ].join("\n"),
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
        description: "Синее пламя — иконка платформы.",
      },
      {
        title: "Книги-игры",
        imageSrc: "./items/gamebook.png",
        description: [
          "[Книги-игры](https://ifwiki.ru/Книга-игра) — [трад](https://knowyourmeme.com/memes/cultures/trad)ионные игры ИФни и первые в своем роде."
        ].join("\n"),
      },
      {
        title: "Instead",
        imageSrc: "./items/instead.png",
        description: "Красноглазые линуксоиды, сектанты, [квантовый кот](https://ifwiki.ru/Возвращение_квантового_кота), лифт, [лесник](https://ifwiki.ru/Вызволение_детерминированного_лесника)",
      },
      {
        title: "Instory",
        imageSrc: "./items/instory.png",
        description: undefined,
      },
      {
        title: "Meander",
        imageSrc: "./items/meander.png",
        description: "14-17 лет — средний возраст участников Мурмяндера. Об этом говорит [опрос на их канале в ТГ](https://t.me/meanderRU/1655). Вот и думайте.",
      },
      {
        title: "MUD'ы",
        imageSrc: "./items/mud.png",
        description: "Mud — с английского грязь.",
      },
      {
        title: "MURQ",
        imageSrc: "./items/murq.png",
        description: "Кот, потому что [мурк](https://github.com/realsonic/MURQ).",
      },
      {
        title: "Парсеры",
        imageSrc: "./items/parsers.png",
        description: [
          "Парсеры — игры для сверхразумов. Глагол не найден."
        ].join("\n"),
      },
      {
        title: "QSP",
        imageSrc: "./items/qsp.png",
        description: [
          "> Doom на QSP пока не писали?",
          ">",
          "> — Первый вопрос новичка в исполнении [Эдуарда из ИФ чат (чистилище)](https://t.me/ifiction_group/141292)",
          "",
          "Каждый автор пытается сделать [Куспом](https://ifwiki.ru/QSP) то, для чего он не предназначен.",
        ].join("\n")
      },
      {
        title: "Квестбук",
        imageSrc: "./items/questbook.png",
        description: [
          // todo
        ].join("\n"),
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
        description: [
          "Сторимейз 2.0 — это админ оригинального [Storymaze](https://ifwiki.ru/Storymaze). Говорит про телеграм бота, который сам пишет или помогает писать интерактивную историю с помощью ИИ и на основе анализа топа-100 опубликованных ранее сторимейзов."
        ].join("\n"),
      },
      {
        title: "ТК: играй, пиши",
        imageSrc: "./items/tk.png",
        description: [
          "[elChem](https://ifwiki.ru/Стрельников,_Артём) — химик по профессии. Он — главный представитель ТК.",
          "",
          "[Ошейник](https://ifwiki.ru/Ошейник) — магнус опус всея ТК.",
        ].join("\n"),
      },
      {
        title: "Twine",
        imageSrc: "./items/twine.png",
        description: "Twine — c английского шпагат, бечёвка, обвивать.",
      },
      {
        title: "Визуальные новеллы",
        imageSrc: "./items/vn.png",
        description: "Япония, кимоно, сакура.",
      }
    ]

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
        "items/apero.md"
      ],
      xs => xs.map(url =>
        UnionCase.create("ToLoad", url)
      )
    )

    function load(url: string, index: number) {
      fetch(url)
        .then(response => {
          response.text()
            .then(rawMarkdown => {
              updating(index, pipeInto(
                rawMarkdown,
                rawMarkdown => pipeInto(
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
                ),
                Deferred.resolved
              ))
            })
            .catch(err => {
              UnionCase.create("FetchError", err)
            })
        })
        .catch(err => {
          Result.mkError<CellDataError>(
            UnionCase.create("FetchError", err)
          )
        })
    }

    const all: CellStorage = pipeInto(
      [...predefinedItems2, ...toLoads],
      items => items.map((item, index) => {
        switch (item.case) {
          case "Loaded":
            return item.fields
          case "ToLoad":
            const url = item.fields
            load(url, index)
            return Deferred.hasNotStartedYet()
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
