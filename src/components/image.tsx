export interface ImageProps {
  className?: string;
  src?: string | null;
  alt?: string;
}

export const Image = ({ className, src, alt }: ImageProps) => {
  return <img className={`${className}`} src={src ?? ''} alt={alt} />;
};
