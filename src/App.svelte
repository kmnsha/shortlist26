<script>
  import { onMount } from 'svelte'
  import { filterPlayers, sortPlayers, getUniquePositions, getPriceRange, getWageRange, getUniqueTags } from './lib/utils'
  import FilterPanel from './lib/components/FilterPanel.svelte'
  import ViewToggle from './lib/components/ViewToggle.svelte'
  import TableView from './lib/components/TableView.svelte'
  import CardView from './lib/components/CardView.svelte'
  import PlayerDetail from './lib/components/PlayerDetail.svelte'

  let players = []
  let filteredPlayers = []
  let viewMode = 'cards' // 'table' or 'cards'
  let sortBy = 'wage'
  let sortDirection = 'desc'
  let selectedPlayer = null
  let showDetail = false
  let loading = true
  let error = null
  let showFilters = true


  // Filter state
  let filters = {
    name: '',
    position: [],
    priceRange: null,
    wageRange: null,
    heightRange: null,
    contractExpiry: ['freeAgents', '1yr', '2yr', 'longTerm'],
    tags: []
  }

  // Available options for filters
  let positions = []
  let priceRange = { min: 0, max: 0 }
  let wageRange = { min: 0, max: 0 }
  let allTags = []

  onMount(async () => {
    try {
      const response = await fetch('/data/shortlist26.json')
      if (!response.ok) throw new Error('Failed to load player data')
      
      players = await response.json()
      
      // Extract filter options
      positions = getUniquePositions(players)
      priceRange = getPriceRange(players)
      wageRange = getWageRange(players)
      allTags = getUniqueTags(players)
      filters = {
        ...filters,
        tags: [...allTags]
      }
      
      // Initial filter
      applyFiltersAndSort()
      loading = false
    } catch (err) {
      error = err.message
      loading = false
    }
  })

  function applyFiltersAndSort() {
    let result = filterPlayers(players, filters)
    result = sortPlayers(result, sortBy, sortDirection)
    filteredPlayers = result
  }

  function handleFilterChange(event) {
    filters = {
      ...event.detail,
      position: Array.isArray(event.detail.position) ? [...event.detail.position] : [],
      tags: Array.isArray(event.detail.tags) ? [...event.detail.tags] : [],
      priceRange: event.detail.priceRange ? { ...event.detail.priceRange } : null,
      wageRange: event.detail.wageRange ? { ...event.detail.wageRange } : null
    }
    applyFiltersAndSort()
  }

  function handleSort(event) {
    const { field, direction } = event.detail
    sortBy = field
    sortDirection = direction
    applyFiltersAndSort()
  }

  function handleToggleFilters(event) {
    showFilters = event.detail
  }

  function handlePlayerSelect(event) {
    selectedPlayer = event.detail
    showDetail = true
  }

  function handleCloseDetail() {
    showDetail = false
    selectedPlayer = null
  }

  function handleViewModeChange(event) {
    viewMode = event.detail
  }
</script>

<div class="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
  <!-- Header -->
  <header class="bg-slate-950 border-b border-slate-900 sticky top-0 z-40 shadow-lg">
    <div class="max-w-7xl mx-auto px-4 py-2 sm:px-6 lg:px-8">
      
      <div class="flex flex-col flex-auto gap-4 md:flex-row md:items-center md:justify-between">
        <div class="flex items-center gap-3">
          <img src="/img/badge-white.jpg" alt="Newcastle United" class="w-16 h-16" />
          <div>
            <h1 class="text-3xl"><img src="/img/logo.png" alt="Shortlist26" class="h-6" /></h1>
            <p class="text text-xs text-slate-300">Сезонът на заблатения Радев</p>
          </div>
        </div>
        <div class="flex items-center gap-4">
          <div class="text-sm text-slate-300">
            Showing <span class="font-bold text-sm text-accent-light font-medium">{filteredPlayers.length}</span> of <span class="font-bold">{players.length}</span> players
          </div>
          <ViewToggle on:change={handleViewModeChange} on:toggleFilters={handleToggleFilters} {viewMode} {showFilters} />
        </div>
      </div>
    </div>
  </header>

  <!-- Main Content -->
  <main class="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
    {#if loading}
      <div class="flex items-center justify-center h-64">
        <div class="text-center">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-light mx-auto mb-4"></div>
          <p class="text-slate-400">Loading players...</p>
        </div>
      </div>
    {:else if error}
      <div class="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded">
        <p class="font-semibold">Error loading data</p>
        <p class="text-sm">{error}</p>
      </div>
    {:else}
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <!-- Filter Panel -->
        {#if showFilters}
          <aside class="lg:col-span-1">
            <FilterPanel
              {positions}
              {priceRange}
              {wageRange}
              {allTags}
              {filters}
              on:change={handleFilterChange}
            />
          </aside>
        {/if}

        <!-- Player List -->
        <section class={showFilters ? 'lg:col-span-3' : 'lg:col-span-4'}>
          {#if filteredPlayers.length === 0}
            <div class="flex items-center justify-center h-64 bg-slate-800 rounded-lg border border-slate-600">
              <p class="text-slate-400">No players match your filters</p>
            </div>
          {:else if viewMode === 'table'}
            <TableView
              players={filteredPlayers}
              {sortBy}
              {sortDirection}
              on:sort={handleSort}
              on:selectPlayer={handlePlayerSelect}
            />
          {:else}
            <CardView
              players={filteredPlayers}
              on:selectPlayer={handlePlayerSelect}
            />
          {/if}
        </section>
      </div>
    {/if}
  </main>

  <!-- Footer -->
  <footer class="bg-slate-950 p-2 border-t border-slate-900">
    <div class="max-w-7xl mx-auto px-4 py-2 sm:px-6 lg:px-8 text-slate-700 text-xs text-right">
      © 2026 племенника е ухо
    </div>
  </footer>

  <!-- Player Detail Modal/Bottom Sheet -->
  {#if showDetail && selectedPlayer}
    <PlayerDetail
      player={selectedPlayer}
      on:close={handleCloseDetail}
    />
  {/if}
</div>

<style global>
  /* Prevent body scrolling when detail modal is open */
  :global(body.detail-open) {
    overflow: hidden;
  }
</style>
