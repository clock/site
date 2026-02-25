# Portfolio

A personal portfolio website built with React, TypeScript, and Three.js, featuring interactive 3D elements, smooth animations, and a terminal-style UI.

## Tech Stack

- **React 18** + **TypeScript**
- **Three.js** via `@react-three/fiber` and `@react-three/drei` — 3D backgrounds, particle effects, and interactive meshes
- **Framer Motion** — section and element animations
- **GSAP** — scroll-driven animations
- **Tailwind CSS** — styling
- **Zustand** — global state management
- **Vite** — build tooling

## Getting Started

```bash
npm install
npm run dev
```

The dev server will start at `http://localhost:5173`.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## Project Structure

```
src/
├── sections/        # Page sections (Hero, About, Skills, Projects, Contact)
├── components/      # Reusable UI and 3D components
│   ├── 3D/          # Three.js scene components
│   └── ui/          # Generic UI primitives
├── hooks/           # Custom React hooks
├── store/           # Zustand store
└── utils/           # Utility functions
```
