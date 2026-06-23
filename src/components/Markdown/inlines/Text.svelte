<script lang="ts">
  import { type Token, type Tokens } from "marked"

  import Inlines from "./index.svelte"

  export let token: Token
  let text = token as Tokens.Text
</script>

{#if text.tokens}
  <Inlines tokens={text.tokens} />
{:else}
  {text.text}
{/if}

