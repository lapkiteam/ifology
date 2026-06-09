<script lang="ts">
  import { type Option } from "@fering-org/functional-helper"

  import { concat } from "./lib/utils"
  import CellStorage from "./stores/cellStorage"
  import NavBar from "./components/NavBar.svelte"
  import Table from "./components/Table.svelte"

  let cells: CellStorage = CellStorage.create()
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
              /* todo */
            }}
          />
        </div>
      </div>
    </div>
  </div>
</main>
