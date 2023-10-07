import {
  IArtLocation,
  IArtLocationKeys,
} from '~/app/api/discord/gallery/galleryImages';

import { GalleryView } from '../../components/GalleryView';
import { TopBar } from './components/TopBar';

export function generateStaticParams() {
  return IArtLocationKeys.map(sector => ({
    sector,
  }));
}

const dynamicParams = false;
export { dynamicParams };

export default function SectorLayout({
  children,
  params: { year, sector },
}: {
  children: React.ReactNode;
  params: { year: number; sector: IArtLocation };
}) {
  return (
    <div>
      {/* Year bar */}
      <div className='flex h-40 flex-col items-center justify-center overflow-hidden bg-tertiary text-center'>
        <h1 className='text-6xl font-bold'>{year || ''}</h1>
        <TopBar sector={sector} />
      </div>
      <GalleryView year={year} sector={sector} />
      {children}
    </div>
  );
}
