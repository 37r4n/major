import { Divider as DividerHUI, DividerProps as HUIDividerProps } from '@heroui/react';
import React from 'react';

export type DividerProps = HUIDividerProps & {
  content?: React.ReactNode;
};

export const Divider = ({ ...props }: DividerProps) => {
  return (
    <DividerHUI  { ...props } />
  );
};
