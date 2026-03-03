# Auto Slides Web App

Desktop-first minimal slide editor/presenter inspired by documentation-style slide pages.

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Scripts

- `npm run dev` - development server
- `npm run build` - production build
- `npm run start` - run production server
- `npm run lint` - lint check

## Features

- Documentation-like slide typography: kicker pill, title, subtitle, and markdown body preview
- Left slide list + center canvas + right editor panel
- Smooth next/prev slide transitions (disabled when reduced-motion is enabled)
- Progress counter (`01 / 11`) and present-mode arrow hint (`← → to navigate`)
- Floating bottom-right controls: sidebar toggle (editor), fullscreen, present/exit present
- Autosave to localStorage with debounce
- Import/export JSON presentations
- Presenter mode (`/present/[id]`) with fullscreen and overview grid (`O`)

## Keybindings

- `← / →` previous/next slide (outside typing fields)
- `Ctrl/Cmd + N` new slide
- `Ctrl/Cmd + D` duplicate slide
- `Delete / Backspace` delete slide (outside typing fields)
- `P` toggle presenter mode
- `F` fullscreen toggle
- `?` shortcuts modal
- `Esc` exit presenter view
- `O` presenter overview toggle

## How to test quickly

1. Run quality checks:
   - `npm run lint`
   - `npm run build`
2. Run the app:
   - `npm run dev`
3. Manual QA:
   - Create a slide with kicker/title/subtitle and markdown (list + code block + link)
   - Use `← →` to navigate and confirm horizontal transitions
   - Toggle sidebar from bottom-right controls
   - Toggle fullscreen in editor and presenter (`F` or button), then press `Esc`
   - Enter presenter (`P` or button), verify `← →` navigation and `← → to navigate` hint
   - Enable reduced-motion in OS/browser and verify transitions stop
