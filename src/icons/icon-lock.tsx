import { FaLock } from 'react-icons/fa';

export const IconLock = ({ className = '', onClick }: { className?: string; onClick?: () => void }) => {
  const isClickable = typeof onClick === 'function';

  return (
    <div onClick={onClick} className={`text-2xl ${isClickable ? 'cursor-pointer' : ''} ${className}`}>
      <FaLock />
    </div>
  );
};
