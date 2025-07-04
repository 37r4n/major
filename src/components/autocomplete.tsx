import {
  Autocomplete as AutocompleteHUI,
  AutocompleteItem,
  AutocompleteProps as HUI_AutocompleteProps,
} from '@heroui/react';
import React from 'react';

export type AutocompleteProps = Omit<HUI_AutocompleteProps, 'children'> & {
  items: {
    key: string | number;
    label: React.ReactNode;
  }[];
};

export const Autocomplete = ({ items = [], ...props }: AutocompleteProps) => {
  return (
    <AutocompleteHUI aria-label="arial-label" {...props}>
      {items.map((item) => (
        <AutocompleteItem aria-label="arial-label" key={item.key}>
          {item.label}
        </AutocompleteItem>
      ))}
    </AutocompleteHUI>
  );
};
