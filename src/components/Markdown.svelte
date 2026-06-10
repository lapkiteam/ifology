<script lang="ts">
  import { marked } from 'marked'
  import DOMPurify from 'dompurify'

  export let content = ''       // markdown string
  export let allowHtml = false

  let html = ''

  $: {
    marked.setOptions({
      mangle: false,
      headerIds: true,
      breaks: false,
    })
    html = marked.parse(content, {
      mangle: false,
      headerIds: true,
      gfm: true,
      smartLists: true,
      smartypants: true,
      renderer: undefined,
    })
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
