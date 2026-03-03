import { Slide } from '@/lib/types';
import { SlideCanvas } from './SlideCanvas';

export function PresenterView({ slide, index, total }: { slide: Slide; index: number; total: number }) {
  return (
    <main className="h-screen bg-paper">
      <SlideCanvas slide={slide} index={index} total={total} mode="present" />
    </main>
  );
}
