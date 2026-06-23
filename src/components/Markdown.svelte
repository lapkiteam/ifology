<script lang="ts">
  import { marked, type TokensList } from 'marked'
  // import DOMPurify from 'dompurify'
  import { Option } from "@fering-org/functional-helper"

  import { concat } from '../lib/utils'
  import Block from "./Markdown/Block.svelte"

  export let content = ''
  // export let allowHtml = false

  let html: Option<TokensList> = undefined

  // const renderer: Partial<Renderer> = {
  //   link({ href, title, tokens }) {
  //     const attributes = concat([
  //       `href="${href}"`,
  //       `class="${concat([
  //         "text-blue-800",
  //         "dark:text-blue-400",
  //       ])}"`,
  //       title ? ` title="${title}"` : "",
  //       `target="_blank"`,
  //       `rel="noopener noreferrer"`,
  //     ])
  //     const text = this.parser?.parseInline(tokens)
  //     return `<a ${attributes}>${text}</a>`
  //   }
  // }

  // marked.use({ renderer })

  marked.setOptions({
    breaks: false,
  })

  // DOMPurify.setConfig({ ADD_ATTR: ['target'] })

  // DOMPurify.addHook('afterSanitizeAttributes', (node) => {
  //   if (node.tagName === 'A' && node.getAttribute('target') === '_blank') {
  //     if (!node.getAttribute('rel')) node.setAttribute('rel', 'noopener noreferrer')
  //   }
  // })

  marked.parse
  $: {
    html = Option.mkSome(marked.lexer(content, { async: false }))
    // if (!allowHtml) {
    //   html = DOMPurify.sanitize(html, { ALLOWED_TAGS: undefined })
    // } else {
    //   html = DOMPurify.sanitize(html)
    // }
  }
</script>

<div class="markdown-render">
  {#if html}
    {#each html as token}
      <Block token={token} />
    {/each}
  {/if}
</div>
