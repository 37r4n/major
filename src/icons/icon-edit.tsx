import { BiSolidEditAlt } from 'react-icons/bi';

export const IconEdit = ({ className = '', onClick }: { className?: string; onClick?: () => void }) => {
  const isClickable = typeof onClick === 'function';

  return (
    <div onClick={onClick} className={`text-2xl ${isClickable ? 'cursor-pointer' : ''} ${className}`}>
      <BiSolidEditAlt />
    </div>
  );
};
