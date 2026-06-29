<script lang="ts">
  import { link } from "svelte-spa-router"

  import { concat } from "../lib/utils"
</script>

<nav
  class={concat([
    "shrink-0",
    "w-full",
    "h-[55px]",
    "px-[8px]",
    "py-[4px]",
    "flex",
    "dark:bg-gray-900",
  ])}
>
  <div
    id="left"
    class={concat([
      "grow",
      "flex",
      "items-center",
      "gap-[10px]",
    ])}
  >
    <a
      class={concat([
        "text-xl",
      ])}
      href="/"
      use:link
    >
      ИФология
    </a>
  </div>
  <div
    id="right"
    class={concat([

    ])}
  >
    <a
      class={concat([
        "w-11",
        "h-full",
        "flex",
        "items-center",
        "fill-[#222034]",
        "dark:fill-[#DDDFCB]",
        "hover:fill-[#45283c]",
        "dark:hover:fill-[#BAD7C3]",
        "focus:fill-[#663931]",
        "dark:focus:fill-[#99C6CE]",
        "active:fill-[#663931]",
        "dark:active:fill-[#99C6CE]",
      ])}
      href="https://github.com/lapkiteam/ifology"
      target="_blank"
    >
      <svg viewBox="0 0 16 16">
        <use xlink:href="github-icon.svg#root" href="github-icon.svg#root" />
      </svg>
    </a>
  </div>
</nav>
