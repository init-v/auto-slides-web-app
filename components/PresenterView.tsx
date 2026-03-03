'use client';

import { SlideCanvas } from './SlideCanvas';
import { Slide } from '@/lib/types';

export function PresenterView({ slide, index, total }: { slide: Slide; index: number; total: number }) {
  return (
    <main className="h-screen bg-paper">
      <SlideCanvas slide={slide} index={index} total={total} />
    </main>
  );
}
