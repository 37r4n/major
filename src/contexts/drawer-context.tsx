import React, { createContext, useContext, useState } from 'react';
import { Drawer } from '../components/drawer';

type DrawerContextType = {
  fire: (options: { content: React.ReactNode }) => void;
  close: () => void;
};

const DrawerContext = createContext<DrawerContextType | null>(null);

export const DrawerProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [content, setContent] = useState<React.ReactNode>(null);

  const fire = ({ content }: { content: React.ReactNode }) => {
    setIsOpen(true);
    setContent(content);
  };

  const close = () => {
    setIsOpen(false);
    setContent(null);
  };

  return (
    <DrawerContext.Provider value={{ fire, close }}>
      {children}
      <Drawer isOpen={isOpen} onClose={close}>
        {content}
      </Drawer>
    </DrawerContext.Provider>
  );
};

export const useDrawer = () => {
  const context = useContext(DrawerContext);
  if (!context) throw new Error('useDrawer must be used within a DrawerProvider');
  return context;
};
