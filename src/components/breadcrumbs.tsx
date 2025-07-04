import { BreadcrumbItem, Breadcrumbs as BreadcrumbsHUI, BreadcrumbsProps as HUI_BreadcrumbsProps } from '@heroui/react';
import React from 'react';

export type BreadcrumbsProps = HUI_BreadcrumbsProps & {
  items: {
    is_active?: boolean;
    is_disabled?: boolean;
    content: React.ReactNode;
    onClick?: () => void;
  }[];
};

export const Breadcrumbs = ({ items = [], ...props }: BreadcrumbsProps) => {
  return (
    <BreadcrumbsHUI {...props} size="lg" variant="light">
      {items.map((item, index) => (
        <BreadcrumbItem key={index} isCurrent={item.is_active} isDisabled={item.is_disabled} onPress={item.onClick}>
          {item.content}
        </BreadcrumbItem>
      ))}
    </BreadcrumbsHUI>
  );
};
