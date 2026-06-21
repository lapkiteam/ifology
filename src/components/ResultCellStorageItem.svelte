<script lang="ts">
  import { Option } from "@fering-org/functional-helper"

  import { concat } from "../lib/utils"
  import type { ResultCellStorageItem } from "../stores/cellStorage"
  import Cell from "./Cell.svelte"

  export let item: ResultCellStorageItem
  export let onClick: Option<() => void> = undefined
  export let onDrop: Option<() => void> = undefined
  export let onDropAllow: Option<() => boolean> = undefined
</script>

{#if item[0] === "Error"}
  <h1>Error</h1>
  <pre>{item[1]}</pre>
{:else}
  <Cell
    description={item[1].title || ""}
    imageSrc={item[1].imageSrc}
    onClick={onClick}
    onDrop={onDrop}
    onDropAllow={onDropAllow}
  />
{/if}
