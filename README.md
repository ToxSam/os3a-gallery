# OpenSource3DAssets.com

> 🇯🇵 **日本語版はこちら / [Japanese version available here](README.ja.md)**

The central registry for discovering free and open source 3D assets

🌐 [opensource3dassets.com](https://opensource3dassets.com)

A curated directory that makes it easy to find GLB 3D assets you can actually use - CC0 public domain models, props, environments, and structures with clear licensing.

## What is this?

OpenSource3DAssets.com is a discovery platform for high-quality, freely available 3D assets suitable for games, VR experiences, 3D projects, and more.

We showcase assets from talented creators:

- **Polygonal Mind Collections** - 17 themed collections with 991+ assets
  - MomusPark - Park environment assets
  - Medieval Fair - Medieval festival props and structures
  - Tomb Chaser 1 - Egyptian pyramid themed assets
  - Tomb Chaser 2 - Japanese neon pagoda assets
  - Chromatic Chaos - Vaporwave 80s aesthetic
  - Crystal Crossroads - Moebius-inspired desert environment
  - And 11 more unique collections!
- **Other creators' CC0 work** (coming soon)

Our mission: Make it dead simple to find quality 3D assets with transparent licensing.

## Current Collections

### Polygonal Mind Collections (CC0)

- **991+ 3D Assets** across 17 themed collections
- Format: GLB (compatible with Blender, Unity, Unreal Engine, Three.js, and more)
- Permanently stored on GitHub
- Use however you want, no attribution needed
- Perfect for game development, VR projects, 3D visualization

Each collection clearly displays its license so you know exactly what you can do with it.

## Features

### 🔍 Browse & Filter

- Search by collection, theme, or style
- Filter by license type (CC0, CC-BY, etc.)
- Preview 3D models before downloading
- Interactive 3D viewer powered by Three.js

### 📦 Asset Finder

Batch operations for efficient workflow:

- Multi-select assets for bulk download
- Filter and search across collections
- Preview thumbnails and metadata
- Download individual assets or entire collections

### 🎨 3D Viewer

Interactive viewer for inspecting assets:

- Rotate, zoom, and pan 3D models
- Material and texture inspection
- Polygon and vertex count info
- Export format compatibility check

## Technical Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: TailwindCSS
- **3D Rendering**: Three.js with GLTFLoader
- **Data Storage**: GitHub (JSON files)
- **Deployment**: Vercel
- **License**: MIT

## Data Source

All asset metadata is stored in the [open-source-3D-assets](https://github.com/ToxSam/open-source-3D-assets) repository.

```
data/
├── projects.json           # Collection metadata
└── assets/
    ├── pm-momuspark.json  # MomusPark assets
    ├── pm-medieval.json   # Medieval Fair assets
    └── ...                # Other collections
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/ToxSam/os3a-gallery.git

# Install dependencies
cd os3a-gallery
npm install

# Run development server
npm run dev
```

Visit `http://localhost:3000` to see the gallery.

### Environment Variables

Create a `.env.local` file:

```env
GITHUB_REPO_OWNER=ToxSam
GITHUB_REPO_NAME=open-source-3D-assets
GITHUB_BRANCH=main
```

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── en/                 # English routes
│   ├── ja/                 # Japanese routes
│   └── api/                # API routes
├── components/             # React components
│   ├── asset/              # Asset-related components
│   ├── finder/             # Finder/browser components
│   └── VRMViewer/          # 3D viewer components
├── lib/                    # Utility functions
├── locales/                # i18n translations
└── types/                  # TypeScript types
```

## Contributing

We welcome contributions! Here's how you can help:

1. **Add Your Assets**: Submit a PR to the [data repository](https://github.com/ToxSam/open-source-3D-assets)
2. **Improve the Gallery**: Fix bugs, add features, improve UI/UX
3. **Translate**: Help translate the site into more languages
4. **Report Issues**: Found a bug? [Open an issue](https://github.com/ToxSam/os3a-gallery/issues)

## License

This project (the gallery website) is licensed under the MIT License - see the LICENSE file for details.

The 3D assets themselves have their own licenses (mostly CC0) - check each collection's license information.

## Credits

- **Gallery Development**: ToxSam
- **3D Assets**: Polygonal Mind and contributing creators
- **Three.js**: Amazing 3D rendering library
- **Next.js**: Fantastic React framework

## Links

- 🌐 Website: [opensource3dassets.com](https://opensource3dassets.com)
- 📊 Data Repository: [github.com/ToxSam/open-source-3D-assets](https://github.com/ToxSam/open-source-3D-assets)
- 🐦 Twitter: [@toxsam](https://twitter.com/toxsam)
- 💬 Discord: [Join our community](#)

## Roadmap

- [ ] Add more asset collections from other creators
- [ ] Implement advanced filtering (by polygon count, material type, etc.)
- [ ] Add asset preview videos
- [ ] Create asset tagging system

---

Made with ❤️ by ToxSam | Powered by Next.js & Three.js
