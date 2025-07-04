import React from 'react';
import { Screen } from '../components/screen';
import { Card } from '../components/card';
import { Navbar, NavbarProps } from '../layouts/navbar';

export interface ListTemplateProps {
  navbar: NavbarProps;

  items?: {
    left?: React.ReactNode;
    center?: React.ReactNode;
    right?: React.ReactNode;
  }[];
}

export const ListTemplate = ({ items = [], navbar }: ListTemplateProps) => {
  return (
    <Screen>
      <Navbar {...navbar} />

      <div className="flex flex-col gap-2 p-2">
        {items.map((item) => (
          <Card className="flex flex-row gap-2 p-4">
            <div className="flex justify-center items-center w-1/3">{item.left}</div>

            <div className="flex justify-center items-center w-1/3">{item.center}</div>

            <div className="flex justify-center items-center w-1/3">{item.right}</div>
          </Card>
        ))}
      </div>
    </Screen>
  );
};
