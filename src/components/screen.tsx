export interface ScreenProps {
  className?: string;
  children?: React.ReactNode;
}

export const Screen = ({ className, children }: ScreenProps) => {
  return <div className={`h-full w-full overflow-y-auto overflow-x-hidden screen ${className}`}>{children}</div>;
};
