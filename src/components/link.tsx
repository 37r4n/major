import { Link as LinkHUI, LinkProps as HUI_LinkProps } from '@heroui/react';

export type LinkProps = HUI_LinkProps;

export const Link = ({ ...props }: LinkProps) => {
  return <LinkHUI {...props} />;
};
