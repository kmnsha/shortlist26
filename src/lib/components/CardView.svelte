<script>
  import { createEventDispatcher } from 'svelte'
  import { formatCurrency, formatDate, getTagColor, getPositionColor } from '../utils'
  import { Heart } from 'lucide-svelte'

  const dispatch = createEventDispatcher()

  export let players = []

  function handleCardClick(player) {
    dispatch('selectPlayer', player)
  }
</script>

<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  {#each players as player (player.id)}
    <div
      on:click={() => handleCardClick(player)}
      on:keydown={(e) => e.key === 'Enter' && handleCardClick(player)}
      role="button"
      tabindex="0"
      class="bg-slate-800 border border-slate-600 rounded-lg overflow-hidden hover:border-accent-light hover:shadow-lg hover:shadow-accent-light/20 transition-all cursor-pointer group"
    >
      <!-- Player Image -->
      <div class="relative h-36 bg-slate-800 overflow-hidden">
        <img
          src='/img/players/{player.visuals.playerPhoto}'
          alt={player.name}
          class="h-full object-cover group-hover:scale-105 transition-transform"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>

        <!-- Club Badge -->
        <img
          src='/img/clubs/{player.visuals.clubBadge}'
          alt={player.info.club}
          class="absolute top-2 right-2 w-20 h-20 p-1 object-contain opacity-40"
        />

        <!-- Favorite Button -->
        <button
          on:click|stopPropagation
          class="absolute bottom-2 right-2 p-2 rounded-full bg-slate-900/80 text-slate-400 hover:text-accent-light hover:bg-slate-900 transition-colors"
        >
          <Heart size={18} />
        </button>
      </div>

      <!-- Card Content -->
      <div class="p-4 space-y-3">
        <!-- Player Name & Nation -->
        <div>
          <h3 class="text-lg font-semibold text-slate-50 group-hover:text-accent-light transition-colors">
            {player.name}
          </h3>
          <div class="flex items-center gap-1 text-xs text-slate-400 mt-1">
            <img
              src='/img/flags/{player.visuals.nationFlag}'
              alt={player.info.nation}
              class="w-4 h-3 object-cover"
            />
            <span>{player.info.nation}</span>
            <span class="text-slate-500">•</span>
            <span>{player.info.club}</span>
            <span class="text-slate-500">•</span>
            <span>{player.info.age} yrs</span>
          </div>
        </div>

        <!-- Position & Stats -->
        <div class="flex flex-wrap gap-1">
          {#each player.info.position as pos (pos)}
            <span class="px-2 py-1 text-xs font-semibold rounded {getPositionColor(pos)}">
              {pos}
            </span>
          {/each}
        </div>

        <!-- Financial Info -->
        <div class="grid grid-cols-2 gap-2 text-xs">
          <div class="bg-slate-700/50 p-2 rounded">
            <div class="text-slate-400">Weekly Wage</div>
            <div class="font-semibold text-slate-50">{formatCurrency(player.financial.wage, 'wage')}</div>
          </div>
          <div class="bg-slate-700/50 p-2 rounded">
            <div class="text-slate-400">Asking Price</div>
            <div class="font-semibold text-accent-light">{formatCurrency(player.financial.askingPrice, 'price')}</div>
          </div>
        </div>

        <!-- Contract Expiry -->
        <div class="text-xs border-t border-slate-600 pt-2">
          <div class="text-slate-400">Contract Expires</div>
          <div class="font-semibold text-slate-50">{formatDate(player.financial.expiry)}</div>
        </div>

        <!-- Tags -->
        {#if player.tags && player.tags.length > 0}
          <div class="flex flex-wrap gap-1 pt-2">
            {#each player.tags.slice(0, 3) as tag (tag)}
              <span class="px-2 py-0.5 text-xs font-medium rounded {getTagColor(tag)}">
                {tag}
              </span>
            {/each}
            {#if player.tags.length > 3}
              <span class="px-2 py-0.5 text-xs font-medium rounded bg-slate-700 text-slate-300">
                +{player.tags.length - 3}
              </span>
            {/if}
          </div>
        {/if}

        <!-- View Details Button -->
        <!-- <button
          on:click|stopPropagation={() => handleCardClick(player)}
          class="w-full mt-2 px-3 py-2 bg-accent-light text-slate-900 font-semibold text-sm rounded hover:bg-accent-light/90 transition-colors"
        >
          View Details
        </button> -->
      </div>
    </div>
  {/each}
</div>
