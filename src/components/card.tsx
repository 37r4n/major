import { Card as CardHUI, CardProps as HUI_CardProps } from '@heroui/react';

export type CardProps = Omit<HUI_CardProps, 'onPress'> & {
  onClick?: HUI_CardProps['onPress'];
};

export const Card = ({ onClick, ...props }: CardProps) => {
  return <CardHUI isBlurred isPressable={onClick ? true : false} onPress={onClick} {...props} />;
};
