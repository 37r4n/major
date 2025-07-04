import { Avatar as AvatarHUI, AvatarProps as HUI_AvatarProps } from '@heroui/react';

export type AvatarProps = Omit<HUI_AvatarProps, 'src'> & {
  src: string | null;
};

export const Avatar = ({ src, ...props }: AvatarProps) => {
  return <AvatarHUI {...props} isBordered color="primary" src={src ?? ''} />;
};
