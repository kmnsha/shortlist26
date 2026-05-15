<script>
  import { createEventDispatcher } from 'svelte'
  import { formatCurrency, formatDate, formatPosition, getPositionColor } from '../utils'
  import { ChevronUp, ChevronDown } from 'lucide-svelte'

  const dispatch = createEventDispatcher()

  export let players = []
  export let sortBy = 'name'
  export let sortDirection = 'asc'

  const columns = [
    { key: 'player', label: 'Player', sortable: true },
    { key: 'position', label: 'Position', sortable: true },
    { key: 'age', label: 'Age', sortable: true },
    { key: 'wage', label: 'Wages', sortable: true },
    { key: 'expiry', label: 'Expires', sortable: true },
    { key: 'price', label: 'Value', sortable: true }
  ]

  function handleSort(field) {
    let direction = 'asc'
    if (sortBy === field && sortDirection === 'asc') {
      direction = 'desc'
    }
    dispatch('sort', { field, direction })
  }

  function getSortIcon(field) {
    if (sortBy !== field) return null
    return sortDirection === 'asc' ? 'up' : 'down'
  }
</script>

<div class="overflow-x-auto bg-slate-800 rounded border border-slate-800">
  <table class="w-full">
    <thead>
      <tr class="border-b border-slate-900">
        {#each columns as col}
          <th class="px-4 py-3 text-left text-sm font-semibold text-slate-200">
            {#if col.sortable}
              <button
                on:click={() => handleSort(col.key)}
                class="flex items-center gap-1 hover:text-accent-light transition-colors group"
              >
                <span>{col.label}</span>
                <span class="opacity-0 group-hover:opacity-100 transition-opacity">
                  {#if getSortIcon(col.key) === 'up'}
                    <ChevronUp size={16} />
                  {:else if getSortIcon(col.key) === 'down'}
                    <ChevronDown size={16} />
                  {:else}
                    <ChevronUp size={16} class="opacity-30" />
                  {/if}
                </span>
              </button>
            {:else}
              {col.label}
            {/if}
          </th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each players as player (player.id)}
        <tr
          class="border-b border-slate-900 hover:bg-slate-700/20 transition-colors cursor-pointer"
          on:click={() => dispatch('selectPlayer', player)}
          role="button"
          tabindex="0"
          on:keydown={(e) => e.key === 'Enter' && dispatch('selectPlayer', player)}
        >
          <!-- Player -->
          <td class="px-4 py-3">
            <div class="flex items-center gap-3">
              <img
                src='{import.meta.env.BASE_URL}img/players/{player.visuals.playerPhoto}'
                alt={player.name}
                class="w-10 h-10 rounded-full object-cover bg-slate-700"
              />
              <div class="flex items-center gap-2">
                <div>
                  <div class="text-sm font-medium text-slate-50">{player.name}</div>
                  <div class="text-xs text-slate-400 flex items-center gap-1">
                    <span>{player.info.club}</span>
                  </div>
                  <div class="text-xs text-slate-400 flex items-center gap-1">
                    <img
                      src='{import.meta.env.BASE_URL}img/flags/{player.visuals.nationFlag}'
                      alt={player.info.nation}
                      class="w-4 h-3 object-cover"
                    />
                    {player.info.nation}
                  </div>
                </div>
              </div>
            </div>
          </td>

          <!-- Position -->
          <td class="px-4 py-3">
            <div class="flex gap-1 flex-wrap">
              {#each player.info.position as pos (pos)}
                <span class="px-2 py-1 text-xs font-semibold rounded {getPositionColor(pos)}">
                  {pos}
                </span>
              {/each}
            </div>
          </td>

          <!-- Age -->
          <td class="px-4 py-3 text-sm text-slate-300">{player.info.age}</td>

          <!-- Wage -->
          <td class="px-4 py-3 text-sm text-slate-300 font-medium">
            {formatCurrency(player.financial.wagesTotal, 'wage')}
          </td>

          <!-- Contract Expiry -->
          <td class="px-4 py-3 text-sm text-slate-300">
            {formatDate(player.financial.contractExpiry)}
          </td>

          <!-- Asking Price -->
          <td class="px-4 py-3 text-sm text-accent-light font-medium">
            {formatCurrency(player.financial.askingPrice, 'price')}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
