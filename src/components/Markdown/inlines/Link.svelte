<script lang="ts">
  import { type Token, type Tokens } from "marked"

  import { concat } from "../../../lib/utils"
  import Inline from "../Inline.svelte"

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
>
  {#each link.tokens as token}
    <Inline token={token} />
  {/each}
</a>
