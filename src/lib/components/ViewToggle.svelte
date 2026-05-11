<script>
  import { createEventDispatcher } from 'svelte'
  import { Settings, Grid3x3, LayoutList, UserSearch, Search, Filter, Rows3, Grid2x2, LayoutGrid, Grip } from 'lucide-svelte'

  const dispatch = createEventDispatcher()
  export let viewMode = 'table'
  export let showFilters = true
  let showSettings = showFilters

  $: showSettings = showFilters

  function toggleView(mode) {
    viewMode = mode
    dispatch('change', mode)
  }

  function toggleFilters() {
    showSettings = !showSettings
    dispatch('toggleFilters', showSettings)
  }
</script>

<div class="flex items-center gap-2">

  <button
    on:click={() => toggleView('cards')}
    class="p-2 rounded-full transition-all {viewMode === 'cards' 
      ? 'text-accent-light' 
      : 'text-slate-200 hover:bg-slate-700/50'}"
    title="Card view"
    aria-label="Switch to card view"
  >
    <Grip size={16} />
  </button>

  <button
    on:click={() => toggleView('table')}
    class="p-2 rounded-full transition-all {viewMode === 'table' 
      ? 'text-accent-light' 
      : 'text-slate-200 hover:bg-slate-700/50'}"
    title="Table view"
    aria-label="Switch to table view"
  >
    <Rows3 size={16} />
  </button>
  
  <button
    on:click={toggleFilters}
    class="p-2 rounded-full lg:hidden transition-all {showSettings 
      ? 'bg-accent-light text-slate-900' 
      : 'bg-slate-700/50 text-slate-200 hover:bg-slate-700/50'}"
    title="Toggle filters"
    aria-label="Toggle filter panel"
  >
    <Search size={20} />
  </button>
</div>
