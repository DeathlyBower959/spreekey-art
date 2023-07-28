'use client';

import clsx from 'clsx';
import { StaticImageData } from 'next/image';
import Parallax from 'parallax-js';
import { useLayoutEffect, useRef } from 'react';
import BackgroundImage from '~/assets/404/Background.webp';
import MothImage from '~/assets/404/Moth.webp';
import PipeImage from '~/assets/404/Pipe.webp';
import SalvElieImage from '~/assets/404/SalvElie.webp';
import SilkeImage from '~/assets/404/Silke.webp';
import SunImage from '~/assets/404/Sun.webp';
// Layers
import VignetteImage from '~/assets/404/Vignette.webp';
import LazyImage from '~/components/atoms/LazyImage';

interface ILayerProps {
  src: StaticImageData;
  blend?:
    | 'normal'
    | 'multiply'
    | 'screen'
    | 'overlay'
    | 'darken'
    | 'lighten'
    | 'color-dodge'
    | 'color-burn'
    | 'hard-light'
    | 'soft-light'
    | 'difference'
    | 'exclusion'
    | 'hue'
    | 'saturation'
    | 'color'
    | 'luminosity';
  opacity?: number;
  dataDepth: string;
}

export default function PageNotFound() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const node: any = parallaxRef.current;
    if (node)
      new Parallax(node, {
        limitY: 0,
        precision: 1,
      });
  }, []);

  return (
    <>
      <div
        className='flex h-[calc(100vh_-_5rem)] w-full items-center justify-center overflow-hidden saturate-[1.1]'
        ref={parallaxRef}
      >
        <Layer dataDepth='0.05' src={BackgroundImage} />
        <Layer dataDepth='0.1' src={MothImage} />

        <Layer dataDepth='0.2' blend='overlay' opacity={0.2} src={SunImage} />
        <Layer dataDepth='0.5' src={SalvElieImage} />
        <Layer dataDepth='0.4' src={PipeImage} />
        <Layer dataDepth='0.4' src={SilkeImage} />
        <Layer
          dataDepth='0'
          blend='multiply'
          opacity={0.36}
          src={VignetteImage}
        />
      </div>
      <h1
        style={{ fontSize: 'clamp(4em, 10vw, 10em)' }}
        className='absolute left-1/2 top-1/2 w-min -translate-x-1/2 -translate-y-1/2 rounded-lg border-[1px] border-solid border-gray-300 bg-transparent px-[0.4em] py-[0.1em] text-center indent-[0.5em] font-bold tracking-[0.5em] text-gray-300 shadow-[0_0_18px_4px_rgba(0,0,0,0.61)] backdrop-blur-sm'
      >
        404
      </h1>
    </>
  );
}

function Layer({ src, blend, opacity, dataDepth }: ILayerProps) {
  return (
    <LazyImage
      props={{ 'data-depth': dataDepth }}
      src={src}
      alt='404 not found background image'
      className={clsx(
        // max-w- is needed because in the layout.css file, it sets a max width of 100% for images, throwing off needed overflow
        'ml-[-5%] h-[110%] w-[110%] max-w-[110%] select-none object-cover object-[30%_50%]',
        `blend-[${blend || 'normal'}]`,
        `opacity-[${opacity || '1'}]`
      )}
    />
  );
}
