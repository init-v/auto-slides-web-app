'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Presentation, Slide } from '@/lib/types';
import { createDefaultPresentation, loadPresentations, savePresentations, upsertPresentation } from '@/lib/storage';
import { debounce, isTypingTarget } from '@/lib/helpers';
import { SlideCanvas } from './SlideCanvas';
import { SlideEditorForm } from './SlideEditorForm';
import { SlideList } from './SlideList';
import { TopBar } from './TopBar';
import { ShortcutsModal } from './ShortcutsModal';
import { SlideTransition } from './SlideTransition';
import { PresenterControls } from './PresenterControls';

export function EditorShell({ initialId }: { initialId?: string }) {
  const router = useRouter();
  const [presentation, setPresentation] = useState<Presentation | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [helpOpen, setHelpOpen] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(media.matches);
    const update = () => setReduceMotion(media.matches);
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const all = loadPresentations();
    const found = initialId ? all.find((item) => item.id === initialId) : all[0];
    const current = found ?? createDefaultPresentation();
    if (!found) savePresentations(upsertPresentation(current, all));
    setPresentation(current);
    if (!initialId) router.replace(`/p/${current.id}`);
  }, [initialId, router]);

  useEffect(() => {
    const onChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, []);

  const persist = useMemo(
    () => debounce((next: Presentation) => savePresentations(upsertPresentation(next, loadPresentations())), 500),
    []
  );

  useEffect(() => {
    if (!presentation) return;
    persist(presentation);
  }, [presentation, persist]);

  const updateSlides = useCallback(
    (slides: Slide[], nextIndex = currentIndex) => {
      if (!presentation) return;
      const normalized = slides.length
        ? slides
        : [{ id: crypto.randomUUID(), kicker: '', title: 'New Slide', subtitle: '', body: '' }];
      setPresentation({ ...presentation, slides: normalized, updatedAt: new Date().toISOString() });
      setCurrentIndex(Math.min(Math.max(nextIndex, 0), normalized.length - 1));
    },
    [currentIndex, presentation]
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!presentation) return;

      if (event.key === '?' && !event.metaKey && !event.ctrlKey) {
        event.preventDefault();
        setHelpOpen((prev) => !prev);
      }

      if (isTypingTarget(event.target)) return;

      if (event.key === 'ArrowRight') {
        setDirection('next');
        setCurrentIndex((prev) => Math.min(prev + 1, presentation.slides.length - 1));
      }
      if (event.key === 'ArrowLeft') {
        setDirection('prev');
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
      }

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'n') {
        event.preventDefault();
        const slide = { id: crypto.randomUUID(), kicker: '', title: 'New Slide', subtitle: '', body: '' };
        const next = [...presentation.slides.slice(0, currentIndex + 1), slide, ...presentation.slides.slice(currentIndex + 1)];
        updateSlides(next, currentIndex + 1);
      }

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'd') {
        event.preventDefault();
        const src = presentation.slides[currentIndex];
        const copy = { ...src, id: crypto.randomUUID(), title: `${src.title} Copy` };
        const next = [...presentation.slides.slice(0, currentIndex + 1), copy, ...presentation.slides.slice(currentIndex + 1)];
        updateSlides(next, currentIndex + 1);
      }

      if ((event.key === 'Delete' || event.key === 'Backspace') && !isTypingTarget(event.target)) {
        event.preventDefault();
        if (window.confirm('Delete this slide?')) {
          const next = presentation.slides.filter((_, i) => i !== currentIndex);
          updateSlides(next, Math.max(0, currentIndex - 1));
        }
      }

      if (event.key.toLowerCase() === 'p' && !event.metaKey && !event.ctrlKey) {
        router.push(`/present/${presentation.id}`);
      }

      if (event.key.toLowerCase() === 'f' && !event.metaKey && !event.ctrlKey) {
        if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(() => {});
        else document.exitFullscreen().catch(() => {});
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [currentIndex, presentation, router, updateSlides]);

  if (!presentation) return null;
  const current = presentation.slides[currentIndex];

  return (
    <div className="h-screen">
      <TopBar
        title={presentation.title}
        onTitleChange={(title) => setPresentation({ ...presentation, title, updatedAt: new Date().toISOString() })}
        onToggleHelp={() => setHelpOpen((prev) => !prev)}
        onExport={() => {
          const blob = new Blob([JSON.stringify(presentation, null, 2)], { type: 'application/json' });
          const a = document.createElement('a');
          a.href = URL.createObjectURL(blob);
          a.download = `${presentation.title || 'presentation'}.json`;
          a.click();
          URL.revokeObjectURL(a.href);
        }}
        onImport={async (file) => {
          const text = await file.text();
          const parsed = JSON.parse(text) as Presentation;
          setPresentation({ ...parsed, updatedAt: new Date().toISOString() });
          setCurrentIndex(0);
          router.replace(`/p/${parsed.id}`);
        }}
        onTogglePresenter={() => router.push(`/present/${presentation.id}`)}
      />
      <div className="flex h-[calc(100vh-56px)] min-w-[980px]">
        {sidebarVisible && (
          <SlideList
            slides={presentation.slides}
            currentIndex={currentIndex}
            onSelect={(index) => {
              setDirection(index > currentIndex ? 'next' : 'prev');
              setCurrentIndex(index);
            }}
            onNew={() => {
              const slide = { id: crypto.randomUUID(), kicker: '', title: 'New Slide', subtitle: '', body: '' };
              updateSlides([...presentation.slides, slide], presentation.slides.length);
            }}
            onDelete={() => {
              if (window.confirm('Delete this slide?')) updateSlides(presentation.slides.filter((_, i) => i !== currentIndex), Math.max(0, currentIndex - 1));
            }}
            onDuplicate={() => {
              const src = presentation.slides[currentIndex];
              updateSlides([...presentation.slides.slice(0, currentIndex + 1), { ...src, id: crypto.randomUUID(), title: `${src.title} Copy` }, ...presentation.slides.slice(currentIndex + 1)], currentIndex + 1);
            }}
            onMove={(moveDirection) => {
              const target = moveDirection === 'up' ? currentIndex - 1 : currentIndex + 1;
              if (target < 0 || target >= presentation.slides.length) return;
              const next = [...presentation.slides];
              [next[currentIndex], next[target]] = [next[target], next[currentIndex]];
              setDirection(moveDirection === 'up' ? 'prev' : 'next');
              updateSlides(next, target);
            }}
          />
        )}
        <div className="flex-1">
          <SlideTransition
            slide={current}
            direction={direction}
            reduceMotion={reduceMotion}
            renderSlide={(transitionSlide) => <SlideCanvas slide={transitionSlide} index={currentIndex} total={presentation.slides.length} mode="editor" />}
          />
        </div>
        <SlideEditorForm
          slide={current}
          onChange={(slide) => updateSlides(presentation.slides.map((s, i) => (i === currentIndex ? slide : s)), currentIndex)}
        />
      </div>
      <PresenterControls
        isPresenter={false}
        isFullscreen={isFullscreen}
        sidebarVisible={sidebarVisible}
        onToggleSidebar={() => setSidebarVisible((prev) => !prev)}
        onToggleFullscreen={() => {
          if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(() => {});
          else document.exitFullscreen().catch(() => {});
        }}
        onTogglePresenter={() => router.push(`/present/${presentation.id}`)}
      />
      <ShortcutsModal open={helpOpen} onClose={() => setHelpOpen(false)} />
    </div>
  );
}
