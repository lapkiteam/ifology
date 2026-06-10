<script lang="ts">
  import { marked, Renderer } from 'marked'
  import DOMPurify from 'dompurify'

  export let content = ''
  export let allowHtml = false

  let html = ''

  const renderer: Partial<Renderer> = {
    link({ href, title, tokens }) {
      const text = this.parser?.parseInline(tokens)
      const titleAttr = title ? ` title="${title}"` : ''
      return `<a href="${href}"${titleAttr} target="_blank" rel="noopener noreferrer">${text}</a>`
    }
  };

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

<style>
  .markdown-render {
    font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
    line-height: 1.6;
    color: inherit;
  }
  .markdown-render pre {
    background: #0f1720;
    color: #e6edf3;
    padding: 0.75rem;
    border-radius: 6px;
    overflow: auto;
  }
  .markdown-render code {
    background: rgba(27,31,35,0.05);
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
  }
  .markdown-render img {
    max-width: 100%;
    height: auto;
  }
</style>
