import clsx from 'clsx';

import anims from './Loader.module.scss';

const sideStyles = clsx('relative');
const dotStyles = clsx('absolute bg-accent w-4 h-4 rounded-full');

function Loader({ ...props }) {
  return (
    <div {...props} className={clsx('relative', props.className)}>
      <div className={clsx(sideStyles)}>
        <div className={clsx(dotStyles, anims['left-0'])}></div>
        <div className={clsx(dotStyles, anims['left-1'])}></div>
        <div className={clsx(dotStyles, anims['left-2'])}></div>
      </div>
      <div className={clsx(sideStyles)}>
        <div className={clsx(dotStyles, anims['right-0'])}></div>
        <div className={clsx(dotStyles, anims['right-1'])}></div>
        <div className={clsx(dotStyles, anims['right-2'])}></div>
      </div>
    </div>
  );
}

export default Loader;
