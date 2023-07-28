'use client';
import Link from 'next/link';
import { AiFillHome } from 'react-icons/ai';
import { ImHeart } from 'react-icons/im';

import { IArtLocation } from '../api/discord/gallery/galleryImages';
import YearSidebar from './components/YearSidebar';

// TODO: Work on sidebar
export default function GalleryLayout({
  children,
  params: { sector },
}: {
  children: React.ReactNode;
  params: { sector: IArtLocation };
}) {
  return (
    // TODO: Convert [calc(100vh_-_5rem)] into a tailwind utility class
    <div className='relative flex min-h-screen w-full max-md:min-h-[calc(100vh_-_5rem)]'>
      {/* TODO: Work on after elements and stuff*/}
      {/* Sidebar w-[10em]*/}
      <div className='fixed left-0 top-0 flex h-screen w-0 flex-col items-center overflow-hidden bg-secondary pb-8 pt-12 text-center transition-[width] duration-500 ease-[ease] max-md:top-20 max-md:h-[calc(100vh_-_5rem)]'>
        <div className='my-8 flex h-full flex-col items-center gap-20 overflow-y-auto overflow-x-hidden py-8'>
          <YearSidebar sector={sector} />
        </div>
        <Link href='/gallery/favorites'>
          <ImHeart className='h-16 w-16 text-secondary transition-colors duration-200 ease-[ease] hover:text-[#f14255]' />
        </Link>
        <br />
        <Link href='/gallery'>
          <AiFillHome className='h-16 w-16 text-secondary' />
        </Link>
      </div>

      {/* Main */}
      <div className='flex flex-1 flex-col'>{children}</div>
    </div>
  );
}
