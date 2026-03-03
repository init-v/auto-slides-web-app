'use client';

const items = [
  ['← / →', 'Previous / next slide (outside inputs)'],
  ['Ctrl/Cmd + N', 'New slide'],
  ['Ctrl/Cmd + D', 'Duplicate slide'],
  ['Delete / Backspace', 'Delete slide'],
  ['P', 'Toggle presenter mode'],
  ['F', 'Toggle fullscreen'],
  ['O', 'Presenter overview'],
  ['?', 'Toggle help']
];

export function ShortcutsModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20" onClick={onClose}>
      <div className="w-[460px] rounded border border-line bg-paper p-6" onClick={(e) => e.stopPropagation()}>
        <h2 className="mb-4 text-sm uppercase tracking-[0.2em]">Keyboard shortcuts</h2>
        <ul className="space-y-2 text-sm">
          {items.map(([key, desc]) => (
            <li key={key} className="flex justify-between gap-4 border-b border-line pb-2">
              <kbd>{key}</kbd>
              <span>{desc}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
