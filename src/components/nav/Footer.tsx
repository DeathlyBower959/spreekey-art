import clsx from 'clsx';
import { memo } from 'react';
import Logo from '~/atoms/icons/Logo';
import Instagram from '~/atoms/icons/socials/Instagram';
import KoFi from '~/atoms/icons/socials/Ko-Fi';
import ToyHouse from '~/atoms/icons/socials/ToyHouse';
import Twitter from '~/atoms/icons/socials/Twitter';

import footerStyles from './Footer.module.scss';

// Main
function Footer() {
  return (
    <footer className='relative mt-auto flex h-[10em] justify-center justify-self-end bg-secondary'>
      <div className='z-[1] flex h-full w-4/5 items-center justify-between max-md:flex-col max-md:justify-evenly max-md:text-center'>
        <div>
          <h1 className='text-3xl font-bold text-primary'>spreekey</h1>
          <p className='text-secondary'>
            © Spreekey {new Date().getFullYear() - 1}-{new Date().getFullYear()}
          </p>
        </div>

        <div>
          <div className='flex gap-4'>
            <Social
              aria-label='Instagram'
              href='https://instagram.com/spreekey'
            >
              <Instagram color='var(--secondary-foreground)' />
            </Social>
            <Social aria-label='Toy House' href='https://toyhou.se/spreekey'>
              <ToyHouse />
            </Social>
            <Social aria-label='Twitter' href='https://twitter.com/spreekey'>
              <Twitter />
            </Social>
            <Social aria-label='Ko Fi' href='https://ko-fi.com/spreekey'>
              <KoFi cup='var(--secondary-foreground)' heart='red' />
            </Social>
          </div>
        </div>
      </div>

      <div className='pointer-events-none absolute left-0 top-0 flex h-full w-full justify-center p-[1em]'>
        <Logo color='#0000002a' />
      </div>
    </footer>
  );
}

function Social({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <a
      href={href}
      target='_blank'
      className={clsx(
        'flex h-[2em] w-[2em] items-center justify-center',
        footerStyles.social
      )}
    >
      {children}
    </a>
  );
}
export default memo(Footer);
