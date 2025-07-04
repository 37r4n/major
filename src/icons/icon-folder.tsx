import { FaRegFolderOpen } from 'react-icons/fa6';

export const IconFolder = ({ className = '', onClick }: { className?: string; onClick?: () => void }) => {
  const isClickable = typeof onClick === 'function';

  return (
    <div onClick={onClick} className={`text-2xl ${isClickable ? 'cursor-pointer' : ''} ${className}`}>
      <FaRegFolderOpen />
    </div>
  );
};
