import { Button as ButtonHUI, ButtonProps as HUIButtonProps } from '@heroui/react';
import React from 'react';

export type ButtonProps = HUIButtonProps & {
  content?: React.ReactNode;
};

export const Button = ({ content, children, ...props }: ButtonProps) => {
  return (
    <ButtonHUI color="primary" {...props}>
      {content ?? children}
    </ButtonHUI>
  );
};
