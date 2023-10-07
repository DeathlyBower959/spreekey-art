'use client';

export default async function FavoritesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {/* <GalleryView data={data as IGalleryImages} /> */}
      {children}
    </div>
  );
}
