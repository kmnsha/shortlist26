/**
 * Format currency values
 * @param {number} value - Amount in the base unit
 * @param {string} type - 'wage' or 'price'
 * @returns {string} Formatted currency string
 */
export function formatCurrency(value, type = 'price') {
  if (!value || value === 0) return '-'
  
  if (type === 'wage') {
    // Wages are in actual amounts (e.g., 65000 = £65k)
    if (value >= 1000000) {
      return '£' + (value / 1000000).toFixed(1) + 'M'
    } else if (value >= 1000) {
      return '£' + (value / 1000).toFixed(0) + 'k'
    }
    return '£' + value
  }
  
  // Price formatting
  if (value >= 1000000000) {
    return '£' + (value / 1000000000).toFixed(2) + 'B'
  } else if (value >= 1000000) {
    return '£' + (value / 1000000).toFixed(0) + 'M'
  } else if (value >= 1000) {
    return '£' + (value / 1000).toFixed(0) + 'k'
  }
  return '£' + value
}

/**
 * Format date to readable string
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date
 */
export function formatDate(dateString) {
  if (!dateString) return '-'
  const date = new Date(dateString + 'T00:00:00Z')
  return new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date)
}

/**
 * Format player position for display
 * @param {string[]} positions - Array of position codes
 * @returns {string} Comma-separated positions
 */
export function formatPosition(positions) {
  if (!Array.isArray(positions) || positions.length === 0) return '-'
  return positions.join(', ')
}

/**
 * Get position badge color
 * @param {string} position - Position code
 * @returns {string} Tailwind color classes
 */
export function getPositionColor(position) {
  const colors = {
    GK: 'bg-additional-emerald/20 border border-additional-emerald text-slate-100',
    CB: 'bg-additional-violet/20 border border-additional-violet text-slate-100',
    LB: 'bg-additional-cyan/20 border border-additional-cyan text-slate-100',
    RB: 'bg-additional-indigo/20 border border-additional-indigo text-slate-100',
    CM: 'bg-additional-sage/20 border border-additional-sage text-slate-100',
    'AM/W': 'bg-additional-amber/20 border border-additional-amber text-slate-100',
    ST: 'bg-additional-rose/20 border border-additional-rose text-slate-100'
  }
  return colors[position] || 'bg-slate-700 text-slate-200'
}

/**
 * Filter players based on criteria
 * @param {Array} players - Array of player objects
 * @param {Object} filters - Filter object
 * @returns {Array} Filtered players
 */
export function filterPlayers(players, filters) {
  return players.filter(player => {
      // Search filter: name, club, nation
    if (filters.name && filters.name.trim() !== '') {
      const search = filters.name.toLowerCase().trim()
      const matchName = player.name.toLowerCase().includes(search)
      const matchClub = player.info.club?.toLowerCase().includes(search)
      const matchNation = player.info.nation?.toLowerCase().includes(search)
      if (!matchName && !matchClub && !matchNation) return false
    }

    // Position filter
    if (filters.position && filters.position.length > 0) {
      const playerPositions = player.info.position || []
      const matchesPosition = filters.position.some(pos => 
        playerPositions.includes(pos)
      )
      if (!matchesPosition) return false
    }

    // Asking price range filter
    if (filters.priceRange) {
      const { min, max } = filters.priceRange
      const price = player.financial.askingPrice || 0
      if (min !== undefined && price < min) return false
      if (max !== undefined && price > max) return false
    }

    // Wage range filter
    if (filters.wageRange) {
      const { min, max } = filters.wageRange
      const wage = player.financial.wage || 0
      if (min !== undefined && wage < min) return false
      if (max !== undefined && wage > max) return false
    }

    // Height range filter (if height data exists)
    if (filters.heightRange && player.stats?.height) {
      const { min, max } = filters.heightRange
      const height = player.stats.height
      if (min !== undefined && height < min) return false
      if (max !== undefined && height > max) return false
    }

    // Contract expiry filter by category
    if (filters.contractExpiry && filters.contractExpiry.length > 0) {
      const expiry = player.financial.expiry
      const year = expiry ? new Date(expiry).getFullYear() : null
      const matchesExpiry = filters.contractExpiry.some(option => {
        switch (option) {
          case 'freeAgents':
            return year === 2026
          case '1yr':
            return year === 2027
          case '2yr':
            return year === 2028
          case 'longTerm':
            return year >= 2029
          default:
            return false
        }
      })
      if (!matchesExpiry) return false
    }

    // Tags filter (negative tags are excluded when checked)
    if (filters.tags && filters.tags.length > 0) {
      const playerTags = player.tags || []
      const hasExcludedTag = filters.tags.some(tag => 
        playerTags.includes(tag)
      )
      if (hasExcludedTag) return false
    }

    return true
  })
}

/**
 * Sort players by field
 * @param {Array} players - Array of player objects
 * @param {string} field - Field to sort by
 * @param {string} direction - 'asc' or 'desc'
 * @returns {Array} Sorted players
 */
export function sortPlayers(players, field, direction = 'asc') {
  const sorted = [...players].sort((a, b) => {
    let aVal, bVal

    switch (field) {
      case 'name':
        aVal = a.name
        bVal = b.name
        break
      case 'age':
        aVal = a.info.age
        bVal = b.info.age
        break
      case 'position':
        aVal = a.info.position[0]
        bVal = b.info.position[0]
        break
      case 'wage':
        aVal = a.financial.wage
        bVal = b.financial.wage
        break
      case 'price':
        aVal = a.financial.askingPrice
        bVal = b.financial.askingPrice
        break
      case 'expiry':
        aVal = new Date(a.financial.expiry)
        bVal = new Date(b.financial.expiry)
        break
      default:
        return 0
    }

    if (typeof aVal === 'string') {
      return direction === 'asc' 
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal)
    }

    return direction === 'asc' ? aVal - bVal : bVal - aVal
  })

  return sorted
}

/**
 * Get all unique positions from players
 * @param {Array} players - Array of player objects
 * @returns {string[]} Unique positions
 */
export function getUniquePositions(players) {
  const positions = new Set()
  players.forEach(player => {
    if (player.info.position && Array.isArray(player.info.position)) {
      player.info.position.forEach(pos => positions.add(pos))
    }
  })
  return Array.from(positions).sort()
}

/**
 * Get price range from players
 * @param {Array} players - Array of player objects
 * @returns {Object} Min and max prices
 */
export function getPriceRange(players) {
  const prices = players
    .map(p => p.financial.askingPrice)
    .filter(p => p > 0)
  
  return {
    min: Math.min(...prices),
    max: Math.max(...prices)
  }
}

/**
 * Get wage range from players
 * @param {Array} players - Array of player objects
 * @returns {Object} Min and max wages
 */
export function getWageRange(players) {
  const wages = players
    .map(p => p.financial.wage)
    .filter(w => w > 0)
  
  return {
    min: Math.min(...wages),
    max: Math.max(...wages)
  }
}

/**
 * Get all unique tags from players
 * @param {Array} players - Array of player objects
 * @returns {string[]} Unique tags
 */
export function getUniqueTags(players) {
  const tags = new Set()
  players.forEach(player => {
    if (player.tags && Array.isArray(player.tags)) {
      player.tags.forEach(tag => tags.add(tag))
    }
  })
  return Array.from(tags).sort()
}

/**
 * Determine tag color (positive/negative)
 * @param {string} tag - Tag string
 * @returns {string} Tailwind color classes
 */
export function getTagColor(tag) {
  // You can add logic here to determine if a tag is positive or negative
  // For now, we'll use a simple heuristic or you can pass tag type separately
  const positiveKeywords = ['rumoured']
  const negativeKeywords = ['too old', 'too weak', 'injury prone', 'too expensive', 'high wages', 'not interested', 'too short', 'bad attitude', 'new contract', 'transfered elsewhere', 'too fat']
  
  const tagLower = tag.toLowerCase()
  
  if (positiveKeywords.some(kw => tagLower.includes(kw))) {
    return 'bg-emerald-900 text-emerald-200'
  } else if (negativeKeywords.some(kw => tagLower.includes(kw))) {
    return 'bg-pink-900 text-pink-200'
  }
  
  return 'bg-slate-700 text-slate-200'
}
