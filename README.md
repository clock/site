# PS2 Portfolio

A modern portfolio website with a nostalgic PlayStation 2 aesthetic. Features smooth scrolling sections, Three.js particle backgrounds, and post-processing pixelation effects.

## Features

- **Smooth Scrolling Portfolio**: Traditional single-page layout with smooth scroll navigation
- **PS2 Aesthetic**: Pixel borders, gel highlights, retro color palette
- **Three.js Background**: Particle system in the hero section
- **Post-Processing Effects**: Optional pixelation, scanlines, and noise overlays
- **Responsive Design**: Works beautifully on desktop and mobile
- **Interactive Sections**: About, Projects, Skills, and Contact
- **Settings Panel**: Customize visual effects (pixelation level, scanlines)
- **Konami Code Easter Egg**: ↑↑↓↓←→←→BA unlocks dev room badge

## Tech Stack

- **React 18** with TypeScript
- **Three.js** & **React Three Fiber** for background effects
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Zustand** for state management
- **Vite** for build tooling

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── 3D/
│   │   └── ParticleBackground.tsx    # Three.js particle system
│   ├── UI/
│   │   └── SettingsPanel.tsx         # Visual effects controls
│   ├── Navigation.tsx                # Smooth scroll navigation
│   └── PixelationEffect.tsx          # Post-processing pixelation
├── sections/
│   ├── Hero.tsx                      # Hero section with 3D background
│   ├── About.tsx                     # About section
│   ├── Projects.tsx                  # Project showcase
│   ├── Skills.tsx                    # Skills grid
│   └── Contact.tsx                   # Contact form
├── store/
│   └── useStore.ts                   # Zustand state management
├── App.tsx                           # Main app component
└── main.tsx                          # Entry point
```

## Customization

### Adding Projects

Edit `src/sections/Projects.tsx` to add your own projects. Each project includes:
- Title and description
- Tech stack
- Objective, role, constraints, and outcomes
- GitHub and demo links

### Changing Colors

Update the PS2 color palette in `tailwind.config.js`:
```js
colors: {
  'ps2-blue': '#003399',
  'ps2-dark': '#0a0a0a',
  'ps2-accent': '#00aaff',
  // ...
}
```

### Adjusting Effects

- **Pixelation**: Toggle in Settings panel (240p, 360p, 720p, or off)
- **Scanlines**: Toggle scanline overlay
- **Motion Intensity**: Adjust animation intensity

## Sections

1. **Hero**: Landing section with Three.js particle background
2. **About**: Personal introduction and social links
3. **Projects**: Showcase of your work with detailed modals
4. **Skills**: Categorized skills display
5. **Contact**: Contact form and social links

## Performance

- Optimized Three.js rendering (particles only in hero)
- Lazy loading for project images
- CSS-based pixelation for performance
- Responsive design with mobile optimizations

## License

MIT
