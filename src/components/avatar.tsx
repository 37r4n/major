import { Avatar as AvatarHUI, AvatarProps as HUI_AvatarProps } from '@heroui/react';

export type AvatarProps = HUI_AvatarProps;

export const Avatar = ({ ...props }: AvatarProps) => {
  return <AvatarHUI  {...props} isBordered color='primary' />;
};
