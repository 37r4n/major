import { Button as ButtonHUI, ButtonProps as HUIButtonProps, PressEvent } from '@heroui/react';
import React from 'react';

export type ButtonProps = HUIButtonProps & {
  content?: React.ReactNode;
  onClick?: (e: PressEvent) => void;
};

export const Button = ({ content, children, onClick, ...props }: ButtonProps) => {
  return (
    <ButtonHUI color="primary" onPress={onClick} {...props}>
      {content ?? children}
    </ButtonHUI>
  );
};
