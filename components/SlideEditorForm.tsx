'use client';

import { Slide } from '@/lib/types';

export function SlideEditorForm({ slide, onChange }: { slide: Slide; onChange: (next: Slide) => void }) {
  return (
    <aside className="w-80 border-l border-line p-4">
      <h3 className="mb-4 text-xs uppercase tracking-[0.2em] text-neutral-500">Slide Editor</h3>
      <label className="mb-3 block text-xs uppercase tracking-wider text-neutral-600">
        Title
        <input
          aria-label="Slide title"
          value={slide.title}
          onChange={(e) => onChange({ ...slide, title: e.target.value })}
          className="mt-1 w-full rounded border border-line bg-white px-3 py-2 text-sm"
        />
      </label>
      <label className="block text-xs uppercase tracking-wider text-neutral-600">
        Body
        <textarea
          aria-label="Slide body"
          value={slide.body}
          onChange={(e) => onChange({ ...slide, body: e.target.value })}
          className="mt-1 h-72 w-full rounded border border-line bg-white px-3 py-2 text-sm"
        />
      </label>
    </aside>
  );
}
