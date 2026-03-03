'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { loadPresentations } from '@/lib/storage';
import { Presentation } from '@/lib/types';
import { isTypingTarget } from '@/lib/helpers';
import { PresenterView } from './PresenterView';
import { SlideTransition } from './SlideTransition';
import { PresenterControls } from './PresenterControls';

export function PresenterShell({ id }: { id: string }) {
  const router = useRouter();
  const [presentation, setPresentation] = useState<Presentation | null>(null);
  const [index, setIndex] = useState(0);
  const [overview, setOverview] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [reduceMotion, setReduceMotion] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(media.matches);
    const update = () => setReduceMotion(media.matches);
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const onChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, []);

  useEffect(() => {
    const target = loadPresentations().find((item) => item.id === id);
    if (!target) {
      router.replace('/');
      return;
    }
    setPresentation(target);
  }, [id, router]);

  useEffect(() => {
    const onKeyDown = async (event: KeyboardEvent) => {
      if (!presentation || isTypingTarget(event.target)) return;
      if (event.key === 'ArrowRight') {
        setDirection('next');
        setIndex((prev) => Math.min(prev + 1, presentation.slides.length - 1));
      }
      if (event.key === 'ArrowLeft') {
        setDirection('prev');
        setIndex((prev) => Math.max(prev - 1, 0));
      }
      if (event.key === 'Escape') {
        if (document.fullscreenElement) await document.exitFullscreen().catch(() => {});
        router.push(`/p/${id}`);
      }
      if (event.key.toLowerCase() === 'p') router.push(`/p/${id}`);
      if (event.key.toLowerCase() === 'o') setOverview((v) => !v);
      if (event.key.toLowerCase() === 'f') {
        if (!document.fullscreenElement) await document.documentElement.requestFullscreen().catch(() => {});
        else await document.exitFullscreen().catch(() => {});
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [id, presentation, router]);

  if (!presentation) return null;

  return (
    <div className="h-screen">
      {overview ? (
        <div className="grid h-screen grid-cols-3 gap-4 p-6">
          {presentation.slides.map((slide, i) => (
            <button
              key={slide.id}
              className="rounded border border-line p-4 text-left"
              onClick={() => {
                setDirection(i > index ? 'next' : 'prev');
                setIndex(i);
                setOverview(false);
              }}
            >
              <div className="mb-2 text-xs text-neutral-500">{String(i + 1).padStart(2, '0')}</div>
              <div className="text-lg">{slide.title}</div>
            </button>
          ))}
        </div>
      ) : (
        <SlideTransition
          slide={presentation.slides[index]}
          direction={direction}
          reduceMotion={reduceMotion}
          renderSlide={(slide) => <PresenterView slide={slide} index={index} total={presentation.slides.length} />}
        />
      )}
      <PresenterControls
        isPresenter
        isFullscreen={isFullscreen}
        onToggleFullscreen={() => {
          if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(() => {});
          else document.exitFullscreen().catch(() => {});
        }}
        onTogglePresenter={() => router.push(`/p/${id}`)}
      />
    </div>
  );
}
