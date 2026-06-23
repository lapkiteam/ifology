<script lang="ts">
  import { type Token, type Tokens } from "marked"

  import { concat } from "../../lib/utils"
  import Block from "./Block.svelte"

  export let token: Token
  const blockquote = token as Tokens.Blockquote
</script>

<blockquote class={concat([
  "relative",
  "overflow-hidden",
  "px-4",
  "py-2",
  "bg-gray-200",
  "dark:bg-gray-700",
])}>
  <span class={concat([
    "absolute",
    "left-0",
    "top-0",
    "h-full",
    "w-1",
    "bg-gray-600",
    "dark:bg-gray-600",
  ])} />
  {#each blockquote.tokens as item}
    <Block token={item} />
  {/each}
</blockquote>
