<script lang="ts">
  import { type Token, type Tokens } from "marked"

  import ListItem from "./ListItem.svelte"

  export let token: Token
  const list = token as Tokens.List
</script>

<!-- todo: make ordered list case -->
<ul>
  {#each list.items as item}
    {#if item.type === "list_item"}
      <ListItem token={item} />
    {:else}
      <pre>{JSON.stringify(item, undefined, 2)}</pre>
    {/if}
  {/each}
</ul>
