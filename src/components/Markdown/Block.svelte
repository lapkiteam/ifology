<script lang="ts">
  import { type Token } from "marked"

  import Heading from "./Heading.svelte"
  import Paragraph from "./Paragraph.svelte"
  import List from "./List.svelte"
  import Blockquote from "./Blockquote.svelte"

  export let token: Token
</script>

{#if token.type === "heading"}
  <Heading token={token} />
{:else if token.type === "paragraph"}
  <Paragraph token={token} />
{:else if token.type === "list"}
  <List token={token} />
{:else if token.type === "space"}
  <!-- empty -->
{:else if token.type === "blockquote"}
  <Blockquote token={token} />
{:else}
  <pre>{JSON.stringify(token, undefined, 2)}</pre>
{/if}
