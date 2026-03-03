'use client';

type TopBarProps = {
  title: string;
  onTitleChange: (value: string) => void;
  onToggleHelp: () => void;
  onExport: () => void;
  onImport: (file: File) => void;
  onTogglePresenter: () => void;
};

export function TopBar({ title, onTitleChange, onToggleHelp, onExport, onImport, onTogglePresenter }: TopBarProps) {
  return (
    <header className="flex h-14 items-center justify-between border-b border-line px-6">
      <input
        aria-label="Presentation title"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        className="w-[420px] max-w-full bg-transparent text-sm tracking-wide outline-none"
      />
      <div className="flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-neutral-600">
        <button aria-label="Import presentation" className="hover:text-ink" onClick={() => document.getElementById('import-json')?.click()}>
          Import
        </button>
        <input
          id="import-json"
          type="file"
          accept="application/json"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onImport(file);
            e.currentTarget.value = '';
          }}
        />
        <button aria-label="Export presentation" className="hover:text-ink" onClick={onExport}>Export</button>
        <button aria-label="Toggle presenter mode" className="hover:text-ink" onClick={onTogglePresenter}>Present</button>
        <button aria-label="Show shortcuts" className="hover:text-ink" onClick={onToggleHelp}>?</button>
      </div>
    </header>
  );
}
