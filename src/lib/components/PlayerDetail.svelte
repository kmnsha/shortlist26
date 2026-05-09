<script>
  import { createEventDispatcher } from 'svelte'
  import { formatCurrency, formatDate, getPositionColor, getTagColor } from '../utils'
  import { X, Heart, Download } from 'lucide-svelte'

  const dispatch = createEventDispatcher()

  export let player = null

  let isFavorite = false
  let showBottomSheet = false

  $: if (player) {
    showBottomSheet = true
  }

  function handleClose() {
    showBottomSheet = false
    dispatch('close')
  }

  function toggleFavorite() {
    isFavorite = !isFavorite
  }
</script>

{#if showBottomSheet}
  <!-- Overlay -->
  <div
    class="fixed inset-0 bg-black/50 z-40 transition-opacity"
    on:click={handleClose}
    on:keydown={(e) => e.key === 'Escape' && handleClose()}
    role="button"
    tabindex="0"
  ></div>

  <!-- Bottom Sheet -->
  <div class="fixed bottom-0 left-0 right-0 mx-auto w-full max-w-xs max-h-[90vh] bg-slate-800 border-t border-slate-600 rounded-t-2xl shadow-2xl z-50 overflow-y-auto overscroll-contain animate-slide-up">
    <!-- Handle Bar & Close Button -->
    <div class="sticky top-0 bg-slate-800 px-3 py-2 flex items-center justify-between">
      <div class="flex-1 flex justify-center">
        <div class="w-12 h-1 bg-slate-600 rounded-full"></div>
      </div>
      <button
        on:click={handleClose}
        class="ml-2 p-1 rounded hover:bg-slate-700 transition-colors text-slate-400 hover:text-slate-50"
      >
        <X size={20} />
      </button>
    </div>

    <!-- Content -->
    <div class="relative h-40 overflow-hidden rounded-t-2xl">
      <img
        src='img/players/{player.visuals.playerPhoto}'
        alt={player.name}
        class="absolute right-2 top-2 h-32 object-cover object-left"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent"></div>
      <img
        src='img/clubs/{player.visuals.clubBadge}'
        alt={player.info.club}
        class="absolute top-3 -left-16 w-40 h-40 object-cover opacity-10"
      />
      <button
        on:click={toggleFavorite}
        class="absolute bottom-3 right-3 p-2 rounded-full z-10 {isFavorite ? 'bg-accent-light text-slate-900' : 'bg-slate-900/80 text-slate-400 hover:text-accent-light'} transition-colors"
      >
        <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
      </button>
      <div class="absolute bottom-3 left-3 right-3 text-slate-50">
        <h1 class="text-2xl font-bold leading-tight">{player.name}</h1>
        <div class="flex flex-wrap items-center gap-2 text-sm text-slate-300 mt-2">
          <img
            src='img/nations/{player.visuals.nationFlag}'
            alt={player.info.nation}
            class="w-5 h-4 object-cover"
          />
          <span>{player.info.nation}</span>
          <span>•</span>
          <span>{player.info.club}</span>
          <span>•</span>
          <span>{player.info.age} yrs</span>
        </div>
        <div class="mt-3 flex flex-wrap gap-2">
          {#each player.info.position as pos (pos)}
            <span class="px-3 py-1 text-xs font-semibold rounded {getPositionColor(pos)}">
              {pos}
            </span>
          {/each}
        </div>
      </div>
    </div>

    <div class="p-4 space-y-4">
      <!-- Main Details -->
      <div class="grid grid-cols-3 gap-3">
        <div class="bg-slate-700/50 p-3 rounded-lg text-center">
          <div class="text-xl font-bold text-slate-50">{player.info.age}</div>
          <div class="text-xs text-slate-400 mt-1">Years Old</div>
        </div>
        <div class="bg-slate-700/50 p-3 rounded-lg text-center">
          <div class="text-xl font-bold text-slate-50">{player.info.height || '-'}</div>
          <div class="text-xs text-slate-400 mt-1">Height cm</div>
        </div>
        <div class="bg-slate-700/50 p-3 rounded-lg text-center">
          <div class="text-xl font-bold text-slate-50">{player.info.weight || '-'}</div>
          <div class="text-xs text-slate-400 mt-1">Weight kg</div>
        </div>
      </div>

      <!-- Financial Section -->
      <div class="border-t border-slate-600 pt-4 space-y-3">
        <h2 class="font-semibold text-slate-50">Financial</h2>
        <div class="grid gap-3 sm:grid-cols-2">
          <div class="bg-slate-700/50 p-3 rounded-lg">
            <div class="text-sm text-slate-400">Wage p/w</div>
            <div class="text-lg font-bold text-slate-50 mt-1">{formatCurrency(player.financial.wage, 'wage')}</div>
          </div>
          <div class="bg-slate-700/50 p-3 rounded-lg">
            <div class="text-sm text-slate-400">Asking Price</div>
            <div class="text-lg font-bold text-accent-light mt-1">{formatCurrency(player.financial.askingPrice, 'price')}</div>
          </div>
        </div>
        <div class="grid gap-3 sm:grid-cols-2">
          <div class="bg-slate-700/50 p-3 rounded-lg">
            <div class="text-sm text-slate-400">Contract Expires</div>
            <div class="text-lg font-bold text-slate-50 mt-1">{formatDate(player.financial.expiry)}</div>
          </div>
          <div class="bg-slate-700/50 p-3 rounded-lg">
            <div class="text-sm text-slate-400">Release Clause</div>
            <div class="text-lg font-bold text-slate-50 mt-1">{player.financial.releaseClause ?? '-'}</div>
          </div>
        </div>
      </div>

      <!-- Performance Stats -->
      {#if player.stats && Object.keys(player.stats).length > 0}
        <div class="border-t border-slate-600 pt-4 space-y-3">
          <h2 class="font-semibold text-slate-50">Performance</h2>
          <div class="grid grid-cols-2 gap-3 text-sm">
            {#if player.stats.apps !== undefined}
              <div class="flex justify-between">
                <span class="text-slate-400">Apps</span>
                <span class="font-semibold text-slate-50">{player.stats.apps}</span>
              </div>
            {/if}
            {#if player.stats.rating !== undefined}
              <div class="flex justify-between">
                <span class="text-slate-400">Rating</span>
                <span class="font-semibold text-yellow-400">{(player.stats.rating || 0).toFixed(2)}</span>
              </div>
            {/if}
            {#if player.stats.goals !== undefined}
              <div class="flex justify-between">
                <span class="text-slate-400">Goals</span>
                <span class="font-semibold text-slate-50">{player.stats.goals}</span>
              </div>
            {/if}
            {#if player.stats.assists !== undefined}
              <div class="flex justify-between">
                <span class="text-slate-400">Assists</span>
                <span class="font-semibold text-slate-50">{player.stats.assists}</span>
              </div>
            {/if}
            {#if player.stats.xg !== undefined}
              <div class="flex justify-between">
                <span class="text-slate-400">xG</span>
                <span class="font-semibold text-slate-50">{(player.stats.xg || 0).toFixed(2)}</span>
              </div>
            {/if}
            {#if player.stats.xa !== undefined}
              <div class="flex justify-between">
                <span class="text-slate-400">xA</span>
                <span class="font-semibold text-slate-50">{(player.stats.xa || 0).toFixed(2)}</span>
              </div>
            {/if}
            {#if player.stats.passSuccessPct !== undefined}
              <div class="flex justify-between">
                <span class="text-slate-400">Pass Success %</span>
                <span class="font-semibold text-slate-50">{(player.stats.passSuccessPct || 0).toFixed(1)}%</span>
              </div>
            {/if}
            {#if player.stats.aerialsWon !== undefined}
              <div class="flex justify-between">
                <span class="text-slate-400">Aerials Won</span>
                <span class="font-semibold text-slate-50">{(player.stats.aerialsWon || 0).toFixed(1)}</span>
              </div>
            {/if}
          </div>
        </div>
      {/if}

      {#if player.tags && player.tags.length > 0}
        <div class="border-t border-slate-600 pt-4 space-y-3">
          <h2 class="font-semibold text-slate-50">Tags</h2>
          <div class="flex flex-wrap gap-2">
            {#each player.tags as tag (tag)}
              <span class="px-3 py-1 text-sm font-medium rounded {getTagColor(tag)}">
                {tag}
              </span>
            {/each}
          </div>
        </div>
      {/if}

      <div class="h-4"></div>
    </div>
  </div>
{/if}

<style>
  @keyframes slideUp {
    from {
      transform: translateY(100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  :global(.animate-slide-up) {
    animation: slideUp 0.3s ease-out;
  }
</style>
