import './globals.css';

import { Metadata } from 'next';
import localFont from 'next/font/local';
import Footer from '~/components/nav/Footer';
import Navbar from '~/components/nav/Navbar';

const courierNew = localFont({
  src: [
    {
      path: '../fonts/courier-new.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/courier-new-bold.ttf',
      weight: '700',
      style: 'bold',
    },
  ],
});

export const metadata: Metadata = {
  title: 'Art of Spreekey',
  description: 'An avid designer and artist, commissions available!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <head>
        <link
          rel='icon'
          href='/logo/white/favicon.ico'
          media='(prefers-color-scheme: dark)'
        />
        <link
          rel='icon'
          href='/logo/black/favicon.ico'
          media='(prefers-color-scheme: light)'
        />
      </head>
      <body className={courierNew.className}>
        <div className='fixed inset-0 z-[-9999999] h-screen w-screen bg-gradient-linear' />
        <div className='flex min-h-screen w-full flex-col'>
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
