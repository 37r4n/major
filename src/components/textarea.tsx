import { Textarea as TextareaHUI, TextAreaProps as HUI_TextareaProps } from '@heroui/react';

export type TextareaProps = HUI_TextareaProps;

export const Textarea = ({ ...props }: TextareaProps) => {
  return <TextareaHUI variant="bordered" {...props} />;
};
