import { IoAddCircle } from 'react-icons/io5';

export const IconCreate = ({ className = '', onClick }: { className?: string; onClick?: () => void }) => {
  const isClickable = typeof onClick === 'function';

  return (
    <div onClick={onClick} className={`text-2xl ${isClickable ? 'cursor-pointer' : ''} ${className}`}>
      <IoAddCircle />
    </div>
  );
};
