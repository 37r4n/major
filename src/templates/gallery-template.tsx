import { Screen } from '../components/screen';
import { Card } from '../components/card';
import { IconLock } from '../icons/icon-lock';
import { Breadcrumbs } from '../components/breadcrumbs';
import React from 'react';
import { Navbar, NavbarProps } from '../layouts/navbar';

export interface GalleryTemplateProps {
  navbar: NavbarProps;

  items: {
    className?: string;
    title?: string;
    description?: string | null;
    isLocked?: boolean;
    src?: string | null;
    onClick?: () => void;
  }[];

  breadcrumbs?: {
    content: React.ReactNode;
    is_active?: boolean;
    is_disabled?: boolean;
    onClick?: () => void;
  }[];
}

export const GalleryTemplate = ({ navbar, breadcrumbs = [], items = [] }: GalleryTemplateProps) => {
  return (
    <Screen>
      <Navbar {...navbar} />

      <div className="flex flex-col gap-2 p-2">
        <header>
          <Breadcrumbs items={breadcrumbs} />
        </header>

        <main className="w-full gap-2 grid-auto-resize">
          {items.map((item, index) => (
            <div key={index}>
              <Card
                onClick={item.onClick}
                className={`flex flex-col gap-2 h-full w-full pb-2 ${item.isLocked ? 'filter grayscale opacity-65' : ''} ${item.className}`}
              >
                <header className="relative flex flex-col h-[200px] w-full">
                  {item.src && <img src={item.src} className="h-full w-full object-cover fade-bottom" />}
                  {item.isLocked && (
                    <IconLock className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-9xl" />
                  )}
                </header>

                <main className="flex flex-col gap-1 flex-1 px-2">
                  <h3 className="text-xl font-bold text-center sentence-case">{item.title}</h3>
                  <p className="text-sm text-center sentence-case">{item.description}</p>
                </main>
              </Card>
            </div>
          ))}
        </main>
      </div>
    </Screen>
  );
};
