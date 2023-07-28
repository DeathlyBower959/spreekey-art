export { generateStaticParams } from '../../[year]/[sector]/[imageId]/layout';

const dynamicParams = false;
export { dynamicParams };

export default function GalleryZoomedFavorite({
  children,
}: {
  children: React.ReactNode;
  params: { imageId: string };
}) {
  return children;
}
