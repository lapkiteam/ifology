<script lang="ts" generics="Ok">
  import { type Result } from "@fering-org/functional-helper"

  import { concat } from "../lib/utils"

	interface $$Slots {
    default: {
      ok: Ok
    }
  }

  export let item: Result<Ok, any>
</script>

{#if item[0] === "Error"}
  <div>
    <h1>Error</h1>
    <pre class={concat([
      "text-red-300"
    ])}>{JSON.stringify(item[1], undefined, 2)}</pre>
  </div>
{:else}
  <slot ok={item[1]} />
{/if}
