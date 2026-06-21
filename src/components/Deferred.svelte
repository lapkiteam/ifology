<script lang="ts">
  import { type Deferred } from "@fering-org/functional-helper"

  import { concat } from "../lib/utils"

  export let deferred: Deferred<any>
</script>

{#if deferred.case === "Resolved"}
  <slot resolved={deferred.fields} />
{:else if deferred.case === "HasNotStartedYet"}
  <div>HasNotStartedYet</div>
{:else if deferred.case === "InProgress"}
  <div>InProgress</div>
{/if}
