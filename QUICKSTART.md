# Quick Start Guide

## 1. Initial Setup (30 seconds)

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will automatically open at `http://localhost:5173`

## 2. What You'll See

- ✅ Header with Newcastle branding
- ✅ Filter panel on the left (populated from your data)
- ✅ Table view with sortable columns (default)
- ✅ All 400 players from shortlist26.json
- ⚠️ Placeholder images (because image files don't exist yet)

## 3. Add Images (Important!)

The app works without images but looks much better with them. Create these directories if they don't exist and add your image files:

### Player Photos
```
img/
└── players/
    ├── 55038655.png    (José Sá)
    ├── 28104130.png    (Caoimhin Kelleher)
    ├── ...             (add all player photos)
    └── [player_id].png
```

**Image Format**: jpg, png, or webp
**Recommended Size**: 300x300px or larger
**File Naming**: Must match the `id` field from JSON

### Club Badges
```
img/
└── clubs/
    ├── wolves.png
    ├── brentford.png
    ├── ...
    └── [club_name].png
```

**File Naming**: Lowercase, matches the `clubBadge` path in JSON

### Country Flags
```
img/
└── nations/
    ├── por.png         (Portugal)
    ├── irl.png         (Ireland)
    ├── ...
    └── [iso_code].png
```

**File Naming**: ISO 3166-1 alpha-2 code in lowercase

## 4. Customize Tags (Optional)

Currently, tags are empty arrays. To add tags to players, edit `shortlist26.json`:

```json
{
  "id": "55038655",
  "name": "José Sá",
  "tags": [
    "Great reflexes",
    "Distribution skills",
    "Aerial dominance"
  ],
  ...
}
```

**Tag Types** (detected by keyword):
- **Positive Tags** (green): "good", "strong", "excellent", "elite", "world-class"
- **Negative Tags** (pink): "weak", "poor", "injury", "prone", "risk", "concern"

## 5. Features Overview

### Table View (Default)
- 📊 All player data in sortable columns
- 🔗 Click any row to open detailed player view
- ⬆️⬇️ Click column headers to sort

### Card View
- 🎴 Visual card layout
- 🖼️ Player photo prominent
- "View Details" button for full info

### Filters (Left Panel)
- 🔍 Name search (instant)
- 📍 Position multi-select
- 💰 Price range (in £M)
- 💷 Wage range (in £k)
- 📅 Contract expiry dates
- 🏷️ Tags (when you add them)

### Player Details (Bottom Sheet)
- 📸 Large player photo
- ⭐ Performance stats
- 💼 Financial info
- 🏆 All custom stats
- 🏷️ All tags
- ❤️ Favorite button (for future use)

## 6. View Toggle

Top right corner has two buttons:
- **Table icon** - Switch to table view
- **Grid icon** - Switch to card view

## 7. Mobile Optimization

The app is fully responsive:
- ✅ Mobile: Filters collapse, cards stack vertically
- ✅ Tablet: 2-column card layout
- ✅ Desktop: Full 3-column layout
- ✅ Bottom sheet details work great on mobile

## 8. Build & Deploy

When ready to go live:

```bash
# Create production build
npm run build

# Preview production build locally
npm run preview
```

The `dist/` folder contains your static site ready to deploy.

## 9. Common Customizations

### Change Colors
Edit `tailwind.config.js`:
```js
colors: {
  accent: {
    light: '#your-color',    // Baby blue
    DEFAULT: '#your-color',  // Medium blue
  },
  gold: {
    DEFAULT: '#your-color',  // Gold accent
  }
}
```

### Change App Title
Edit `index.html`:
```html
<title>Your App Title Here</title>
```

### Change Header Text
Edit `src/App.svelte`:
```svelte
<h1 class="text-3xl font-bold">Your Title</h1>
<p class="text-accent-light text-sm">Your subtitle</p>
```

## 10. Troubleshooting

**Problem**: "Missing image" placeholders appear
- **Solution**: Ensure image files exist in correct directories with correct filenames

**Problem**: Filters are empty
- **Solution**: Check that your JSON data is valid (use a JSON validator)

**Problem**: App doesn't start
- **Solution**: Run `npm install` again, ensure Node.js 16+ installed

**Problem**: Changes don't appear
- **Solution**: Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

**Problem**: Build fails
- **Solution**: Check node_modules exists, run `npm install`, check for TypeScript errors

## 11. Data Format Reference

Your JSON must match this structure for each player:

```json
{
  "id": "unique_player_id",
  "name": "Player Name",
  "visuals": {
    "playerPhoto": "img/players/[id].png",
    "clubBadge": "img/clubs/[club].png",
    "nationFlag": "img/[iso].png"
  },
  "info": {
    "club": "Club Name",
    "nation": "ISO Code (3 letters)",
    "position": ["GK"],  // Can be multiple
    "age": 32
  },
  "financial": {
    "wage": 65000,          // Weekly wage in £
    "expiry": "2027-06-30", // ISO date format
    "askingPrice": 300000000 // In £
  },
  "stats": {
    "apps": 0,
    "minutes": 0,
    "goals": 0,
    "xg": 0.0,
    "assists": 0,
    "xa": 0.0,
    "shotsPerGame": 0.0,
    "passSuccessPct": 0.0,
    "aerialsWon": 0.0,
    "motm": 0,
    "rating": 0.0
  },
  "tags": ["tag1", "tag2"]  // Optional, can be empty
}
```

## 12. Next Steps

1. ✅ Run `npm install` and `npm run dev`
2. ✅ Test the app with placeholder images
3. ✅ Add your player images
4. ✅ Add your club badges
5. ✅ Add your flag images
6. ✅ (Optional) Add tags to players
7. ✅ Customize colors to match your brand
8. ✅ Run `npm run build` when ready to deploy

## Need Help?

- Check README.md for detailed documentation
- Check console (F12) for error messages
- Verify JSON syntax: https://jsonlint.com/
- Verify image paths are correct
- Ensure all files are in the right directories

Happy building! 🚀
