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

<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
  {#each players as player (player.id)}
    <div
      on:click={() => handleCardClick(player)}
      on:keydown={(e) => e.key === 'Enter' && handleCardClick(player)}
      role="button"
      tabindex="0"
      class="bg-slate-900 border-1 border-slate-800 rounded overflow-hidden hover:border-accent-light/20 hover:shadow-lg hover:shadow-accent-light/20 transition-all cursor-pointer group"
    >

      <!-- Content -->
      <div class="relative p-4 h-28 overflow-hidden">
        <img
          src='{import.meta.env.BASE_URL}img/players/{player.visuals.playerPhoto}'
          alt={player.name}
          class="absolute right-2 bottom-0 h-24 object-cover object-left opacity-75 z-10"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-700/50 to-slate-700/30"></div>
        <img
          src='{import.meta.env.BASE_URL}img/clubs/{player.visuals.clubBadge}'
          alt={player.info.club}
          class="absolute -top-2 -right-16 w-40 h-40 object-cover opacity-10"
        />
        <!-- <button
          on:click={toggleFavorite}
          class="absolute bottom-3 right-3 p-2 rounded-full z-10 {isFavorite ? 'bg-accent-light text-slate-900' : 'bg-slate-900/80 text-slate-400 hover:text-accent-light'} transition-colors"
        >
          <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
        </button> -->
        <div class="absolute top-4 left-4 right-30 text-slate-50 z-20">
          <h3 class="text-lg font-semibold text-slate-50 leading-tight">{player.name}</h3>
          <div class="flex flex-wrap items-center gap-2 text-xs text-slate-400 mt-1">
            <img
              src='{import.meta.env.BASE_URL}img/flags/{player.visuals.nationFlag}'
              alt={player.info.nation}
              class="w-4 h-3 object-cover"
            />
            <span>{player.info.nation}</span>
            <span>•</span>
            <span>{player.info.club}</span>
          </div>

          <div class="flex flex-wrap items-center gap-2 text-xs text-slate-400 mt-1">
            <span>{player.info.age} years</span>
            <span>•</span>
            <span>{player.info.height || '-'}cm</span>
            <span>•</span>
            <span>{player.info.weight || '-'}kg</span>
          </div>

          <div class="mt-2 flex flex-wrap gap-2">
            {#each player.info.position as pos (pos)}
              <span class="px-3 py-1 text-xs font-semibold rounded {getPositionColor(pos)}">
                {pos}
              </span>
            {/each}
          </div>
        </div>
      </div>

      
      

      <!-- Card Content -->
      <div class="p-4 space-y-3 bg-slate-950">
        <!-- Financial Info -->
        <div class="grid grid-cols-2 gap-2 text-xs">
          <div class="bg-slate-700/30 p-2 rounded">
            <div class="text-slate-400">Weekly Wage</div>
            <div class="font-semibold text-slate-50">{formatCurrency(player.financial.wagesTotal, 'wage')}</div>
          </div>
          <div class="bg-slate-700/30 p-2 rounded">
            <div class="text-slate-400">Asking Price</div>
            <div class="font-semibold text-accent-light">{formatCurrency(player.financial.askingPrice, 'price')}</div>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-2 text-xs">
          <!-- Contract Expiry -->
          <div class="text-xs pt-2">
            <div class="text-slate-400">Contract Expires</div>
            <div class="font-semibold text-slate-50">{formatDate(player.financial.contractExpiry)}</div>
          </div>
          <div class="text-xs pt-2">
            <div class="text-slate-400">Release Fee</div>
            <div class="font-semibold text-slate-50">{formatCurrency(player.financial.releaseFee) ?? '-'}</div>
          </div>
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
