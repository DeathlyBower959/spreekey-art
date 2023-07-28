'use client';

import clsx from 'clsx';
import Image, { StaticImageData } from 'next/image';
import { useState } from 'react';

interface IProps {
  src: StaticImageData;
  alt: string;
  className?: string;
  props?: any;
}

// Main
function LazyImage({ src, alt = '', className, props }: IProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Image
      {...props}
      className={clsx(className, 'transition-[opacity,filter] duration-500', {
        ['opacity-1 blur-0']: loaded,
        ['opacity-0 blur-[30px]']: !loaded,
      })}
      onLoad={() => {
        setLoaded(true);
      }}
      src={src}
      alt={alt}
    />
  );
}

export default LazyImage;
