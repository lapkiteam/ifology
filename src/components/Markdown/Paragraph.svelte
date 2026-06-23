<script lang="ts">
  import { type Token, type Tokens } from "marked"

  import Inlines from "./inlines/index.svelte"

  export let token: Token
  let paragraph = token as Tokens.Paragraph
</script>

<p>
  <Inlines tokens={paragraph.tokens} />
</p>
