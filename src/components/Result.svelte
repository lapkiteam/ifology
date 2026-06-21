<script lang="ts">
  import { type Result } from "@fering-org/functional-helper"

  import { concat } from "../lib/utils"

  export let item: Result<any, string>
</script>

{#if item[0] === "Error"}
  <h1>Error</h1>
  <pre>{item[1]}</pre>
{:else}
  <slot ok={item[1]} />
{/if}
