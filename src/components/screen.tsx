export interface ScreenProps {
  className?: string;
  children?: React.ReactNode;
}

export const Screen = ({ className, children }: ScreenProps) => {
  return <div className={`h-screen w-screen overflow-y-auto overflow-x-hidden screen ${className}`}>{children}</div>;
};
