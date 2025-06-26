import { Input as InputHUI, InputProps as HUI_InputProps } from '@heroui/react';

export type InputProps = HUI_InputProps;

export const Input = ({ ...props }: InputProps) => {
  return <InputHUI variant="bordered" {...props} />;
};
