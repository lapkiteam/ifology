<script lang="ts">
  import { type Token, type Tokens } from "marked"

  import Inline from "./Inline.svelte"

  export let token: Token
  let heading = token as Tokens.Heading
</script>

<!-- todo: handle heading.depth -->
<h1>
  {#each heading.tokens as token}
    <Inline token={token} />
  {/each}
</h1>
