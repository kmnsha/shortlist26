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
      const response = await fetch(`${import.meta.env.BASE_URL}data/shortlist26.json`)
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
  <header class="sticky bg-slate-950 border-b border-slate-600/50  top-0 z-50 shadow-lg">
    <div class="px-4 py-3 sm:px-6 lg:px-8">
      <!-- Row 1: Logo and View/Filter Buttons -->
      <div class="flex items-center justify-between gap-4 mb-1">
        <div class="flex items-center gap-3">
          <img src="{import.meta.env.BASE_URL}img/badge-white.jpg" alt="Newcastle United" class="w-12 h-12" />
          <div>
            <h1 class="text-3xl"><img src="{import.meta.env.BASE_URL}img/logo.png" alt="Shortlist26" class="h-6" /></h1>
            <!-- <p class="text text-xs text-slate-300">Сезонът на заблатения Радев</p> -->
          </div>
        </div>
        <ViewToggle on:change={handleViewModeChange} on:toggleFilters={handleToggleFilters} {viewMode} {showFilters} />
      </div>

      <!-- Row 2: Results Count (Centered) -->
      <div class="text-center text-xs text-slate-300">
        Showing <span class="font-bold text-sm text-accent-light">{filteredPlayers.length}</span> of <span class="font-bold">{players.length}</span> players
      </div>
    </div>
  </header>

  <!-- Main Content -->
  <main class="relative flex flex-1 overflow-hidden">
    {#if loading}
      <div class="flex-1 flex items-center justify-center">
        <div class="text-center">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-light mx-auto mb-4"></div>
          <p class="text-slate-400">Loading players...</p>
        </div>
      </div>
    {:else if error}
      <div class="flex-1 p-4 sm:p-6 lg:p-8">
        <div class="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded">
          <p class="font-semibold">Error loading data</p>
          <p class="text-sm">{error}</p>
        </div>
      </div>
    {:else}
      <!-- Mobile Overlay for Sidebar -->
      {#if showFilters}
        <div
          class="fixed inset-0 bg-black/50 z-40 lg:hidden"
          on:click={() => (showFilters = false)}
          role="presentation"
        />
      {/if}

      <!-- Player List Content -->
      <section class="flex-1 overflow-auto px-4 py-6 sm:px-6 lg:px-8">
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

      <!-- Filter Sidebar -->
      <aside
        class="fixed top-0 right-0 h-screen w-80 bg-slate-800/90 border-l border-slate-600/50 overflow-y-auto transform transition-transform duration-300 ease-in-out lg:static lg:top-140px lg:w-80 lg:h-auto z-40 lg:transform-none
          {showFilters ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}"
      >
        <!-- <div class="p-6 lg:hidden flex items-center justify-between">
          <h2 class="text-lg font-semibold text-slate-50">Filters</h2>
          <button
            on:click={() => (showFilters = false)}
            class="text-slate-300 hover:text-slate-50 transition-colors"
            aria-label="Close filters"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div> -->
        <div class="fixed p-4 pt-28 lg:pt-4">
          <FilterPanel
            {positions}
            {priceRange}
            {wageRange}
            {allTags}
            {filters}
            on:change={handleFilterChange}
          />
        </div>
      </aside>

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
