<script lang="ts">
  import { type Option } from "@fering-org/functional-helper"

  import { concat } from "../lib/utils"
  import { type CellStorage } from "../stores/cellStorage"
  import ResultCellStorageItem from "./ResultCellStorageItem.svelte"

  export let cells: CellStorage
  export let onClick: Option<(cellIndex: number) => void> = undefined
  export let onDrop: Option<(cellIndex: number) => void> = undefined
  export let onDropAllow: Option<(cellIndex: number) => boolean> = undefined
</script>

<div class={concat([
  "w-full",
  "h-full",
  "grid",
  "grid-cols-[repeat(auto-fill,minmax(165px,1fr))]",
  "gap-x-2",
  "gap-y-4",
])}>
  {#each cells as cell, cellIndex}
    {#if cell.case === "Resolved"}
      <ResultCellStorageItem
        item={cell.fields}
        onClick={() => {
          if (onClick) {
            onClick(cellIndex)
          }
        }}
        onDrop={() => {
          if (onDrop) {
            onDrop(cellIndex)
          }
        }}
        onDropAllow={(() => {
          if (onDropAllow) {
            return () => onDropAllow(cellIndex)
          }
        })()}
      />
    {:else if cell.case === "HasNotStartedYet"}
      <div>HasNotStartedYet</div>
    {:else if cell.case === "InProgress"}
      <div>InProgress</div>
    {/if}
  {/each}
</div>
