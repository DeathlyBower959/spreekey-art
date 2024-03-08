'use client';

import { Masonry, RenderComponentProps } from 'masonic';

import { IArt } from '../../api/discord/gallery/galleryImages';
import GalleryImage from './GalleryImage';

interface IProps {
  items: IArt[];
}

function MasonryCard({ data }: RenderComponentProps<IArt>) {
  return <GalleryImage key={data.url} art={data} />;
}

export function GalleryView({ items }: IProps) {
  return (
    <Masonry
      items={items}
      render={MasonryCard}
      columnCount={3}
      columnGutter={5}
      // className={styles.grid}
    />
  );
}
