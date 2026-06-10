<script lang="ts">
  import { Option } from "@fering-org/functional-helper"

  import { concat } from "./lib/utils"
  import CellStorage, { type CellIndex } from "./stores/cellStorage"
  import NavBar from "./components/NavBar.svelte"
  import Table from "./components/Table.svelte"
  import Modal from "./components/Modal.svelte"

  let cells: CellStorage = CellStorage.create()

  let modalState: Option<CellIndex> = Option.mkNone()

  $: modalOpened = Option.isSome(modalState)

  $: modalTitle = (() => {
    return Option.reduce(
      modalState,
      (modalState) => cells[modalState].title,
      () => "Элемент не найден"
    )
  })()

  $: modalDescription = (() => {
    return Option.reduce(
      modalState,
      (modalState) =>
        cells[modalState].description || "Описание отсутствует",
      () => "Элемент не найден"
    )
  })()

  function modalOpen(index: CellIndex) {
    modalState = Option.mkSome(index)
  }

  function modalClose() {
    modalState = Option.mkNone()
  }
</script>

<main>
  <div class={concat([
    "flex",
    "justify-center",
  ])}>
    <div class={concat([
      "relative", // for children with absolute
      "w-full",
      "h-dvh",
      "h-[calc(var(--vh,_1vh)_*_100)]",
      "bg-[#e5e5e5]",
      "dark:bg-gray-800",
      "dark:text-white",
      "flex",
      "flex-col",
    ])}>
      <NavBar />
      <div class={concat([
        "size-full",
        "px-[4px]",
        "flex",
        "flex-col",
        "items-center",
        "gap-[2px]",
        "overflow-y-auto",
      ])}>
        <div class={concat([
          "flex-grow",
          "overflow-y-auto",
        ])}>
          <Table
            cells={cells}
            onClick={cellIndex => {
              modalOpen(cellIndex)
            }}
          />
        </div>
      </div>
      <Modal
        bind:open={modalOpened}
        bind:title={modalTitle}
        on:close={modalClose}
      >
        <p>{modalDescription}</p>

        <button slot="secondary" class="px-3 py-1 rounded border" on:click={modalClose}>
          Закрыть
        </button>
      </Modal>
    </div>
  </div>
</main>
