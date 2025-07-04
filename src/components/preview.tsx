import { Image as ImageHUI, ImageProps as HUI_ImageProps } from '@heroui/react';

export type PreviewProps = Omit<HUI_ImageProps, 'src'> & {
  src?: string | null;
};

export const Preview = ({ src, ...props }: PreviewProps) => {
  return <ImageHUI {...props} isBlurred isZoomed src={src ?? ''} color="primary" />;
};
