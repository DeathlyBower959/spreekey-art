'use client';

import clsx from 'clsx';
import { Squeeze as SqueezeMenu } from 'hamburger-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { ImBookmark } from 'react-icons/im';
import Logo from '~/atoms/icons/Logo';

interface IMenuOpenState {
  isScrolled: boolean;
  isHovered: boolean;
}

const shouldHidePathURLs: {
  path: `/${string}`;
  type: ('scroll' | 'hover')[];
  position: 'fixed';
  check?: 'includes';
}[] = [
  { path: '/', type: ['scroll', 'hover'], position: 'fixed' },
  { path: '/gallery', type: ['hover'], position: 'fixed', check: 'includes' },
];
function getPathURLConfig(path: string) {
  return shouldHidePathURLs.find(x =>
    x.check === 'includes' ? path.includes(x.path) : x.path === path
  );
}

const navInnerStyles = clsx('w-max h-full p-2 flex items-center gap-4');
const linkStyles = clsx(
  'text-[1.125em] text-primary no-underline',
  'max-md:border-b-[1px] max-md:border-solid max-md:border-neutral-700 max-md:pb-4 max-md:last:border-b-0 max-md:max-[46rem]:pt-[125px] max-md:max-[46rem]:justify-start'
);

// FIX: Needs work
function Navbar() {
  // Hooks
  const pathname = usePathname();

  const [menuState, setMenuState] = useState<IMenuOpenState | boolean>({
    isScrolled: false,
    isHovered: false,
  });
  const menuOpen =
    typeof menuState === 'object'
      ? menuState.isHovered || menuState.isScrolled
      : menuState;

  const onScroll = useCallback(() => {
    if (window.innerWidth < 768) return;
    setMenuState(prev => {
      if (typeof prev === 'object')
        return {
          ...prev,
          isScrolled: document.documentElement.scrollTop > 100 * 5,
        };
      else
        return {
          isHovered: false,
          isScrolled: document.documentElement.scrollTop > 100 * 5,
        };
    });
  }, []);

  // FIX: When screen is resized, the menu doesn't work properly with mouse over
  // This is because it only checks if its in a certain threshold, not if its touching the element
  // Optimize both functions but not repetitively mutating state.
  const onMouseMove = useCallback((e: MouseEvent) => {
    if (window.innerWidth < 768) return;

    const value =
      e.clientY <=
      5 * parseFloat(getComputedStyle(document.documentElement).fontSize);

    setMenuState(prev => {
      if (typeof prev === 'object') {
        if (prev.isHovered === value) return prev;

        return {
          ...prev,
          isHovered:
            e.clientY <=
            5 * parseFloat(getComputedStyle(document.documentElement).fontSize),
        };
      } else
        return {
          isScrolled: false,
          isHovered:
            e.clientY <=
            5 * parseFloat(getComputedStyle(document.documentElement).fontSize),
        };
    });
  }, []);

  // Effect
  useLayoutEffect(() => {
    onScroll();
    if (!pathname.includes('/gallery')) window.scrollTo(0, 0);
    if (window.innerWidth < 768) return;

    const shouldHideConfig = getPathURLConfig(pathname);

    if (!shouldHideConfig) {
      setMenuState(true);
      return;
    }

    if (shouldHideConfig.type.includes('scroll'))
      document.addEventListener('scroll', onScroll);
    if (shouldHideConfig.type.includes('hover'))
      document.addEventListener('mousemove', onMouseMove);

    return () => {
      document.removeEventListener('scroll', onScroll);
      document.removeEventListener('mousemove', onMouseMove);
    };
  }, [pathname, onMouseMove, onScroll]);

  const closeMenu = useCallback(() => {
    if (window.innerWidth < 768) setMenuState(false);
  }, []);

  return (
    <>
      <ImBookmark className='fixed right-[5vw] top-0 z-[999998] h-8 w-8 opacity-50 drop-shadow-md max-md:hidden' />
      <nav
        style={{
          transition: `top 1s ease-out, opacity 250ms ease-out ${
            menuOpen ? '500ms' : '1ms'
          }`,
          background: 'rgba(var(--nav-bg), 0.867)',
        }}
        className={clsx(
          'inset-0 bottom-auto z-[999999] flex h-20 justify-between px-4 backdrop-blur-md',
          {
            ['top-0 opacity-100']: menuOpen,
            ['top-[-12%] opacity-0']: !menuOpen,
          },
          getPathURLConfig(pathname)?.position || 'sticky',
          'max-md:sticky max-md:top-0 max-md:opacity-100'
        )}
      >
        <Link
          href='/'
          tabIndex={0}
          className={clsx('select-none px-1 py-3 no-underline', navInnerStyles)}
        >
          <Logo color={'var(--foreground)'} />
          <p
            style={{ fontSize: 'clamp(1.3em, 2vw, 2em)' }}
            className='font-bold select-none text-primary'
          >
            [ art of spreekey ]
          </p>
        </Link>
        <div className={clsx('px-1 py-2', navInnerStyles)}>
          <div
            className={clsx(
              'flex items-center gap-8',
              menuOpen ? `max-md:w-screen` : `max-md:w-0`,
              'max-md:absolute max-md:right-0 max-md:top-0 max-md:h-screen max-md:flex-col max-md:justify-center max-md:overflow-x-hidden max-md:bg-nav max-md:text-[2em] max-md:transition-all max-md:duration-500 max-md:ease-in-out'
            )}
          >
            <Link onClick={closeMenu} href='/gallery' className={linkStyles}>
              Gallery
            </Link>
            <Link
              onClick={closeMenu}
              href='/commissions'
              className={linkStyles}
            >
              Commissions
            </Link>
            <Link onClick={closeMenu} href='/store' className={linkStyles}>
              Store
            </Link>
            <Link onClick={closeMenu} href='/about' className={linkStyles}>
              About
            </Link>
          </div>
          <div className='hidden max-md:block'>
            <SqueezeMenu
              toggled={menuOpen}
              onToggle={() => setMenuState(prev => !prev)}
              color='var(--accent)'
              hideOutline={false}
              label='Open sidebar menu'
            />
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
