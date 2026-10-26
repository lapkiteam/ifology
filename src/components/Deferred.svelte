<script lang="ts" generics="T">
  import { type Deferred } from "@fering-org/functional-helper"

  import { concat } from "../lib/utils"

	interface $$Slots {
    default: {
      // Without this explicit specification, the type of the `resolved` variable in `let:resolved` is defined as `T | undefined`
      resolved: T
    }
  }

  export let deferred: Deferred<T>
</script>

{#if deferred.case === "Resolved"}
  <slot resolved={deferred.fields} />
{:else if deferred.case === "HasNotStartedYet"}
  <div>HasNotStartedYet</div>
{:else if deferred.case === "InProgress"}
  <div>InProgress</div>
{/if}
