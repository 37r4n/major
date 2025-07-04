import { User as UserHUI, UserProps as HUI_UserProps } from '@heroui/react';

export type ProfileProps = HUI_UserProps & { src?: string | null };

export const Profile = ({ ...props }: ProfileProps) => {
  return (
    <UserHUI
      {...props}
      avatarProps={{
        src: props.src ?? '',
        isBordered: true,
        color: 'primary',
      }}
    />
  );
};
