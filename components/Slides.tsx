'use client';
import * as React from 'react';

import {
  Carousel,
  CarouselNext,
  CarouselContent,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

export function Slides({ children }: { children: React.ReactNode }) {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );
  return (
    <Carousel
      opts={{
        align: 'start',
      }}
      className="w-3/4 sm:w-5/6 md:w-11/12 mx-auto"
      plugins={[plugin.current]}
    >
      <CarouselContent>{children}</CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
