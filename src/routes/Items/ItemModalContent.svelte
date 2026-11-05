<script lang="ts">
  import { concat } from "../../lib/utils"
  import Markdown from "../../components/Markdown.svelte"

  export let image: string
  export let description: string
</script>

<div class={concat([
  "flex",
  "justify-center",
])}>
  <img
    class={concat([
      "h-32",
      "object-contain",
    ])}
    src={image}
    alt=""
  >
</div>
<div class="mt-2">
  <Markdown content={description} />
</div>
