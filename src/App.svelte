<script lang="ts">
  import { concat } from "./lib/utils"
  import Routes from "./routes/Index.svelte"
  import NavBar from "./components/NavBar.svelte"
</script>

<main class={concat([
  "flex",
  "flex-col",
  "h-dvh",
  "h-[calc(var(--vh,_1vh)_*_100)]",
  "bg-[#e5e5e5]",
  "dark:bg-gray-800",
  "dark:text-white",
])}>
  <NavBar />
  <div class={concat([
    "grow",
    "flex",
    "px-2",
    "py-2",
    "overflow-y-auto",
  ])}>
    <Routes />
  </div>
</main>
