import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Slide } from '@/lib/types';

type SlideViewProps = {
  slide: Slide;
  mode: 'editor' | 'present';
};

export function SlideView({ slide, mode }: SlideViewProps) {
  return (
    <article className="mx-auto max-w-4xl text-left">
      {slide.kicker && (
        <div className="mb-6 inline-flex rounded-full border border-line px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-neutral-600">
          {slide.kicker}
        </div>
      )}
      <h2 className="mb-4 text-6xl font-medium leading-[1.04] tracking-tight text-ink">{slide.title || 'Untitled'}</h2>
      {slide.subtitle && <p className="mb-10 text-2xl leading-relaxed text-neutral-600">{slide.subtitle}</p>}
      <div className={`markdown-body ${mode === 'present' ? 'text-lg' : 'text-base'} leading-relaxed text-neutral-700`}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{slide.body || 'Add markdown body content from the editor.'}</ReactMarkdown>
      </div>
    </article>
  );
}
