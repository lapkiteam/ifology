<script lang="ts">
  import { type Token } from "marked"

  import Inline from "./Inline.svelte"

  export let tokens: Token[]
</script>

{#each tokens as token}
  <Inline token={token} />
{/each}
