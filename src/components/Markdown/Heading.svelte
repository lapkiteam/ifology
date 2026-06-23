<script lang="ts">
  import { type Token, type Tokens } from "marked"

  import Inlines from "./Inlines.svelte"

  export let token: Token
  let heading = token as Tokens.Heading
</script>

<!-- todo: handle heading.depth -->
<h1>
  <Inlines tokens={heading.tokens} />
</h1>
