import { Card, DrawerContent, Drawer as DrawerHUI, DrawerProps as HUI_DrawerProps } from '@heroui/react';

export type DrawerProps = HUI_DrawerProps;

export const Drawer = ({ ...props }: DrawerProps) => {
  return (
    <DrawerHUI {...props} className={`bg-transparent ${props.className}`}>
      <DrawerContent>
        <Card isBlurred className={`h-full w-full p-4 ${props.className}`}>
          {props.children}
        </Card>
      </DrawerContent>
    </DrawerHUI>
  );
};
