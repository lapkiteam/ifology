<script lang="ts">
  import { type Token, type Tokens } from "marked"

  import { concat } from "../../lib/utils"
  import Inlines from "./Inlines.svelte"

  export let token: Token
  let paragraph = token as Tokens.Paragraph
</script>

<p class={concat([
  "mb-2"
])}>
  <Inlines tokens={paragraph.tokens} />
</p>
