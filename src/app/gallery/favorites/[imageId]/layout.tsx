export { generateStaticParams } from '../../[year]/[sector]/[imageId]/layout';
export { dynamicParams };

const dynamicParams = false;

export default function GalleryZoomedFavorite({
  children,
}: {
  children: React.ReactNode;
  params: { imageId: string };
}) {
  return children;
}
