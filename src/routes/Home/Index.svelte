<script lang="ts">
  import { Option } from "@fering-org/functional-helper"

  import { type CellIndex } from "../../stores/cellStorage"
  import cellsStore from "../../stores/cellsStore"
  import Table from "./Table.svelte"
  import ItemModal from "./ItemModal.svelte"

  let modalState: Option<CellIndex> = Option.mkNone()

  function modalOpen(index: CellIndex) {
    modalState = Option.mkSome(index)
  }

  function modalClose() {
    modalState = Option.mkNone()
  }
</script>

<Table
  cells={$cellsStore}
  onClick={cellIndex => {
    modalOpen(cellIndex)
  }}
/>
<ItemModal
  bind:state={modalState}
  close={modalClose}
/>
