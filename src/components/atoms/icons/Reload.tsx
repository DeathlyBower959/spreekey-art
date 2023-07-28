import clsx from 'clsx';
import { TbRefresh } from 'react-icons/tb';

function ReloadIcon({ ...props }) {
  return (
    <TbRefresh
      {...props}
      className={clsx('cursor-pointer text-[2em]', props.className)}
    />
  );
}

export default ReloadIcon;
