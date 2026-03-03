import { formatCounter } from '@/lib/helpers';
import { Slide } from '@/lib/types';

export function SlideCanvas({ slide, index, total }: { slide: Slide; index: number; total: number }) {
  return (
    <section className="relative flex h-full flex-1 items-center justify-center px-20">
      <div className="absolute left-10 top-8 text-xs uppercase tracking-[0.25em] text-neutral-500">{formatCounter(index, total)}</div>
      <div className="absolute right-10 top-8 text-xs text-neutral-500">← →</div>
      <article className="max-w-3xl text-center transition-all duration-150">
        <h2 className="mb-8 text-6xl font-medium leading-tight tracking-tight">{slide.title || 'Untitled'}</h2>
        <p className="whitespace-pre-wrap text-xl leading-relaxed text-neutral-700">{slide.body || 'Add body content from the editor.'}</p>
      </article>
    </section>
  );
}
