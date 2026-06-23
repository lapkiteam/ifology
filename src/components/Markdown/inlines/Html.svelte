<script lang="ts">
  import { type Token, type Tokens } from "marked"
  import DOMPurify from "dompurify"

  export let token: Token
  let html = token as Tokens.HTML
</script>

{@html DOMPurify.sanitize(html.text)}
