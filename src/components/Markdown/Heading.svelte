<script lang="ts">
  import { type Token, type Tokens } from "marked"

  export let token: Token
  let heading = token as Tokens.Heading
</script>

<pre>
  Heading: {JSON.stringify(heading, undefined, 2)}
</pre>
