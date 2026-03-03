# Auto Slides Web App

Desktop-first minimal slide editor/presenter inspired by documentation-like slide pages.

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

- Minimal slide editor with left slide list, central canvas, right panel form
- Autosave to localStorage with debounce
- Import/export JSON presentations
- Presenter mode (`/present/[id]`) with slide counter + arrow navigation
- Optional overview grid in presenter via `O`

## Keybindings

- `← / →` previous/next slide
- `Ctrl/Cmd + N` new slide
- `Ctrl/Cmd + D` duplicate slide
- `Delete / Backspace` delete slide (when not typing)
- `P` toggle presenter mode
- `F` fullscreen toggle in presenter view
- `?` shortcuts modal
- `Esc` exit presenter view
