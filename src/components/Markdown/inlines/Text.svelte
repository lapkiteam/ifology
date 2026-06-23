<script lang="ts">
  import { type Token, type Tokens } from "marked"

  import Inline from "../Inline.svelte"

  export let token: Token
  let text = token as Tokens.Text

</script>

{#if text.tokens}
  {#each text.tokens as item}
    <Inline token={item} />
  {/each}
{:else}
  {text.text}
{/if}

