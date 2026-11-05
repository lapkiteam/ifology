<script lang="ts">
  import Router, { type RouteDefinition } from "svelte-spa-router"

  import Items from "./Items/Index.svelte"
  import Item from "./Item.svelte"

  export const routes: RouteDefinition = {
    "/": Items,
    "/items/:id": Item,
  }
</script>

<Router routes={routes} />
