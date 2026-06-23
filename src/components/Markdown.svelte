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
</script>

<div>
  {#if html}
    {#each html as token}
      <Block token={token} />
    {/each}
  {/if}
</div>
