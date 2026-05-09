# 🎯 Newcastle United Player Shortlist Web App - Complete Setup

## ✅ Project Status: READY TO RUN

Your complete football player shortlist web app has been set up! All files are configured and ready to go.

---

## 🚀 Quick Start (2 minutes)

```bash
# Install dependencies (first time only)
npm install

# Start development server
npm run dev
```

The app will automatically open at `http://localhost:5173`

---

## 📁 Project Structure

```
shortlist/
├── 📄 Configuration Files
│   ├── package.json           # Dependencies & scripts
│   ├── vite.config.js         # Build tool config
│   ├── svelte.config.js       # Svelte compiler options
│   ├── tailwind.config.js     # Dark theme with blue/gold
│   ├── postcss.config.js      # CSS processing
│   ├── tsconfig.json          # TypeScript config
│   └── .gitignore             # Git exclusions
│
├── 📄 Documentation
│   ├── README.md              # Full documentation
│   ├── QUICKSTART.md          # Quick reference guide
│   └── SETUP.md               # This file
│
├── 📄 Core App Files
│   ├── index.html             # HTML entry point
│   └── src/
│       ├── main.js            # App initialization
│       ├── app.css            # Tailwind + custom styles
│       ├── App.svelte         # Main app component
│       └── lib/
│           ├── utils.ts       # All utility functions
│           │   ├── formatCurrency()
│           │   ├── filterPlayers()
│           │   ├── sortPlayers()
│           │   └── ... 10+ helpers
│           └── components/
│               ├── FilterPanel.svelte      # Filtering UI
│               ├── ViewToggle.svelte       # View mode switcher
│               ├── TableView.svelte        # Table display (default)
│               ├── CardView.svelte         # Card grid layout
│               └── PlayerDetail.svelte     # Bottom sheet details
│
├── 📊 Data Files
│   ├── shortlist26.json       # Your player database (~400 players)
│   └── img/                   # Asset directories (currently empty)
│       ├── players/           # Player photos (add here)
│       ├── clubs/             # Club badges (add here)
│       └── nations/           # Flag images (add here)
│
└── 📦 Generated Folders (after npm install)
    └── node_modules/          # Dependencies
```

---

## ⚙️ Tech Stack

| Technology | Purpose | Version |
|---|---|---|
| **Vite** | Lightning-fast build tool & dev server | ^5.0.8 |
| **Svelte** | Reactive UI framework | ^4.2.8 |
| **Tailwind CSS** | Utility-first CSS with dark theme | ^3.4.1 |
| **Lucide Icons** | Beautiful icon set | ^0.353.0 |
| **TypeScript** | Type-safe utilities | ^5.3.3 |

---

## 🎨 Design System

### Color Palette
- **Background**: Dark slate (slate-900 to slate-950)
- **Primary Accent**: Baby blue (#60a5fa)
- **Secondary Accent**: Gold (#f59e0b)
- **Text**: Light slate (slate-50)

### Component Colors
- **GK (Goalkeeper)**: Amber
- **DEF (Defense)**: Blue
- **MID (Midfield)**: Purple
- **FWD (Forward)**: Red
- **Positive Tags**: Green
- **Negative Tags**: Pink

---

## ✨ Features Implemented

### 📊 Dual View Modes
- **Table View** (default)
  - All player data visible
  - Sortable columns (click headers)
  - Compact and data-rich
  - Best for desktop

- **Card View**
  - Visual player cards
  - Less info, more visual impact
  - Bottom sheet for full details
  - Best for mobile

### 🔍 Advanced Filtering
Search across all players with multiple filter types:
- **Name Search** - Instant search as you type
- **Position** - Multi-select (GK, DEF, MID, FWD, etc.)
- **Price Range** - Asking price in £M
- **Wage Range** - Weekly salary in £k
- **Height Range** - When data available
- **Contract Expiry** - Date range filtering
- **Tags** - Custom player tags (when you add them)

### 📱 Mobile Responsive
- ✅ Mobile: Single column, collapsible filters
- ✅ Tablet: 2-column card layout
- ✅ Desktop: 3-column card layout, side panel filters
- ✅ All views work great with touch input
- ✅ Bottom sheet for player details (perfect for mobile)

### 💰 Smart Formatting
- **Currency**: £150k / £300M / £1.5B (auto-scaled)
- **Dates**: 30 Jun 2027 (human readable)
- **Positions**: Color-coded badges
- **Stats**: Formatted with proper decimals

### 🖼️ Visual Features
- Player photos with fallback placeholders
- Club badge logos
- Country flag icons
- Smooth animations & transitions
- Gradient overlays on images
- Loading states and error handling

---

## 📊 Player Data Format

Your `shortlist26.json` uses this structure (already configured):

```json
{
  "id": "55038655",                        // Unique identifier
  "name": "José Sá",                       // Player name
  "visuals": {
    "playerPhoto": "img/players/55038655.png",
    "clubBadge": "img/clubs/wolves.png",
    "nationFlag": "img/por.png"
  },
  "info": {
    "club": "Wolves",                      // Current club
    "nation": "POR",                       // ISO 3-letter code
    "position": ["GK"],                    // Array of positions
    "age": 32
  },
  "financial": {
    "wage": 65000,                         // Weekly wage in £
    "expiry": "2027-06-30",               // Contract end date
    "askingPrice": 300000000              // Transfer fee in £
  },
  "stats": {
    "apps": 25,                            // Appearances
    "minutes": 2250,                       // Minutes played
    "goals": 0,
    "xg": 0.0,                             // Expected goals
    "assists": 0,
    "xa": 0.0,                             // Expected assists
    "shotsPerGame": 0.5,
    "passSuccessPct": 92.3,
    "aerialsWon": 8.5,
    "motm": 2,                             // Man of the Match
    "rating": 7.2                          // Overall rating
  },
  "tags": []                               // Custom tags (add your own!)
}
```

---

## 🎯 Next Steps

### Step 1: Test the App (5 min)
```bash
npm install
npm run dev
```
- ✅ App loads with player data
- ✅ Filters work with empty selection
- ✅ Table and card views toggle
- ✅ Bottom sheet opens on player click
- ⚠️ Images show placeholders (this is normal)

### Step 2: Add Player Images (Optional but Recommended)
Place your player photos in `img/players/`
- **Filename**: Must match player ID (e.g., `55038655.png`)
- **Format**: jpg, png, or webp
- **Size**: 300x300px minimum (square preferred)

### Step 3: Add Club Badges (Optional)
Place club logos in `img/clubs/`
- **Filename**: Lowercase club name (e.g., `wolves.png`)
- **Format**: png with transparency preferred
- **Size**: 64x64px minimum

### Step 4: Add Flag Images (Optional)
Place flag images in `img/nations/`
- **Filename**: ISO 2-letter code (e.g., `por.png`, `irl.png`)
- **Format**: png
- **Size**: 32x24px (4:3 aspect ratio)

### Step 5: Add Player Tags (Optional)
Edit `shortlist26.json` to add tags:
```json
"tags": ["Injury prone", "World-class reflexes", "Leadership"]
```
- Green tags automatically detect positive keywords
- Pink tags automatically detect negative keywords

### Step 6: Customize Colors (Optional)
Edit `tailwind.config.js` to change accent colors:
```js
accent: {
  light: '#a3d5ff',      // Change baby blue
  DEFAULT: '#60a5fa',    // Change medium blue
}
gold: {
  DEFAULT: '#f59e0b',    // Change gold
}
```

### Step 7: Build for Production
```bash
npm run build
npm run preview
```
The `dist/` folder is ready to deploy!

---

## 🔧 Available Commands

```bash
# Development
npm run dev          # Start dev server with hot reload

# Production
npm run build        # Create optimized production build
npm run preview      # Preview production build locally
```

---

## 📚 File Descriptions

### Core Components

**App.svelte** - Main component
- Loads player data from JSON
- Manages filter state
- Switches between table/card views
- Handles sorting

**FilterPanel.svelte** - Filtering interface
- All filter controls in one sidebar
- Expandable sections
- Real-time filtering
- "Reset" button

**TableView.svelte** - Sortable data table
- All player columns visible
- Click headers to sort
- Click rows for detail view
- Compact, data-dense layout

**CardView.svelte** - Card grid layout
- Player photo prominent
- Key stats at a glance
- Club badge visible
- "View Details" button

**PlayerDetail.svelte** - Bottom sheet modal
- Full player information
- All statistics
- Financial details
- Tags
- Heart button for favorites

**ViewToggle.svelte** - View mode switcher
- Two buttons in header
- Switches between table and cards
- Settings button placeholder

### Utilities

**utils.ts** - Helper functions
- `formatCurrency()` - £M, £k formatting
- `formatDate()` - Human-readable dates
- `formatPosition()` - Join array positions
- `filterPlayers()` - Apply all filters
- `sortPlayers()` - Sort by any field
- `getPositionColor()` - Color for position
- `getTagColor()` - Color for tags
- `getUniquePositions()` - Get all unique positions
- `getPriceRange()` - Min/max prices
- `getWageRange()` - Min/max wages
- `getUniqueTags()` - Get all tags in database

### Styling

**tailwind.config.js**
- Dark theme configuration
- Custom colors (blue, gold)
- Responsive breakpoints
- Extended theme utilities

**app.css**
- Tailwind directives
- Custom scrollbar styling
- Component base styles

---

## 🐛 Troubleshooting

### "npm not found"
- Install Node.js from nodejs.org
- Restart terminal after installation

### "App won't start"
- Delete `node_modules` folder
- Delete `package-lock.json`
- Run `npm install` again
- Check for error messages in terminal

### "Images not showing"
- Verify files exist in correct folder
- Check filenames match exactly (including case on Linux/Mac)
- Browser cache issue: Hard refresh (Ctrl+Shift+R)

### "Filters are empty"
- Check `shortlist26.json` is valid JSON
- Use jsonlint.com to validate
- Restart dev server

### "Table not sortable"
- Click on column headers (not cells)
- Look for up/down arrows on hover

### "Bottom sheet doesn't open"
- Check browser console (F12) for errors
- Click on any player row/card

---

## 💡 Tips & Tricks

### Performance
- App loads entire dataset once, then filters client-side (instant)
- Sorting is performed in-memory (very fast)
- Images are lazy-loaded by browser automatically

### Mobile Testing
- Open DevTools (F12)
- Click device toggle (iPad/iPhone icons)
- Rotate your device to test responsive layout

### Data Validation
- Use jsonlint.com to validate shortlist26.json
- Check that all required fields are present
- Make sure dates are in ISO format (YYYY-MM-DD)

### Browser Support
- Chrome/Edge 90+ ✅
- Firefox 88+ ✅
- Safari 14+ ✅
- Mobile browsers ✅

---

## 📈 Future Enhancements

These features are easy to add later:

- ⭐ Save favorites to localStorage
- 📊 Advanced charts and comparison views
- 📈 Performance trend analysis
- 🔔 Price/wage change alerts
- 📥 Export to CSV/Excel
- 🎯 Smart recommendations based on filters
- 🌐 Multi-language support
- 🎨 Theme switcher (light/dark)

---

## 📝 Customization Examples

### Change App Title
**File**: `index.html`
```html
<title>Newcastle Transfer 2026</title>
```

### Change Header Text
**File**: `src/App.svelte`
```svelte
<h1 class="text-3xl font-bold">Your Title</h1>
<p class="text-accent-light text-sm">Your Subtitle</p>
```

### Add New Filter
**File**: `src/App.svelte` + `src/lib/components/FilterPanel.svelte`
- Add field to filters object
- Add input in FilterPanel
- Update filterPlayers() in utils.ts

### Modify Card Layout
**File**: `src/lib/components/CardView.svelte`
- Edit the grid template
- Change displayed fields
- Add/remove sections

---

## 🚀 Deployment

### Deploy to Netlify (Easiest)
1. Run `npm run build`
2. Go to netlify.com
3. Drag the `dist/` folder to upload
4. Done! Your app is live

### Deploy to GitHub Pages
1. Push to GitHub
2. Go to Settings → Pages
3. Build and deploy from `dist` folder

### Deploy to Vercel
1. Connect your Git repo
2. Vercel auto-deploys on git push
3. Your app is live instantly

---

## ✨ You're All Set!

Your Newcastle United player shortlist web app is ready to go. Start with:

```bash
npm install
npm run dev
```

Visit `http://localhost:5173` and enjoy! 🎉

For more details, see:
- **README.md** - Full documentation
- **QUICKSTART.md** - Quick reference guide
- **tailwind.config.js** - Color customization

Have fun building! ⚽🔵⚪
