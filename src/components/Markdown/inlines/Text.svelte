<script lang="ts">
  import { type Token, type Tokens } from "marked"

  export let token: Token
  let text = token as Tokens.Text
</script>

{text.text}
