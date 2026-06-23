<script lang="ts">
  import { type Token } from "marked"

  import Text from "./inlines/Text.svelte"
  import Link from "./inlines/Link.svelte"

  export let token: Token
</script>

{#if token.type === "text"}
  <Text token={token} />
{:else if token.type === "link"}
  <Link token={token} />
{:else}
  <pre>{JSON.stringify(token, undefined, 2)}</pre>
{/if}
