'use client';

import { Slide } from '@/lib/types';

type Props = {
  slides: Slide[];
  currentIndex: number;
  onSelect: (index: number) => void;
  onNew: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
  onMove: (direction: 'up' | 'down') => void;
};

export function SlideList({ slides, currentIndex, onSelect, onNew, onDelete, onDuplicate, onMove }: Props) {
  return (
    <aside className="w-64 border-r border-line p-4">
      <div className="mb-4 flex gap-2 text-xs uppercase tracking-wider">
        <button className="rounded border border-line px-2 py-1 hover:bg-white" onClick={onNew}>+ New</button>
        <button className="rounded border border-line px-2 py-1 hover:bg-white" onClick={onDuplicate}>Duplicate</button>
      </div>
      <ol className="space-y-2">
        {slides.map((slide, idx) => (
          <li key={slide.id}>
            <button
              aria-label={`Select slide ${idx + 1}`}
              onClick={() => onSelect(idx)}
              className={`w-full rounded border p-3 text-left text-sm ${idx === currentIndex ? 'border-ink bg-white' : 'border-line bg-transparent hover:bg-white'}`}
            >
              <div className="text-[10px] uppercase tracking-[0.2em] text-neutral-500">{String(idx + 1).padStart(2, '0')}</div>
              <div className="truncate">{slide.title || 'Untitled slide'}</div>
            </button>
          </li>
        ))}
      </ol>
      <div className="mt-4 flex gap-2 text-xs">
        <button className="rounded border border-line px-2 py-1" onClick={() => onMove('up')}>↑</button>
        <button className="rounded border border-line px-2 py-1" onClick={() => onMove('down')}>↓</button>
        <button className="rounded border border-line px-2 py-1 text-red-700" onClick={onDelete}>Delete</button>
      </div>
    </aside>
  );
}
