<script lang="ts">
  import { type Option } from "@fering-org/functional-helper"

  import { concat } from "../lib/utils"
  import { type CellStorage } from "../stores/cellStorage"
  import Result from "./Result.svelte"
  import Deferred from "./Deferred.svelte"
  import Cell from "./Cell.svelte"

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
    <Deferred deferred={cell} let:resolved>
      <Result item={resolved} let:ok>
        <Cell
          description={ok.title}
          imageSrc={ok.imageSrc}
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
      </Result>
    </Deferred>
  {/each}
</div>
