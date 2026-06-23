<script lang="ts">
  import { type Token, type Tokens } from "marked"

  import { concat } from "../../lib/utils"
  import Block from "./Block.svelte"

  export let token: Token
  const blockquote = token as Tokens.Blockquote
  const isLast = (index: number) =>
    index === blockquote.tokens.length - 1
</script>

<blockquote class={concat([
  "relative",
  "overflow-hidden",
  "px-4",
  "py-2",
  "bg-gray-200",
  "dark:bg-gray-700",
  "before:absolute",
  "before:left-0",
  "before:top-0",
  "before:w-1",
  "before:h-full",
  "before:bg-gray-600",
  "before:dark:bg-gray-600",
])}>
  {#each blockquote.tokens as item, index}
    <Block token={item} last={isLast(index)} />
  {/each}
</blockquote>
