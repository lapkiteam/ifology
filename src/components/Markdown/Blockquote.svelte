<script lang="ts">
  import { type Token, type Tokens } from "marked"

  import Block from "./Block.svelte"

  export let token: Token
  const blockquote = token as Tokens.Blockquote
</script>

<blockquote>
  {#each blockquote.tokens as item}
    <Block token={item} />
  {/each}
</blockquote>
