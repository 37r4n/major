import { RiArrowGoBackFill } from 'react-icons/ri';

export const IconBack = ({ className = '', onClick }: { className?: string; onClick?: () => void }) => {
  const isClickable = typeof onClick === 'function';

  return (
    <div onClick={onClick} className={`text-2xl ${isClickable ? 'cursor-pointer' : ''} ${className}`}>
      <RiArrowGoBackFill />
    </div>
  );
};
