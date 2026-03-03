import { Presentation } from './types';

const KEY = 'auto-slides-presentations';

export const createDefaultPresentation = (): Presentation => ({
  id: crypto.randomUUID(),
  title: 'Untitled Presentation',
  updatedAt: new Date().toISOString(),
  slides: [
    {
      id: crypto.randomUUID(),
      kicker: 'Security Guide',
      title: 'Welcome',
      subtitle: 'A documentation-style slide canvas',
      body: 'Start editing this slide.\n\n- Use ← → to navigate\n- Use **markdown** for rich content\n\n```ts\nconst ready = true;\n```'
    }
  ]
});

export const loadPresentations = (): Presentation[] => {
  if (typeof window === 'undefined') return [];
  const raw = localStorage.getItem(KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as Presentation[];
    return parsed
      .filter((item) => item?.id && item?.slides?.length)
      .map((item) => ({
        ...item,
        slides: item.slides.map((slide) => ({
          ...slide,
          kicker: slide.kicker ?? '',
          subtitle: slide.subtitle ?? ''
        }))
      }));
  } catch {
    return [];
  }
};

export const savePresentations = (presentations: Presentation[]) => {
  localStorage.setItem(KEY, JSON.stringify(presentations));
};

export const upsertPresentation = (target: Presentation, existing: Presentation[]) => {
  const next = [...existing];
  const idx = next.findIndex((item) => item.id === target.id);
  if (idx >= 0) next[idx] = target;
  else next.unshift(target);
  return next;
};
