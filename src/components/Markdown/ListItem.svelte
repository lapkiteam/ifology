<script lang="ts">
  import { type Token, type Tokens } from "marked"

  import Inline from "./Inline.svelte"

  export let token: Token
  const listItem = token as Tokens.ListItem
</script>

<li>
  {#each listItem.tokens as item}
    <Inline token={item} />
  {/each}
</li>
