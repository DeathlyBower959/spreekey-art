import { IDiscordImagePath } from '../../../api/discord/gallery/galleryImages';

interface IData {
  year?: string;
  sector?: string;
  isFavorite?: boolean;
}

// Return type IDiscordImagePath[]
function filterItems(year?: string, sector?: string) {
  return [year, sector];
}

// TODO: Work on gallery view
export function GalleryView(data: IData) {
  const items = data.isFavorite
    ? ['favorite']
    : filterItems(data.year, data.sector);

  return <div>Gallery {items.join(',')}</div>;
}
