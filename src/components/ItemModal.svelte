<script lang="ts">
  import { Option } from "@fering-org/functional-helper"
  import { push } from "svelte-spa-router"

  import { concat } from "../lib/utils"
  import { type CellIndex } from "../stores/cellStorage"
  import cellsStore from "../stores/cellsStore"
  import Modal from "./Modal.svelte"
  import Markdown from "./Markdown.svelte"
  import type CellData from "../stores/cellData"

  export let modalState: Option<CellIndex> = Option.mkNone()
  export let close: () => void

  function modalStateReduce(
    modalState: Option<CellIndex>,
    mapping: (cellData: CellData) => string,
  ) {
    return Option.reduce(
      modalState,
      (modalState) => {
        const cell = $cellsStore[modalState]
        if (cell.case === "HasNotStartedYet") {
          return "элемент не готов"
        }
        if (cell.case === "InProgress") {
          return "элемент не прогрузился"
        }
        const result = cell.fields
        if (result[0] === "Error") {
          return `Ошибка: ${result[1]}`
        }
        return mapping(result[1])
      },
      () => "Элемент не найден"
    )
  }

  $: modalOpened = Option.isSome(modalState)

  $: id = modalStateReduce(modalState, cellData =>
    cellData.id || ""
  )

  $: modalTitle = modalStateReduce(modalState, cellData =>
    cellData.title || ""
  )

  $: modalImage = modalStateReduce(modalState, cellData =>
    cellData.imageSrc || ""
  )

  $: modalDescription = modalStateReduce(modalState, cellData =>
    cellData.description || "Описание отсутствует"
  )
</script>

<Modal
  bind:open={modalOpened}
  bind:title={modalTitle}
  on:close={close}
  shareOnClick={() => {
    push(`/items/${id}`)
  }}
>
  <div class={concat([
    "flex",
    "justify-center",
  ])}>
    <img
      class={concat([
        "h-32",
        "object-contain",
      ])}
      src={modalImage}
      alt=""
    >
  </div>
  <div class="mt-2">
    <Markdown content={modalDescription} />
  </div>
  <button slot="secondary" class="px-3 py-1 rounded border" on:click={close}>
    Закрыть
  </button>
</Modal>
