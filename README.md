# Newcastle United - Player Shortlist Web App

A modern, responsive web application for managing Newcastle United's transfer shortlist with advanced filtering, multiple view modes, and detailed player analytics.

## Tech Stack

- **Vite** - Lightning-fast build tool and dev server
- **Svelte** - Lightweight, reactive UI framework
- **Tailwind CSS** - Utility-first CSS framework with dark theme support
- **Lucide Icons** - Beautiful, consistent icon set

## Features

✨ **Dual View Modes**
- 📊 Table view (default) - Sortable columns, compact layout
- 🎴 Card view - Visual player cards with details

🔍 **Advanced Filtering**
- Search by player name
- Filter by position, nationality, club
- Price range filtering (asking price)
- Wage range filtering (weekly salary)
- Height range filtering (when available)
- Contract expiry date filtering
- Tag-based filtering (custom tags)

📱 **Multi-Device Support**
- Fully responsive design
- Mobile-optimized card and bottom sheet layouts
- Touch-friendly interface

🎨 **Modern UI**
- Dark theme aesthetic
- Baby blue and gold accent colors (customizable)
- Smooth animations and transitions
- Lucide icons throughout

📊 **Player Details**
- Comprehensive bottom sheet player view
- Player statistics (apps, goals, assists, xG, etc.)
- Performance metrics
- Contract information
- Nationality flags
- Club emblems
- Player photos

## Project Structure

```
shortlist/
├── src/
│   ├── lib/
│   │   ├── components/
│   │   │   ├── FilterPanel.svelte      # Advanced filter controls
│   │   │   ├── TableView.svelte        # Sortable table display
│   │   │   ├── CardView.svelte         # Card grid display
│   │   │   ├── PlayerDetail.svelte     # Bottom sheet player details
│   │   │   └── ViewToggle.svelte       # View mode switcher
│   │   └── utils.ts                    # Utility functions
│   ├── App.svelte                      # Main application component
│   ├── app.css                         # Tailwind + custom styles
│   └── main.js                         # Application entry point
├── img/
│   ├── players/                        # Player photos (add here)
│   ├── clubs/                          # Club badges (add here)
│   └── nations/                        # Flag images (add here)
├── index.html                          # HTML template
├── shortlist26.json                    # Player data (main database)
├── package.json                        # Dependencies
├── vite.config.js                      # Vite configuration
├── tailwind.config.js                  # Tailwind customization
├── postcss.config.js                   # PostCSS plugins
└── tsconfig.json                       # TypeScript configuration
```

## Getting Started

### Prerequisites
- Node.js 16.0 or higher
- npm or yarn

### Installation

1. Clone or extract the project
2. Install dependencies:
```bash
npm install
```

### Development

Start the development server:
```bash
npm run dev
```

The app will open at `http://localhost:5173`

### Building for Production

Create an optimized production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Adding Assets

### Player Photos
- Add player images to `/img/players/`
- File naming: Use the player's ID (e.g., `55038655.png`)
- Recommended: Square format, 300x300px minimum

### Club Badges
- Add club logos to `/img/clubs/`
- File naming: Lowercase club name (e.g., `wolves.png`)
- Recommended: Square format, 64x64px minimum

### Flag Images
- Add country flags to `/img/nations/`
- File naming: ISO country code in lowercase (e.g., `por.png`, `irl.png`)
- Recommended: Rectangle format, 32x24px minimum

## JSON Data Structure

The player data in `shortlist26.json` follows this structure:

```json
{
  "id": "player_id",
  "name": "Player Name",
  "visuals": {
    "playerPhoto": "img/players/55038655.png",
    "clubBadge": "img/clubs/wolves.png",
    "nationFlag": "img/por.png"
  },
  "info": {
    "club": "Club Name",
    "nation": "ISO_CODE",
    "position": ["GK"],
    "age": 32
  },
  "financial": {
    "wage": 65000,
    "expiry": "2027-06-30",
    "askingPrice": 300000000
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
  "tags": ["potential positive tag", "potential concern"]
}
```

## Customization

### Color Scheme
Edit `tailwind.config.js` to change accent colors:
- `accent-light`: #a3d5ff (baby blue)
- `accent-DEFAULT`: #60a5fa (medium blue)
- `gold-DEFAULT`: #f59e0b (gold accent)

### Tags
Tags support custom color coding:
- Positive tags (green): Include words like "good", "strong", "elite"
- Negative tags (pink): Include words like "weak", "injury", "concern"

Modify the `getTagColor()` function in `src/lib/utils.ts` for custom logic.

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Tips

- Images are lazy-loaded automatically by the browser
- Player data is loaded once on app startup
- Filtering and sorting are performed client-side for instant response
- The app is optimized for networks with typical speeds

## Future Enhancements

- ⭐ Favorites/watchlist functionality
- 📊 Advanced data visualizations and charts
- 📈 Trend analysis and comparison tools
- 🔔 Price/wage change notifications
- 📥 Data export (CSV, JSON)
- 🎯 Smart recommendations
- 📱 Progressive Web App (PWA) support

## License

Created for Newcastle United transfer analysis - 2026

## Support

For issues or feature requests, please ensure:
1. All image files are in the correct directories
2. JSON data structure matches the expected format
3. File paths in JSON are relative and correct
4. All required image files exist (missing images will show placeholders)

