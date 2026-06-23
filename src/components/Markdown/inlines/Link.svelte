<script lang="ts">
  import { type Token, type Tokens } from "marked"

  import { concat } from "../../../lib/utils"
  import Inlines from "../Inlines.svelte"

  export let token: Token
  let link = token as Tokens.Link

</script>

<a
  class={concat([
    "text-blue-800",
    "dark:text-blue-400",
  ])}
  href={link.href}
  title={link.title}
  target="_blank"
>
  <Inlines tokens={link.tokens} />
</a>
