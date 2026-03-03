import { formatCounter } from '@/lib/helpers';
import { Slide } from '@/lib/types';
import { SlideView } from './SlideView';

type SlideCanvasProps = {
  slide: Slide;
  index: number;
  total: number;
  mode: 'editor' | 'present';
};

export function SlideCanvas({ slide, index, total, mode }: SlideCanvasProps) {
  return (
    <section className="relative flex h-full flex-1 justify-center px-20 py-20">
      <div className="absolute left-10 top-8 text-xs uppercase tracking-[0.25em] text-neutral-500">{formatCounter(index, total)}</div>
      {mode === 'present' && <div className="absolute right-10 top-8 text-xs text-neutral-500">← → to navigate</div>}
      <div className="w-full max-w-5xl"> 
        <SlideView slide={slide} mode={mode} />
      </div>
    </section>
  );
}
