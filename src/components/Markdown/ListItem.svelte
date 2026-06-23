<script lang="ts">
  import { type Token, type Tokens } from "marked"

  import Inlines from "./inlines/index.svelte"

  export let token: Token
  const listItem = token as Tokens.ListItem
</script>

<li>
  <Inlines tokens={listItem.tokens} />
</li>
