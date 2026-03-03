'use client';

import { useEffect, useMemo, useState } from 'react';
import { Slide } from '@/lib/types';

type Props = {
  slide: Slide;
  direction: 'next' | 'prev';
  reduceMotion: boolean;
  renderSlide: (slide: Slide) => React.ReactNode;
};

export function SlideTransition({ slide, direction, reduceMotion, renderSlide }: Props) {
  const [prevSlide, setPrevSlide] = useState<Slide | null>(null);
  const [activeSlide, setActiveSlide] = useState(slide);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (slide.id === activeSlide.id) return;
    if (reduceMotion) {
      setPrevSlide(null);
      setActiveSlide(slide);
      setIsAnimating(false);
      return;
    }

    setPrevSlide(activeSlide);
    setActiveSlide(slide);
    setIsAnimating(true);
    const timer = setTimeout(() => {
      setPrevSlide(null);
      setIsAnimating(false);
    }, 220);

    return () => clearTimeout(timer);
  }, [activeSlide, reduceMotion, slide]);

  const incomingClass = useMemo(() => {
    if (reduceMotion || !isAnimating) return 'translate-x-0 opacity-100';
    return direction === 'next' ? 'animate-slide-in-next' : 'animate-slide-in-prev';
  }, [direction, isAnimating, reduceMotion]);

  const outgoingClass = useMemo(() => {
    if (reduceMotion || !isAnimating) return 'opacity-0';
    return direction === 'next' ? 'animate-slide-out-next' : 'animate-slide-out-prev';
  }, [direction, isAnimating, reduceMotion]);

  return (
    <div className="relative h-full w-full overflow-hidden">
      {prevSlide && (
        <div className={`absolute inset-0 ${outgoingClass}`} aria-hidden>
          {renderSlide(prevSlide)}
        </div>
      )}
      <div className={`relative h-full ${incomingClass}`}>{renderSlide(activeSlide)}</div>
    </div>
  );
}
