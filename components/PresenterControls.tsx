'use client';

type PresenterControlsProps = {
  isPresenter: boolean;
  isFullscreen: boolean;
  sidebarVisible?: boolean;
  onToggleSidebar?: () => void;
  onToggleFullscreen: () => void;
  onTogglePresenter: () => void;
};

export function PresenterControls({
  isPresenter,
  isFullscreen,
  sidebarVisible,
  onToggleSidebar,
  onToggleFullscreen,
  onTogglePresenter
}: PresenterControlsProps) {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full border border-line bg-paper/95 p-2 shadow-sm backdrop-blur">
      {onToggleSidebar && (
        <button
          aria-label="Toggle sidebar"
          onClick={onToggleSidebar}
          className="rounded-full border border-line px-3 py-1 text-xs uppercase tracking-[0.16em] text-neutral-600 hover:text-ink"
        >
          {sidebarVisible ? 'Hide Panel' : 'Show Panel'}
        </button>
      )}
      <button
        aria-label="Toggle fullscreen"
        onClick={onToggleFullscreen}
        className="rounded-full border border-line px-3 py-1 text-xs uppercase tracking-[0.16em] text-neutral-600 hover:text-ink"
      >
        {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
      </button>
      <button
        aria-label="Toggle presenter mode"
        onClick={onTogglePresenter}
        className="rounded-full border border-line px-3 py-1 text-xs uppercase tracking-[0.16em] text-neutral-600 hover:text-ink"
      >
        {isPresenter ? 'Exit Present' : 'Present'}
      </button>
    </div>
  );
}
