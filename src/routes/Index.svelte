<script lang="ts">
  import Router, { type RouteDefinition } from "svelte-spa-router"

  import Home from "./Home.svelte"
  import Items from "./Items.svelte"

  export const routes: RouteDefinition = {
    "/": Home,
    "/items/:id": Items,
  }
</script>

<Router routes={routes} />
