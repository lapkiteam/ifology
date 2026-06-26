<script lang="ts">
  import { Deferred } from "@fering-org/functional-helper"

  import { concat } from "../lib/utils"
  import CellStorage, { type DeferredCellStorageItem, type CellId, type ResultCellStorageItem } from "../stores/cellStorage"
  import Markdown from "../components/Markdown.svelte"
  import DeferredView from "../components/Deferred.svelte"
  import type CellData from "../stores/cellData";

  export let id: CellId

  let item: DeferredCellStorageItem = Deferred.inProgress()

  CellStorage.loadItem(id, loadedItem => {
    item = Deferred.resolved(loadedItem)
  })

  function get(
    resolved: ResultCellStorageItem,
    map: (cellData: CellData) => string,
  ) {
    if (resolved[0] === "Error") {
      return JSON.stringify(resolved[1], undefined, 2)
    }
    return map(resolved[1])
  }
</script>

<div class={concat([
  "px-3",
  "pb-3",
  "flex",
  "flex-col",
  "overflow-y-auto",
])}>
  <DeferredView deferred={item} let:resolved>
    <h1 class={concat([
      "text-2xl",
      "text-center",
      "text-gray-800",
      "dark:text-gray-100",
    ])}>
      {get(resolved, x => x.title || "Название отсутствует")}
    </h1>
    <div class={concat([
      "flex",
      "justify-center",
      "mt-4",
    ])}>
      <img
        class={concat([
          "h-44",
          "object-contain",
        ])}
        src={get(resolved, x => x.imageSrc || "")}
        alt=""
      >
    </div>
    <div class="mt-6">
      <Markdown
        content={get(resolved, x =>
          x.description || "Описание отсутствует"
        )}
      />
    </div>
  </DeferredView>
</div>
