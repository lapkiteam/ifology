<script lang="ts">
  import { type Token, type Tokens } from "marked"

  import ListItem from "./ListItem.svelte"
  import { concat } from "../../lib/utils"

  export let token: Token
  export let last:boolean

  const list = token as Tokens.List
</script>

<!-- todo: make ordered list case -->
<ul
  role="list"
  class={concat([
    "pl-4",
    "list-disc",
    last ? "" : "mb-2",
  ])}
>
  {#each list.items as item}
    {#if item.type === "list_item"}
      <ListItem token={item} />
    {:else}
      <pre>{JSON.stringify(item, undefined, 2)}</pre>
    {/if}
  {/each}
</ul>
