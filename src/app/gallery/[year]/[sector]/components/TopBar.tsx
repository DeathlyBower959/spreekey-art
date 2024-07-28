'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { IArtLocation } from '~/utils/discord/gallery/galleryImages';

export function TopBar({ sector }: { sector: IArtLocation }) {
  return (
    <div className='flex gap-4 text-lg'>
      <Link href='main' className='relative font-bold cursor-pointer'>
        Main
        {sector === 'main' && (
          <motion.div
            layoutId='gallery-underline'
            className='absolute left-0 right-0 h-[3px] bg-[var(--foreground)]'
          />
        )}
      </Link>
      <Link href='sketches' className='relative font-bold cursor-pointer'>
        Sketches
        {sector === 'sketches' && (
          <motion.div
            layoutId='gallery-underline'
            className='absolute left-0 right-0 h-[3px] bg-[var(--foreground)]'
          />
        )}
      </Link>
      <Link href='alt' className='relative font-bold cursor-pointer'>
        Alt
        {sector === 'alt' && (
          <motion.div
            layoutId='gallery-underline'
            className='absolute left-0 right-0 h-[3px] bg-[var(--foreground)]'
          />
        )}
      </Link>
    </div>
  );
}
