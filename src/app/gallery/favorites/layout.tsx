'use client';

import { GalleryView } from './components/galleryView';

export default function FavoritesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <GalleryView isFavorite={true} />
      {children}
    </div>
  );
}
