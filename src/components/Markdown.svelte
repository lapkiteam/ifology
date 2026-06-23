<script lang="ts">
  import { marked, type TokensList } from 'marked'
  import { Option } from "@fering-org/functional-helper"

  import Block from "./Markdown/Block.svelte"

  export let content = ''

  let html: Option<TokensList> = undefined

  $: {
    html = Option.mkSome(
      marked.lexer(content, { async: false })
    )
  }
  const isLast = (index: number) =>
    Option.reduce(
      html,
      html => index === html.length - 1,
      () => false,
    )
</script>

<div>
  {#if html}
    {#each html as token, index}
      <Block token={token} last={isLast(index)} />
    {/each}
  {/if}
</div>
