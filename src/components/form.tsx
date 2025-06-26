export type FormProps = {
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  children?: React.ReactNode;
  className?: string;
};

export const Form = ({ onSubmit, children, className }: FormProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit?.(e);
  };

  return (
    <form className={`${className}`} onSubmit={(e) => handleSubmit(e)}>
      {children}
    </form>
  );
};
