<script lang="ts">
  import { type Token, type Tokens } from "marked"

  import Inlines from "./inlines/index.svelte"

  export let token: Token
  let heading = token as Tokens.Heading
</script>

{#if heading.depth === 1}
  <h1>
    <Inlines tokens={heading.tokens} />
  </h1>
{:else if heading.depth === 2}
  <h2>
    <Inlines tokens={heading.tokens} />
  </h2>
{:else if heading.depth === 3}
  <h3>
    <Inlines tokens={heading.tokens} />
  </h3>
{:else if heading.depth === 4}
  <h4>
    <Inlines tokens={heading.tokens} />
  </h4>
{:else if heading.depth === 5}
  <h5>
    <Inlines tokens={heading.tokens} />
  </h5>
{:else if heading.depth === 6}
  <h6>
    <Inlines tokens={heading.tokens} />
  </h6>
{:else}
  <h6>
    <Inlines tokens={heading.tokens} />
  </h6>
{/if}
