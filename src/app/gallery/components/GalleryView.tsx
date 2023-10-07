import Link from 'next/link';
import {
  IArtYear,
  IDiscordImagePath,
  IGalleryImages,
} from '~/app/api/discord/gallery/galleryImages';
import { GetData } from '~/app/api/discord/gallery/route';

interface IQueryData {
  year?: keyof IGalleryImages;
  sector?: keyof IArtYear;
  isFavorite?: boolean;
}

function filterItems(
  data: IGalleryImages,
  year?: keyof IGalleryImages,
  sector?: keyof IArtYear
): IDiscordImagePath[] {
  if (!year || !sector) return ['1/1/testFilter'];

  return data[year][sector]?.map(x => x.url) || [];
}

// Can use local storage in server component

// TODO: Work on gallery view
export async function GalleryView(queryData: IQueryData) {
  const data = await GetData();
  const items: IDiscordImagePath[] = queryData.isFavorite
    ? []
    : filterItems(data, queryData.year, queryData.sector);

  if (queryData.isFavorite && items.length === 0)
    return (
      <Link
        className='text-bold absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-5xl text-inherit no-underline'
        href='/gallery'
      >
        No favorites...
      </Link>
    );

  return <>Hi</>;
}
