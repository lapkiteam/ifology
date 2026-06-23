<script lang="ts">
  import { type Token, type Tokens } from "marked"

  export let token: Token
  let html = token as Tokens.HTML
</script>

{@html html.text}
