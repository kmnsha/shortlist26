<script>
  import { createEventDispatcher } from 'svelte'
  import { X, Search } from 'lucide-svelte'
  import { formatCurrency } from '../utils'

  const dispatch = createEventDispatcher()

  export let positions = []
  export let priceRange = { min: 0, max: 0 }
  export let wageRange = { min: 0, max: 0 }
  export let allTags = []
  export let filters = {
    name: '',
    position: [],
    priceRange: null,
    wageRange: null,
    heightRange: null,
    contractExpiry: ['freeAgents', '1yr', '2yr', 'longTerm'],
    tags: []
  }

  const positionOrder = {
    GK: 0,
    CB: 1,
    RB: 2,
    LB: 3,
    CM: 4,
    'AM/W': 5,
    ST: 6
  }

  $: orderedPositions = [...positions].sort((a, b) => {
    const aIndex = positionOrder[a] ?? 99
    const bIndex = positionOrder[b] ?? 99
    return aIndex - bIndex || a.localeCompare(b)
  })

  const contractOptions = [
    { value: 'freeAgents', label: 'Free agents' },
    { value: '1yr', label: '1 year remaining' },
    { value: '2yr', label: '2 years remaining' },
    { value: 'longTerm', label: 'Long-term deals' }
  ]

  let localFilters = { ...filters }
  let lastFilters = filters
  let filtersInitialized = false
  let priceSliderValue = priceRange.max
  let wageSliderValue = wageRange.max
  let expandedSections = {
    search: true,
    position: true,
    price: false,
    wage: false,
    contract: false,
    tags: true
  }

  $: if (!filtersInitialized && allTags.length > 0) {
    localFilters = {
      ...localFilters,
      tags: localFilters.tags?.length ? [...localFilters.tags] : [...allTags]
    }
    filtersInitialized = true
  }

  $: allTagsSelected = allTags.length > 0 && localFilters.tags.length === allTags.length && allTags.every(tag => localFilters.tags.includes(tag))

  function updateFilters() {
    dispatch('change', {
      ...localFilters,
      position: [...localFilters.position],
      tags: [...localFilters.tags],
      priceRange: localFilters.priceRange ? { ...localFilters.priceRange } : null,
      wageRange: localFilters.wageRange ? { ...localFilters.wageRange } : null
    })
  }

  function togglePosition(pos) {
    const idx = localFilters.position.indexOf(pos)
    if (idx > -1) {
      localFilters.position.splice(idx, 1)
    } else {
      localFilters.position.push(pos)
    }
    localFilters.position = localFilters.position
    updateFilters()
  }

  function toggleTag(tag) {
    const idx = localFilters.tags.indexOf(tag)
    if (idx > -1) {
      localFilters.tags.splice(idx, 1)
    } else {
      localFilters.tags.push(tag)
    }
    localFilters.tags = localFilters.tags
    updateFilters()
  }

  function toggleAllTags(checked) {
    localFilters.tags = checked ? [...allTags] : []
    updateFilters()
  }

  function setPriceRange(max) {
    priceSliderValue = max
    updateFilters()
  }

  function setWageRange(max) {
    wageSliderValue = max
    updateFilters()
  }

  function resetFilters() {
    localFilters = {
      name: '',
      position: [],
      priceRange: null,
      wageRange: null,
      heightRange: null,
      contractExpiry: contractOptions.map(option => option.value),
      tags: [...allTags]
    }
    priceSliderValue = priceRange.max
    wageSliderValue = wageRange.max
    updateFilters()
  }

  $: if (filters && filters !== lastFilters) {
    localFilters = { ...filters }
    lastFilters = filters
    priceSliderValue = filters.priceRange?.max ?? priceRange.max
    wageSliderValue = filters.wageRange?.max ?? wageRange.max
  }

  $: localFilters.priceRange = priceSliderValue === priceRange.max ? null : { min: null, max: priceSliderValue }
  $: localFilters.wageRange = wageSliderValue === wageRange.max ? null : { min: null, max: wageSliderValue }
</script>

<div class="bg-slate-800 rounded-lg border border-slate-600 p-4 space-y-4 sticky top-24">
  <div class="flex items-center justify-between">
    <h2 class="text-lg font-semibold text-slate-50">Filters</h2>
    <button
      on:click={resetFilters}
      class="text-xs text-accent-light hover:text-accent-light/80 transition-colors"
    >
      Reset
    </button>
  </div>

  <!-- Search -->
  <div class="space-y-2">
    <form on:submit|preventDefault={updateFilters} class="relative">
      <input
        type="text"
        bind:value={localFilters.name}
        placeholder="Filter by name, club, nation code.."
        class="w-full pr-12 px-3 py-2 bg-slate-900 text-slate-50 placeholder-slate-500 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-accent-light focus:border-transparent transition-colors"
        name="search"
        id="search"
      />
      <button
        type="submit"
        class="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-slate-300 hover:text-slate-100 bg-transparent"
        aria-label="Apply search"
      >
        <Search size={18} />
      </button>
    </form>
  </div>

  <!-- Position -->
  <div class="space-y-2">
    <button
      on:click={() => (expandedSections.position = !expandedSections.position)}
      class="w-full flex items-center justify-between text-sm font-medium text-slate-300 hover:text-slate-50 transition-colors"
    >
      <span>Position</span>
      <span class="text-xs text-slate-500">
        {localFilters.position.length > 0 ? `(${localFilters.position.length})` : ''}
      </span>
    </button>
    {#if expandedSections.position}
      <div class="flex flex-wrap gap-2">
        {#each orderedPositions as pos (pos)}
          <button
            on:click={() => togglePosition(pos)}
            class="px-2 py-1 text-xs rounded transition-colors {localFilters.position.includes(pos)
              ? 'bg-accent-light text-slate-900'
              : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}"
          >
            {pos}
          </button>
        {/each}
      </div>
    {/if}
  </div>
  <hr class="border-t border-slate-700" />
  <!-- Asking Price Range -->
  <div class="space-y-2">
    <button
      on:click={() => (expandedSections.price = !expandedSections.price)}
      class="w-full flex items-center justify-between text-sm font-medium text-slate-300 hover:text-slate-50 transition-colors"
    >
      <span>Asking Price</span>
      <span class="text-xs text-slate-400">
        {priceSliderValue === priceRange.max ? 'Any' : formatCurrency(priceSliderValue)}
      </span>
    </button>
    {#if expandedSections.price}
      <div class="space-y-3">
        <div class="text-xs text-slate-400 flex items-center justify-between">
          <span>Max price</span>
          <span>{priceSliderValue === priceRange.max ? formatCurrency(priceRange.max) : formatCurrency(priceSliderValue)}</span>
        </div>
        <input
          type="range"
          min={priceRange.min}
          max={priceRange.max}
          step={1000000}
          bind:value={priceSliderValue}
          on:input={(e) => setPriceRange(parseInt(e.target.value))}
          class="w-full accent-accent-light"
        />
        <div class="text-xs text-slate-500">Move slider left to filter by lower asking price.</div>
      </div>
    {/if}
  </div>
  <hr class="border-t border-slate-700" />
  <!-- Wage Range -->
  <div class="space-y-2">
    <button
      on:click={() => (expandedSections.wage = !expandedSections.wage)}
      class="w-full flex items-center justify-between text-sm font-medium text-slate-300 hover:text-slate-50 transition-colors"
    >
      <span>Weekly Wage</span>
      <span class="text-xs text-slate-400">
        {wageSliderValue === wageRange.max ? 'Any' : formatCurrency(wageSliderValue, 'wage')}
      </span>
    </button>
    {#if expandedSections.wage}
      <div class="space-y-3">
        <div class="text-xs text-slate-400 flex items-center justify-between">
          <span>Max wage</span>
          <span>{wageSliderValue === wageRange.max ? formatCurrency(wageRange.max, 'wage') : formatCurrency(wageSliderValue, 'wage')}</span>
        </div>
        <input
          type="range"
          min={wageRange.min}
          max={wageRange.max}
          step={1000}
          bind:value={wageSliderValue}
          on:input={(e) => setWageRange(parseInt(e.target.value))}
          class="w-full accent-accent-light"
        />
        <div class="text-xs text-slate-500">Move slider left to filter by lower weekly wage.</div>
      </div>
    {/if}
  </div>
  <hr class="border-t border-slate-700" />
  <!-- Contract Expiry -->
  <div class="space-y-2">
    <button
      on:click={() => (expandedSections.contract = !expandedSections.contract)}
      class="w-full flex items-center justify-between text-sm font-medium text-slate-300 hover:text-slate-50 transition-colors"
    >
      <span>Contract Expiry</span>
      <span class="text-xs text-slate-400">{localFilters.contractExpiry?.length || 0} selected</span>
    </button>
    {#if expandedSections.contract}
      <div class="space-y-3">
        {#each contractOptions as option}
          <label class="flex items-center gap-2 text-sm text-slate-300">
            <input
              type="checkbox"
              value={option.value}
              checked={localFilters.contractExpiry?.includes(option.value)}
              on:change={(e) => {
                const checked = e.target.checked
                const value = option.value
                if (checked) {
                  localFilters.contractExpiry = [...(localFilters.contractExpiry ?? []), value]
                } else {
                  localFilters.contractExpiry = (localFilters.contractExpiry ?? []).filter(item => item !== value)
                }
                updateFilters()
              }}
              class="h-4 w-4 rounded border-slate-600 bg-slate-700 text-accent-light focus:ring-accent-light"
            />
            <span>{option.label}</span>
          </label>
        {/each}
      </div>
    {/if}
  </div>

  <!-- Tags -->
  {#if allTags.length > 0}
  <hr class="border-t border-slate-700" />
    <div class="space-y-2">
      <div class="flex items-center gap-3">
        <label class="flex items-center gap-2 text-sm font-medium text-slate-300 cursor-pointer">
          <input
            type="checkbox"
            checked={allTagsSelected}
            on:change={(e) => toggleAllTags(e.target.checked)}
            class="h-4 w-4 rounded border-slate-600 bg-slate-700 text-accent-light focus:ring-accent-light"
          />
          <span>Hide unrealistic</span>
        </label>
        <!-- <button
          type="button"
          on:click={() => (expandedSections.tags = !expandedSections.tags)}
          class="flex-1 flex items-center justify-between text-sm font-medium text-slate-300 hover:text-slate-50 transition-colors"
        >
          <span>Hide unrealistic targets</span>
          <span class="text-xs text-slate-500">
            {localFilters.tags.length > 0 ? `(${localFilters.tags.length})` : ''}
          </span>
        </button> -->
      </div>
      {#if expandedSections.tags}
        <div class="space-y-2">
          <div class="text-xs text-slate-500">Checked tags are excluded from results.</div>
          <div class="grid grid-cols-2 gap-2 max-h-50 overflow-y-auto">
          {#each allTags as tag (tag)}
            <label class="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={localFilters.tags.includes(tag)}
                on:change={() => toggleTag(tag)}
                class="rounded bg-slate-700 border-slate-600 text-accent-light focus:ring-accent-light"
              />
              <span class="text-sm text-slate-300">{tag}</span>
            </label>
          {/each}
        </div></div>
      {/if}
    </div>
  {/if}
</div>
