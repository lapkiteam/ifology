<script lang="ts">
  import { type Token } from "marked"
  import Heading from "./Heading.svelte"
  import Paragraph from "./Paragraph.svelte"

  export let token: Token
</script>

<div>
  {#if token.type === "heading"}
    <Heading token={token} />
  {:else if token.type === "paragraph"}
    <Paragraph token={token} />
  {/if}
</div>
