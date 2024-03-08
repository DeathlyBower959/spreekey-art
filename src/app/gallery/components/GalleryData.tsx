import { GetData } from '~/app/api/discord/gallery/route';

import {
  IArt,
  IArtYear,
  IGalleryImages,
} from '../../api/discord/gallery/galleryImages';
import { GalleryView } from './GalleryView';

interface IQueryData {
  year?: keyof IGalleryImages;
  sector?: keyof IArtYear;
  isFavorite?: boolean;
}

function filterItems(
  data: IGalleryImages,
  year?: keyof IGalleryImages,
  sector?: keyof IArtYear
) {
  if (!year || !sector) {
    const urlArray: (IArt & { year: string })[] = [];

    for (const year in data) {
      const yearData = data[year];

      for (const key of Object.keys(yearData))
        for (const item of yearData[key as keyof IArtYear] || [])
          if (item.url) urlArray.push({ ...item, year });
    }

    return urlArray
      .sort((a, b) => {
        if (!a.month || !b.month) return 0;
        return (
          +new Date(`${a.month}/${a.day}/${a.year}`) -
          +new Date(`${b.month}/${b.day}/${b.year}`)
        );
      })
      .reverse();
  }

  return data[year][sector] || [];
}
export const ART_GAP = 10;
export const ART_WIDTH = 250;
// TODO: Work on gallery view
export async function GalleryData(queryData: IQueryData) {
  const data = await GetData();
  const items = filterItems(data, queryData.year, queryData.sector);

  return <GalleryView items={items} />;
}
