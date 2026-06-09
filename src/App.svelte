<script lang="ts">
  import { concat } from "./lib/utils"
  import CellStorage from "./stores/cellStorage"
  import NavBar from "./components/NavBar.svelte"
  import Table from "./components/Table.svelte"
  import Modal from "./components/Modal.svelte"

  let cells: CellStorage = CellStorage.create()

  let isModal = false
  function openModal() { isModal = true }
  function closeModal() { isModal = false }
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
              openModal()
            }}
          />
        </div>
      </div>
      <Modal
        bind:open={isModal}
        title="Пример модального окна"
        on:close={closeModal}
      >
        <p>Текст внутри модального окна. Здесь можно разместить форму или сообщение.</p>

        <button slot="secondary" class="px-3 py-1 rounded border" on:click={closeModal}>
          Отмена
        </button>
        <button slot="primary" class="px-3 py-1 bg-blue-600 text-white rounded">
          Сохранить
        </button>
      </Modal>

    </div>
  </div>
</main>
