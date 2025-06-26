import { User as UserHUI, UserProps as HUI_UserProps } from '@heroui/react';

export type UserProps = HUI_UserProps & { src?: string };

export const User = ({ ...props }: UserProps) => {
  return <UserHUI  {...props} avatarProps={{
    src: props.src, isBordered: true, color: 'primary'
  }} />;
};
