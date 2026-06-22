<script lang="ts">
  import { createEventDispatcher } from "svelte"

  import { concat } from "../lib/utils"

  export let open = false
  export let title = ""
  const dispatch = createEventDispatcher()

  function close() {
    dispatch("close")
  }
</script>

{#if open}
  <div
    class={concat([
      "fixed",
      "inset-0",
      "z-50",
      "flex",
      "items-center",
      "justify-center",
    ])}
    aria-modal="true"
    role="dialog"
    aria-labelledby="modal-title"
  >
    <!-- Backdrop -->
    <div
      class="fixed inset-0 bg-black/50 transition-opacity"
      aria-hidden
      on:click={close}
    />

    <!-- Modal panel -->
    <div
      class="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-lg w-full mx-4 p-6 z-10 outline-none"
    >
      <div class="flex items-start justify-between space-x-4">
        <h2 id="modal-title" class="text-lg font-semibold text-gray-800 dark:text-gray-100">{title}</h2>
        <button
          class="text-gray-500 hover:text-gray-700 dark:text-gray-300"
          aria-label="Close"
          on:click={close}
        >
          <!-- simple X -->
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div class="mt-2 text-sm text-gray-600 dark:text-gray-300">
        <slot />
      </div>

      <div class="mt-6 flex justify-end gap-2">
        <slot name="secondary" />
        <slot name="primary" />
      </div>
    </div>
  </div>
{/if}
