<script lang="ts">
  import { type Token, type Tokens } from "marked"

  import Inline from "./Inline.svelte"

  export let token: Token
  let paragraph = token as Tokens.Paragraph
</script>

<p>
  {#each paragraph.tokens as token}
    <Inline token={token} />
  {/each}
</p>
