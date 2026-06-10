<script lang="ts">
  import { marked, Renderer } from 'marked'
  import DOMPurify from 'dompurify'

  import { concat } from '../lib/utils'

  export let content = ''
  export let allowHtml = false

  let html = ''

  const renderer: Partial<Renderer> = {
    link({ href, title, tokens }) {
      const attributes = concat([
        `href="${href}"`,
        `class="${concat([
          "text-blue-800",
          "dark:text-blue-400",
        ])}"`,
        title ? ` title="${title}"` : "",
        `target="_blank"`,
        `rel="noopener noreferrer"`,
      ])
      const text = this.parser?.parseInline(tokens)
      return `<a ${attributes}>${text}</a>`
    }
  }

  marked.use({ renderer })

  marked.setOptions({
    breaks: false,
  })

  DOMPurify.setConfig({ ADD_ATTR: ['target'] })

  DOMPurify.addHook('afterSanitizeAttributes', (node) => {
    if (node.tagName === 'A' && node.getAttribute('target') === '_blank') {
      if (!node.getAttribute('rel')) node.setAttribute('rel', 'noopener noreferrer')
    }
  })

  $: {
    html = marked.parse(content, {}) as string
    if (!allowHtml) {
      html = DOMPurify.sanitize(html, { ALLOWED_TAGS: undefined })
    } else {
      html = DOMPurify.sanitize(html)
    }
  }
</script>

<div class="markdown-render">
  {@html html}
</div>
