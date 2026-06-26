<script lang="ts">
  import { concat } from "./lib/utils"
  import Routes from "./routes/Index.svelte"
  import NavBar from "./components/NavBar.svelte"
</script>

<main>
  <div class={concat([
    "flex",
    "justify-center",
  ])}>
    <div class={concat([
      "relative", // for children with absolute
      "w-full",
      "h-dvh",
      "h-[calc(var(--vh,_1vh)_*_100)]",
      "bg-[#e5e5e5]",
      "dark:bg-gray-800",
      "dark:text-white",
      "flex",
      "flex-col",
    ])}>
      <NavBar />
      <Routes />
    </div>
  </div>
</main>
