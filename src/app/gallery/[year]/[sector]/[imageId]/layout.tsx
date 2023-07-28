export function generateStaticParams() {
  return [
    {
      imageId: '1060077793125355530-1063942031992438854',
    },
  ];
}

const dynamicParams = false;
export { dynamicParams };

export default function GalleryZoomedImage({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
