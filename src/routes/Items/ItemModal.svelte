<script lang="ts">
  import { Option } from "@fering-org/functional-helper"
  import { push } from "svelte-spa-router"

  import { concat } from "../../lib/utils"
  import { type CellIndex } from "../../stores/cellStorage"
  import cellsStore from "../../stores/cellsStore"
  import Modal from "../../components/Modal.svelte"
  import Markdown from "../../components/Markdown.svelte"
  import type CellData from "../../stores/cellData"

  export let state: Option<CellIndex> = Option.mkNone()
  export let close: () => void

  function stateReduce(
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

  $: opened = Option.isSome(state)

  $: id = stateReduce(state, cellData =>
    cellData.id || ""
  )

  $: title = stateReduce(state, cellData =>
    cellData.title || ""
  )

  $: image = stateReduce(state, cellData =>
    cellData.imageSrc || ""
  )

  $: description = stateReduce(state, cellData =>
    cellData.description || "Описание отсутствует"
  )
</script>

<Modal
  bind:open={opened}
  bind:title={title}
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
      src={image}
      alt=""
    >
  </div>
  <div class="mt-2">
    <Markdown content={description} />
  </div>
  <button slot="secondary" class="px-3 py-1 rounded border" on:click={close}>
    Закрыть
  </button>
</Modal>
